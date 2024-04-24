import { CouchbaseLiteException } from "./couchbase-lite-exception";

export enum ReplicatedDocumentFlag {
  DELETED = "DELETED",
  ACCESS_REMOVED = "ACCESS_REMOVED",
}

export class ReplicatedDocument {
  constructor(
    protected id: string,
    protected flags: ReplicatedDocumentFlag[],
    protected error: CouchbaseLiteException = null
  ) {}

  getId(): string {
    return this.id;
  }

  getFlags(): ReplicatedDocumentFlag[] {
    return this.flags;
  }

  getError(): CouchbaseLiteException {
    return this.error;
  }
}

export interface ReplicatedDocumentRepresentation {
  id: string
  flags: string[]
  error: {
    message: string;
    domain: string;
    code: number;
  }
}

export function isReplicatedDocumentRepresentation(obj: any): obj is ReplicatedDocumentRepresentation {
  try {
    const object: ReplicatedDocumentRepresentation = obj
    object.flags.forEach(flag => {
      const flagTest: ReplicatedDocumentFlag | undefined = (<any>ReplicatedDocumentFlag)[flag];
      if (flagTest == undefined) {
        throw "unrecognized replication flag " + flag;
      }
    });
    if (object.id == null) {
      throw "document id cannot be null";
    }
    if (object.error != null) {
      if (object.error.message == null || object.error.domain == null || object.error.code == null) {
        throw "document error is incomplete";
      }
    }
    return true
  } catch (e) {
    console.warn("Invalid ReplicatedDocumentRepresentation:", e)
    return false
  }
}
