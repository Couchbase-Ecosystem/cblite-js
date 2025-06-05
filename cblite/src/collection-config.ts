import { Document } from "./document";;
import { ReplicatedDocumentFlag } from "./replicated-document";

/**
 * ReplicationFilter function type that determines if a document should be replicated.
 * The function should return true to include the document in replication, false to exclude it.
 * 
 * @param document - The document being considered for replication
 * @param flags - Document flags containing metadata about the document
 * @returns boolean indicating whether to include the document in replication
 */
export type ReplicationFilter = (document: Document, flags: ReplicatedDocumentFlag[]) => boolean;

export class CollectionConfig {
  private channels: string[];
  private documentIds: string[];
  private pushFilter?: string;
  private pullFilter?: string;

 /**
  * The collection configuration that can be configured specifically for the replication.
  */
  constructor(
    channels: string[] | null | undefined,
    documentIds: string[] | null | undefined
  ) {
    this.channels = channels ?? [];
    this.documentIds = documentIds ?? [];
  }

   /**
   * An array of Sync Gateway/App Services channel names to pull from. Ignored for push replication. If unset, all accessible channels will be pulled. Note: channels that are not accessible to the user will be ignored by Sync Gateway.
   * @param {string[]} channels - Array of channel names to configure for the collection
   * @example
   * const config = new CollectionConfig();
   * config.setChannels(['channel1', 'channel2']);
   */
  setChannels(channels: string[]) {
    this.channels = channels;
  }

    /**
   * A set of document IDs to filter by: if given, only documents with these IDs will be pushed and/or pulled. 
   * @param {string[]} documentIds - Array of document IDs to include in replication
   * @example
   * const config = new CollectionConfig();
   * config.setDocumentIDs(['doc1', 'doc2', 'doc3']);
   */
  setDocumentIDs(documentIds: string[]) {
    this.documentIds = documentIds;
  }

 /**
   * Set a filter function for push replication. Only documents for which the function returns true will be pushed.
   * @param {ReplicationFilter} filter - Function that returns true to replicate the document
   * @example
   * const config = new CollectionConfig();
   * config.setPushFilter((doc, flags) => {
   *   return doc.type === 'user' && !flags.deleted;
   * });
   */
 setPushFilter(filter: ReplicationFilter) {
  // Convert function to string for bridge transport
  this.pushFilter = filter.toString();
}

/**
 * Set a filter function for pull replication. Only documents for which the function returns true will be pulled.
 * @param {ReplicationFilter} filter - Function that returns true to replicate the document
 * @example
 * const config = new CollectionConfig();
 * config.setPullFilter((doc, flags) => {
 *   return doc.type === 'user' && !flags.deleted;
 * });
 */
setPullFilter(filter: ReplicationFilter) {
  // Convert function to string for bridge transport
  this.pullFilter = filter.toString();
}

/**
 * Get the push filter function string
 */
getPushFilter(): string | undefined {
  return this.pushFilter;
}

/**
 * Get the pull filter function string
 */
getPullFilter(): string | undefined {
  return this.pullFilter;
}


/**
 * Convert to JSON format for serialization to the native layer
 */
toJSON() {
  return {
    channels: this.channels,
    documentIds: this.documentIds,
    pushFilter: this.pushFilter,
    pullFilter: this.pullFilter
  };
}
}