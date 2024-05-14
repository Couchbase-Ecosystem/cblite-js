/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {
  AbstractIndex,
  Collection,
  ConcurrencyControl,
  Database,
  DatabaseConfiguration,
  Dictionary,
  Document,
  ReplicatorStatus,
  Scope,
  ReplicatorConfiguration,
  Result,
  MaintenanceType,
  DatabaseFileLoggingConfiguration,
} from "./src";

/**
 * Represents a Database argument
 *
 * This interface is used to return the arguments
 * for getting a database
 *
 * @interface
 * @property {string} name - The unique name of the database
 */
export interface DatabaseArgs {
  name: string;
}

/**
 * Represents arguments for Opening a Database
 *
 * This interface is used to return the arguments
 * for opening a Database
 *
 * @interface
 * @property {string} name - The unique name of the database
 */
export interface DatabaseOpenArgs extends DatabaseArgs {
  config: DatabaseConfiguration;
}

/**
 * Represents arguments for copying a Database
 *
 * This interface is used to return the arguments
 * for copying a Database
 *
 * @interface
 * @property {string} name - The unique name of the database
 */
export interface DatabaseCopyArgs extends DatabaseArgs {
  path: string;
  newName: string;
  config: DatabaseConfiguration;
}

/**
 * Represents arguments for a Database
 *
 * This interface is used to return the arguments
 * for checking if a Database exists
 *
 * @interface
 * @property {string} existsName - The unique name of the database
 * @property {string} directory - The full path to the database on the device
 */
export interface DatabaseExistsArgs extends DatabaseArgs {
  existsName: string;
  directory: string;
}

/**
 * Represents arguments for performing maintenance on a Database
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} maintenanceType - The type of maintenance to perform
 */
export interface DatabasePerformMaintenanceArgs extends DatabaseArgs {
  maintenanceType: MaintenanceType;
}

export interface DatabaseSetLogLevelArgs {
  domain: string;
  logLevel: number;
}

export interface DatabaseSetFileLoggingConfigArgs extends DatabaseArgs {
  config: DatabaseFileLoggingConfiguration;
}

/**
 * Represents a Scope argument
 *
 * This interface is used to return the arguments
 * for getting a Scope from a Database
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 */
export interface ScopeArgs {
  name: string;
  scopeName: string;
}

/**
 * Represents a Collection argument
 *
 * This interface is used to return the arguments
 * for getting a Collection from a Database
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 * @property {string} collectionName - The unique name of the Collection
 */
export interface CollectionArgs {
  name: string;
  scopeName: string;
  collectionName: string;
}

export interface CollectionsResult {
  collections: Collection[];
}

export interface ScopesResult {
  scopes: Scope[];
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionCreateIndexArgs instead.
 */
export interface DatabaseCreateIndexArgs extends DatabaseArgs {
  indexName: string;
  index: AbstractIndex;
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionDeleteIndexArgs instead.
 */
export interface DatabaseDeleteIndexArgs extends DatabaseArgs {
  indexName: string;
}

/**
 * Represents arguments for a creating an Index
 *
 * This interface is used to return the arguments
 * for creating an Index in a Collection
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 * @property {string} collectionName - The unique name of the Collection
 * @property {string} indexName - The unique name of the database
 * @property {string} index - The abstract index to create
 */
export interface CollectionCreateIndexArgs extends CollectionArgs {
  indexName: string;
  index: AbstractIndex;
}

/**
 * Represents arguments for a deleting an Index
 *
 * This interface is used to return the arguments
 * for deleting an Index in a Collection
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 * @property {string} collectionName - The unique name of the Collection
 * @property {string} existsName - The unique name of the database
 * @property {string} directory - The full path to the database on the device
 */
export interface CollectionDeleteIndexArgs extends CollectionArgs {
  indexName: string;
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionSaveArgs instead.
 */
export interface DatabaseSaveArgs extends DatabaseArgs {
  id: string;
  document: Dictionary;
  concurrencyControl: ConcurrencyControl | null;
}

export interface CollectionSaveArgs extends CollectionArgs {
  id: string;
  document: Dictionary;
  concurrencyControl: ConcurrencyControl | null;
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionPurgeDocumentArgs instead.
 */
export interface DatabasePurgeDocumentArgs extends DatabaseArgs {
  docId: string;
}

/**
 * Represents arguments for a purging a document from a collection
 *
 * This interface is used to return the arguments
 * for purging a document from a Collection
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 * @property {string} collectionName - The unique name of the Collection
 * @property {string} docId - The unique id of the document
 */
export interface CollectionPurgeDocumentArgs extends CollectionArgs {
  docId: string;
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionDeleteDocumentArgs instead.
 */
export interface DatabaseDeleteDocumentArgs extends DatabaseArgs {
  docId: string;
  concurrencyControl: ConcurrencyControl;
}

/**
 * Represents arguments for a deleting a document from a collection
 *
 * This interface is used to return the arguments
 * for deleting a document from a Collection
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 * @property {string} collectionName - The unique name of the Collection
 * @property {string} docId - The unique id of the document
 */
export interface CollectionDeleteDocumentArgs extends CollectionArgs {
  docId: string;
  concurrencyControl: ConcurrencyControl;
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionDeleteDocumentArgs instead.
 */
export interface DatabaseGetDocumentArgs extends DatabaseArgs {
  docId: string;
}

/**
 * Represents arguments for a getting a document from a collection
 *
 * This interface is used to return the arguments
 * for gettig a document from a Collection
 *
 * @interface
 * @property {string} name - The unique name of the database
 * @property {string} scopeName - The unique name of the Scope
 * @property {string} collectionName - The unique name of the Collection
 * @property {string} docId - The unique id of the document
 */
export interface CollectionGetDocumentArgs extends CollectionArgs {
  docId: string;
}

/**
 * @deprecated This interface will be removed in future versions. Use ColllectionDocumentGetBlobContentArgs instead.
 */
export interface DocumentGetBlobContentArgs extends DatabaseArgs {
  documentId: string;
  key: string;
}

export interface CollectionDocumentGetBlobContentArgs extends CollectionArgs {
  documentId: string;
  key: string;
}

export interface QueryExecuteArgs extends DatabaseArgs {
  query: string;
  parameters: Dictionary
}

// ** ChangeListener contracts

export type CollectionChangeListener = (change: CollectionChange) => void;

export type DocumentChangeListener = (change: DocumentChange) => void;

/**
 * Represents a change in a collection.
 *
 * This interface is used to return a set of documents
 * that have changed from a change listener
 *
 * @interface
 * @property {string[]} documentIds - The unique identifier for each document
 */
export interface CollectionChange {
  documentIDs: string[];
}

/**
 * Represents arguments in a change in a collection.
 *
 * This interface is used set up a collection change listener
 *
 * @interface
 */
export interface CollectionChangeListenerArgs extends CollectionArgs {
  changeListenerToken: string;
}

/**
 * Represents a change in a document in a given collection
 *
 * This interface is used to return single documentId that has changed
 *
 * @interface
 * @property {string[]} documentId - The unique identifier of the document
 * @property {Collection} collection - The collection the document is stored in
 * @property {Database} database - The database the collection and document are stored in
 */
export interface DocumentChange {
  documentId: string;
  collection: Collection;
  database: Database;
}

/**
 * Represents arguments in a change in a document in a collection.
 *
 * This interface is used set up a collection document change listener
 *
 * @interface
 */
export interface DocumentChangeListenerArgs extends CollectionArgs {
  documentId: string;
  changeListenerToken: string;
}

// ** end of ChangeListener contracts

export interface CollectionDocumentSaveResult {
  _id: string;
}

export interface DocumentResult {
  document: Document;
}

export interface ReplicatorCreateArgs {
  config: ReplicatorConfiguration;
}

export interface ReplicatorArgs {
  replicatorId: string;
}

// implementation for Replicator Change Listener
export type ReplicatorChangeListener = (change: ReplicatorStatusChange) => void;

export interface ReplicatorStatusChange {
  status: ReplicatorStatus;
}

/**
 * Represents the data that is returned from a listener callback
 *
 * @interface
 */
export interface CallbackResultData {
  [key: string]: any;
}

/**
 * Represents any error messages that is returned from a listener callback
 *
 * @interface
 */
export interface CallbackResultError {
  message: string;
}

/**
 * Represents the interface for a listener callback
 *
 * @interface
 */
export type ListenerCallback = (data: CallbackResultData, error?: CallbackResultError) => void;

/**
 * Represents the interface for a listener handler that allows you to remove the listener
 *
 * @interface
 */
export interface ListenerHandle {
  remove: () => Promise<void>;
}

/**
 * Represents engine for the core functionality of the Couchbase Lite Plugin
 *
 * @interface
 */
export interface ICoreEngine {

  //*************************************************
  // File System - used for copy and opening database
  //*************************************************

  /**
   * Represents getting a default path from the operating system to save a database
   *
   * This function is used to for returning the default path on the operating system to save a database
   *
   * @function
   */
  file_GetDefaultPath(): Promise<{ path: string }>;

  file_GetFileNamesInDirectory(args: {
    path: string;
  }): Promise<{ files: string[] }>;

  // ****************************
  // Database top level functions
  // ****************************

  database_Open(args: DatabaseOpenArgs): Promise<void>;

  database_GetPath(args: DatabaseArgs): Promise<{ path: string }>;

  database_Copy(args: DatabaseCopyArgs): Promise<void>;

  database_Exists(args: DatabaseExistsArgs): Promise<{ exists: boolean }>;

  database_Close(args: DatabaseArgs): Promise<void>;

  database_Delete(args: DatabaseArgs): Promise<void>;

  //*********************
  // Database maintenance
  //*********************

  database_PerformMaintenance(args: DatabasePerformMaintenanceArgs): Promise<void>;

  //*****************
  // Database logging
  //*****************
  
  database_SetLogLevel(args: DatabaseSetLogLevelArgs): Promise<void>;

  database_SetFileLoggingConfig(
    args: DatabaseSetFileLoggingConfigArgs
  ): Promise<void>;

  //*******
  // Scopes
  //*******

  scope_GetDefault(args: DatabaseArgs): Promise<Scope>;

  scope_GetScopes(args: DatabaseArgs): Promise<ScopesResult>;

  scope_GetScope(args: ScopeArgs): Promise<Scope>;

  //************
  // Collections
  //************

  collection_GetDefault(args: DatabaseArgs)
    : Promise<Collection>;

  collection_GetCollections(args: ScopeArgs)
    : Promise<CollectionsResult>;

  collection_GetCollection(args: CollectionArgs)
    : Promise<Collection>;

  collection_CreateCollection(args: CollectionArgs) 
    : Promise<Collection>;

  collection_DeleteCollection(args: CollectionArgs)
    : Promise<void>;

  //*********
  // Indexing
  //*********

  /**
   * @deprecated This will be removed in future versions. Use collection_CreateIndex instead.
   */
  database_CreateIndex(args: DatabaseCreateIndexArgs): Promise<void>;

  /**
   * @deprecated This will be removed in future versions. Use collection_DeleteIndex instead.
   */
  database_DeleteIndex(args: DatabaseDeleteIndexArgs): Promise<void>;

  /**
   * @deprecated This will be removed in future versions. Use collection_GetIndexes instead.
   */
  database_GetIndexes(args: DatabaseArgs): Promise<{ indexes: string[] }>;

   /**
   * Represents creating an Index
   *
   * This function is used to for creating an Index in a Collection
   *
   * @interface
   * @property {CollectionCreateIndexArgs} arguments for creating an Index
   */
   collection_CreateIndex(args: CollectionCreateIndexArgs): Promise<void>;

   /**
    * Represents deleting an Index
    *
    * This function is used to for deleting an Index in a Collection
    *
    * @interface
    * @property {CollectionDeleteIndexArgs} arguments for deleting an Index
    */
   collection_DeleteIndex(args: CollectionDeleteIndexArgs): Promise<void>;
 
   /**
    * Represents getting an Index
    *
    * This function is used to for getting an Index in a Collection
    *
    * @interface
    * @property {CollectionArgs} arguments for getting an Index
    */
   collection_GetIndexes(args: CollectionArgs): Promise<{ indexes: string[] }>;

  //**********************************
  // Documents 
  //**********************************

  /**
   * @deprecated This will be removed in future versions. Use collection_Save instead.
   */
  database_Save(args: DatabaseSaveArgs): Promise<{ _id: string }>;

  /**
   * Save a document into the collection. The default concurrency control, lastWriteWins, will
   * be used when there is conflict during save.
   *
   * When saving a document that already belongs to a collection, the collection instance of
   * the document and this collection instance must be the same, otherwise, an
   * error will be thrown.
   *
   * Throws an error if the collection is deleted or the database is closed.
   *
   * @function
   */
  collection_Save(
    args: CollectionSaveArgs
  ): Promise<CollectionDocumentSaveResult>;

  /**
   * @deprecated This will be removed in future versions. Use collection_PurgeDocument instead.
   */
  database_PurgeDocument(args: DatabasePurgeDocumentArgs): Promise<void>;

  /**
   * Purge a document by id from the collection. If the document doesn’t exist in the
   * collection, an error will be thrown.
   *
   * Throws an error if the collection is deleted or the database is closed.
   *
   * @function
   */
  collection_PurgeDocument(args: CollectionPurgeDocumentArgs): Promise<void>;

  /**
   * @deprecated This will be removed in future versions. Use Collection_DeleteDocument instead.
   */
  database_DeleteDocument(args: DatabaseDeleteDocumentArgs): Promise<void>;

  /**
   * Delete a document from the collection. The default concurrency control, lastWriteWins,
   * will be used when there is conflict during delete. If the document doesn’t exist in the
   * collection, an error will be thrown.
   *
   * When deleting a document that already belongs to a collection, the collection instance of
   * the document and this collection instance must be the same, otherwise, an
   * error will be thrown.
   *
   * Throws an Error if the collection is deleted or the database is closed.
   *
   * @function
   */
  collection_DeleteDocument(args: CollectionDeleteDocumentArgs): Promise<void>;

  /**
   * @deprecated This will be removed in future versions. Use Collection_GetDocument instead.
   */
  database_GetDocument(args: DatabaseGetDocumentArgs): Promise<DocumentResult>;

  /**
   * Get an existing document by document ID.
   *
   * Throws an error if the collection is deleted or the database is closed.
   *
   * @function
   */
  collection_GetDocument(args: CollectionGetDocumentArgs): Promise<DocumentResult>;

  /**
   * @deprecated This will be removed in future versions. Use Collection_GetDocumentBlobContent instead.
   */
  document_GetBlobContent(
      args: DocumentGetBlobContentArgs
  ): Promise<ArrayBuffer>;

  collection_GetDocumentBlobContent(
      args: CollectionDocumentGetBlobContentArgs
  ) : Promise<ArrayBuffer>;

  /**
   * @deprecated This will be removed in future versions. Use collection_GetCount instead.
   */
  database_GetCount(args: DatabaseArgs)
    : Promise<{ count: number }>;

  /**
   * Total number of documents in the collection.
   *
   * @function
   */
  collection_GetCount(args: CollectionArgs)
    : Promise<{ count: number }>;


  //**********************
  // Query 
  //**********************

  query_Execute(args: QueryExecuteArgs): Promise<Result>;

  query_Explain(args: QueryExecuteArgs): Promise<Result>;
 

  //***********
  // Replicator
  //*********** 

  replicator_Create(
    args: ReplicatorCreateArgs
  ): Promise<{ replicatorId: string }>;

  replicator_Start(args: ReplicatorArgs): Promise<void>;

  replicator_Restart(args: ReplicatorArgs): Promise<void>;

  replicator_Stop(args: ReplicatorArgs): Promise<void>;

  replicator_ResetCheckpoint(args: ReplicatorArgs): Promise<void>;

  replicator_GetStatus(args: ReplicatorArgs): Promise<ReplicatorStatus>;

  replicator_Cleanup(args: ReplicatorArgs): Promise<void>;


  //************
  // Listeners
  //************

  collection_AddChangeListener(
      args: CollectionChangeListenerArgs,
      lcb: ListenerCallback)
      : Promise<ListenerHandle>;

  collection_RemoveChangeListener(
      args: CollectionChangeListenerArgs)
      : Promise<void>;

  collection_AddDocumentChangeListener(
      args: DocumentChangeListenerArgs,
      lcb: ListenerCallback)
      : Promise<ListenerHandle>;

  //don't need documentId to remove change listener, so using CollectionChangeListenerArgs is perfectly legal
  collection_RemoveDocumentChangeListener(
      args: CollectionChangeListenerArgs)
      : Promise<void>;
}
