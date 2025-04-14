import { ICoreEngine, ReplicationFilterRegisterArgs, ReplicationFilterUnregisterArgs } from "../core-types";
import { Document } from "./document";
import { EngineLocator } from "./engine-locator";
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
  private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);
  private _pushFilterId: string | null = null;
  private _pullFilterId: string | null = null;

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
   * Sets a filter function for validating whether the documents can be pushed to the remote endpoint.
   * Only documents for which the function returns true are replicated.
   * 
   * @param {ReplicationFilter|null} filter - Filter function to apply to push replication
   */
 setPushFilter(filter: ReplicationFilter | null) {

  // Unregister previous filter if exists
  if (this._pushFilterId) {
    const unregisterArgs: ReplicationFilterUnregisterArgs = {
      filterId: this._pushFilterId
    };
    this._engine.replication_UnregisterFilter(unregisterArgs)
      .catch(err => console.error('Error unregistering push filter:', err));
    this._pushFilterId = null;
  }
  
  // Register new filter if provided
  if (filter) {
    const filterId = `push_${this._engine.getUUID()}`;
    const registerArgs: ReplicationFilterRegisterArgs = {
      filterId: filterId,
      filterType: 'push'
    };
    
    this._engine.replication_RegisterFilter(registerArgs, (args) => {
      const doc = args[0];
      const flags = args[1];
      return filter(doc, flags);
    }).catch(err => console.error('Error registering push filter:', err));
    
    this._pushFilterId = filterId;
  }
}

/**
 * Get the push filter ID
 * @returns {string|null} The push filter ID or null if not set
 */
getPushFilterId(): string | null {
  return this._pushFilterId;
}

/**
 * Sets a filter function for validating whether the documents can be pulled from the remote endpoint.
 * Only documents for which the function returns true are replicated.
 * 
 * @param {ReplicationFilter|null} filter - Filter function to apply to pull replication
 */
setPullFilter(filter: ReplicationFilter | null) {
  
  // Unregister previous filter if exists
  if (this._pullFilterId) {
    const unregisterArgs: ReplicationFilterUnregisterArgs = {
      filterId: this._pullFilterId
    };
    this._engine.replication_UnregisterFilter(unregisterArgs)
      .catch(err => console.error('Error unregistering pull filter:', err));
    this._pullFilterId = null;
  }
  
  // Register new filter if provided
  if (filter) {
    const filterId = `pull_${this._engine.getUUID()}`;
    const registerArgs: ReplicationFilterRegisterArgs = {
      filterId: filterId,
      filterType: 'pull'
    };
    
    this._engine.replication_RegisterFilter(registerArgs, (doc, flags) => {
      
      return filter(doc, flags);
    }).catch(err => console.error('Error registering pull filter:', err));
    
    this._pullFilterId = filterId;
  }
}

/**
 * Get the pull filter ID
 * @returns {string|null} The pull filter ID or null if not set
 */
getPullFilterId(): string | null {
  return this._pullFilterId;
}

/**
 * Convert to JSON format for serialization to the native layer
 */
toJSON() {
  return {
    channels: this.channels,
    documentIds: this.documentIds,
    pushFilterId: this._pushFilterId,
    pullFilterId: this._pullFilterId
  };
}
}