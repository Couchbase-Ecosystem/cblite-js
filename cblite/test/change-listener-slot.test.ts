// Unit tests for ChangeListenerSlot. Run with `npm test` (no native platform needed).
declare const process: any;
import { ChangeListenerSlot } from '../src/util/change-listener-slot';

type Listener = (change: string) => void;
const noop = async () => {};
const opts = { start: noop, stop: noop, alreadyStartedMessage: 'already started' };

let failures = 0;
async function check(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (e) {
    failures++;
    console.log(`FAIL ${name}: ${(e as Error).message}`);
  }
}
function assert(c: unknown, m: string) {
  if (!c) throw new Error(m);
}
async function rejects(p: Promise<unknown>, message?: string) {
  try {
    await p;
  } catch (e) {
    if (message !== undefined && (e as Error).message !== message) {
      throw new Error(`rejected with "${(e as Error).message}"`);
    }
    return;
  }
  throw new Error('expected rejection');
}

(async () => {
  await check('claim returns a ListenerToken and notify reaches the listener', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    const seen: string[] = [];
    const token = await slot.claim('t1', (c) => seen.push(c), opts);
    assert(token.getUuidToken() === 't1', 'wrong uuid');
    slot.notify('a');
    assert(seen.join() === 'a', `seen=${seen.join()}`);
  });

  await check('second claim is rejected and keeps the first listener', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    const seen: string[] = [];
    await slot.claim('t1', () => seen.push('first'), opts);
    await rejects(slot.claim('t2', () => seen.push('second'), opts), 'already started');
    slot.notify('x');
    assert(seen.join() === 'first', `seen=${seen.join()}`);
  });

  await check('concurrent claims start only one native listener', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    let starts = 0;
    const start = async () => {
      starts++;
      await new Promise((r) => setTimeout(r, 5));
    };
    const results = await Promise.allSettled([
      slot.claim('t1', () => {}, { ...opts, start }),
      slot.claim('t2', () => {}, { ...opts, start }),
    ]);
    assert(results.filter((r) => r.status === 'fulfilled').length === 1, 'both claims fulfilled');
    assert(starts === 1, `starts=${starts}`);
  });

  await check('failed start frees the slot', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    const start = async () => {
      throw new Error('native failure');
    };
    await rejects(slot.claim('t1', () => {}, { ...opts, start }), 'native failure');
    await slot.claim('t2', () => {}, opts);
  });

  await check('token.remove() stops natively, frees the slot, and drops late events', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    const seen: string[] = [];
    let stops = 0;
    const token = await slot.claim('t1', (c) => seen.push(c), {
      ...opts,
      stop: async () => {
        stops++;
      },
    });
    await token.remove();
    assert(stops === 1 && token.isRemoved(), 'not removed');
    slot.notify('late');
    assert(seen.length === 0, 'late event delivered');
    await slot.claim('t2', () => {}, opts);
  });

  await check('remove(uuid) only removes the matching token', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    const token = await slot.claim('t1', () => {}, opts);
    assert((await slot.remove('other')) === false, 'unknown token removed');
    await rejects(slot.claim('t2', () => {}, opts), 'already started');
    assert((await slot.remove('t1')) === true, 'active token not removed');
    assert(token.isRemoved(), 'token not marked removed');
    await slot.claim('t3', () => {}, opts);
  });

  await check('removing a stale token does not free a newer listener', async () => {
    const slot = new ChangeListenerSlot<Listener>();
    const old = await slot.claim('t1', () => {}, opts);
    await old.remove();
    await slot.claim('t2', () => {}, opts);
    await old.remove();
    assert((await slot.remove('t1')) === false, 'stale uuid matched');
    await rejects(slot.claim('t3', () => {}, opts), 'already started');
  });

  console.log(`failures=${failures}`);
  process.exit(failures ? 1 : 0);
})();
