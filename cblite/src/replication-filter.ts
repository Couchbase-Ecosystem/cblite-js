import { Document } from './document';
import { ReplicatedDocumentFlag } from './replicated-document';

/**
 * Represents document flags during replication.
 */
export class DocumentFlags {
    private _flags: Set<ReplicatedDocumentFlag>;

    /**
     * Creates a new DocumentFlags instance
     * 
     * @param flags Array of ReplicatedDocumentFlag values
     */
    constructor(flags: ReplicatedDocumentFlag[] = []) {
        this._flags = new Set(flags);
    }

    /**
     * Checks if the document is marked as deleted
     */
    getIsDeleted(): boolean {
        return this._flags.has(ReplicatedDocumentFlag.DELETED);
    }

    /**
     * Checks if the document's access has been removed
     */
    getIsAccessRemoved(): boolean {
        return this._flags.has(ReplicatedDocumentFlag.ACCESS_REMOVED);
    }

    /**
     * Checks if the specified flag is set
     * 
     * @param flag The flag to check
     * @returns true if the flag is set, false otherwise
     */
    contains(flag: ReplicatedDocumentFlag): boolean {
        return this._flags.has(flag);
    }

    /**
     * Gets all flags as an array
     */
    getFlags(): ReplicatedDocumentFlag[] {
        return Array.from(this._flags);
    }
}

/**
 * Type definition for a replication filter function.
 * Function that determines whether a document should be replicated.
 * Returns true to allow the document to be replicated, false to prevent it.
 */
export type ReplicationFilter = (document: Document, flags: DocumentFlags) => boolean;