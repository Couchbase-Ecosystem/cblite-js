import { ListenerToken } from '../listener-token';

/**
 * ChangeListenerSlot: holds the single change listener that Collection, Query
 * and Replicator (status) each allow at a time, together with its
 * ListenerToken.
 *
 * - The slot is claimed *before* the native listener is registered, so
 *   concurrent `addChangeListener` calls cannot both reach the engine.
 * - A rejected `claim` leaves the active listener untouched.
 * - If native registration fails, the slot is freed again.
 * - Removing the listener (via the returned ListenerToken or `remove(uuid)`)
 *   frees the slot so a new listener can be added afterwards.
 *
 * Internal helper; not exported from the package index.
 */
export class ChangeListenerSlot<TListener extends (change: any) => void> {
  private _uuidToken: string | undefined;
  private _listener: TListener | undefined;
  private _cblListenerToken: ListenerToken | undefined;

  /**
   * Claims the slot for `listener` under `uuidToken`, then runs `start` to
   * register the native listener.
   *
   * @param options.start registers the native listener
   * @param options.stop removes the native listener; called by the returned
   *   ListenerToken's remove() before the slot is freed
   * @param options.alreadyStartedMessage error message when the slot is held
   * @returns the ListenerToken for the new listener
   */
  async claim(
    uuidToken: string,
    listener: TListener,
    options: {
      start: () => Promise<void>;
      stop: () => Promise<void>;
      alreadyStartedMessage: string;
    }
  ): Promise<ListenerToken> {
    if (this._uuidToken !== undefined) {
      throw new Error(options.alreadyStartedMessage);
    }
    this._uuidToken = uuidToken;
    this._listener = listener;
    try {
      await options.start();
    } catch (error) {
      this.release(uuidToken);
      throw error;
    }
    const cblListenerToken = new ListenerToken(uuidToken, async () => {
      await options.stop();
      this.release(uuidToken);
    });
    this._cblListenerToken = cblListenerToken;
    return cblListenerToken;
  }

  /**
   * Removes the active listener if `uuidToken` identifies it.
   *
   * @returns true if the token belonged to this slot (and was removed),
   *   false otherwise so the caller can fall back to other cleanup.
   */
  async remove(uuidToken: string): Promise<boolean> {
    if (
      this._cblListenerToken === undefined ||
      this._uuidToken !== uuidToken
    ) {
      return false;
    }
    await this._cblListenerToken.remove();
    return true;
  }

  /**
   * Delivers `change` to the active listener. Events that arrive after the
   * listener was removed are dropped.
   */
  notify(change: Parameters<TListener>[0]): void {
    if (this._listener) {
      this._listener(change);
    }
  }

  private release(uuidToken: string): void {
    if (this._uuidToken !== uuidToken) {
      return;
    }
    this._uuidToken = undefined;
    this._listener = undefined;
    this._cblListenerToken = undefined;
  }
}
