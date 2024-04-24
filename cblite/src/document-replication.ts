import {
  ReplicatedDocument,
  ReplicatedDocumentRepresentation,
  isReplicatedDocumentRepresentation,
} from './replicated-document';

export enum ReplicationDirection {
  PUSH = 'PUSH',
  PULL = 'PULL',
}

export class DocumentReplication {
  constructor(
    protected direction: ReplicationDirection,
    protected documents: ReplicatedDocument[],
  ) {}

  getDirection(): ReplicationDirection {
    return this.direction;
  }

  getDocuments(): ReplicatedDocument[] {
    return this.documents;
  }
}

export interface DocumentReplicationRepresentation {
  direction: string;
  documents: ReplicatedDocumentRepresentation[];
}

export function isDocumentReplicationRepresentation(
  obj: any,
): obj is DocumentReplicationRepresentation {
  try {
    const object: DocumentReplicationRepresentation = obj;
    object.documents.forEach(document => {
      if (!isReplicatedDocumentRepresentation(document)) {
        throw 'invalid replicated document';
      }
    });
    const direction: ReplicationDirection | undefined = (<any>(
      ReplicationDirection
    ))[object.direction];
    if (direction == undefined) {
      throw 'unrecognized replication direction ' + object.direction;
    }
    return true;
  } catch (e) {
    console.warn('Invalid DocumentReplicationRepresentation:', e);
    return false;
  }
}
