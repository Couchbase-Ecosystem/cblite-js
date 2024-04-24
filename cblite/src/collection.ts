import { Scope } from "./scope";
import {ICoreEngine} from "../coretypes";
import {EngineLocator} from "./engine-locator";
import {AbstractIndex} from "./abstract-index";
import {Document} from "./document";
import {ConcurrencyControl} from "./concurrency-control";
import {MutableDocument} from "./mutable-document";

export class Collection {

	name: string;
	scope: Scope;
	private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

	constructor(name: string | undefined, scope: Scope | undefined) {
		this.name = name ?? ""
		this.scope = scope ?? new Scope("", "");
	}

	getEngine() : ICoreEngine {
		return this._engine;
	}

	/**
	 * Return all index names
	 *
	 * @function
	 */
	indexes() : Promise<{ indexes: string[] }>{
		return this._engine.collection_GetIndexes({
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
		});
	}

	/**
	 * Create an index with the index name and AbstractIndex.
	 *
	 * @function
	 */
	createIndex(indexName: string, index: AbstractIndex): Promise<void> {
		return this._engine.collection_CreateIndex({
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
			indexName: indexName,
			index: index.toJson(),
		});
	}

	/**
	 * Delete an index by name.
	 *
	 * @function
	 */
	deleteIndex(indexName: string): Promise<void> {
		return this._engine.collection_DeleteIndex({
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
			indexName: indexName,
		});
	}

	/**
	 * Total number of documents in the collection.
	 *
	 * @function
	 */
	count() : Promise<{ count: number }> {
		return this._engine.collection_GetCount({
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
		});
	}

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
	deleteDocument(
		document: Document,
		concurrencyControl: ConcurrencyControl = null,
	): Promise<void> {
		const id = document.getId();
		return this._engine.collection_DeleteDocument({
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
			docId: id,
			concurrencyControl: concurrencyControl,
		});
	}

	/**
	 * Purge a document by id from the collection. If the document doesn’t exist in the
	 * collection, an error will be thrown.
	 *
	 * Throws an error if the collection is deleted or the database is closed.
	 *
	 * @function
	 */
	purgeDocument(document: Document) {
		return this._engine.collection_PurgeDocument({
			name: this.scope.name,
			scopeName: this.scope.name,
			collectionName: this.name,
			docId: document.getId(),
		});
	}

	/**
	 * Purge a document by id from the collection. If the document doesn’t exist in the
	 * collection, an error will be thrown.
	 *
	 * Throws an error if the collection is deleted or the database is closed.
	 *
	 * @function
	 */
	purgeDocumentById(documentId: string) {
		return this._engine.collection_PurgeDocument({
			name: this.scope.name,
			scopeName: this.scope.name,
			collectionName: this.name,
			docId: documentId,
		});
	}

	/**
	 * Get an existing document by document ID.
	 *
	 * Throws an error if the collection is deleted or the database is closed.
	 *
	 * @function
	 */
	async document(id: string): Promise<Document> {
		const docJson = await this._engine.collection_GetDocument({
			docId: id,
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
		});
		if (docJson) {
			const data = docJson['_data'];
			const sequence = docJson['_sequence'];
			const retId = docJson['_id'];
			return Promise.resolve(new Document(retId, sequence, data));
		} else {
			return Promise.resolve(null);
		}
	}

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
	async save(
		document: MutableDocument,
		concurrencyControl: ConcurrencyControl = null,
	): Promise<void> {
		const ret = await this._engine.collection_Save({
			id: document.getId(),
			document: document.toDictionary(),
			concurrencyControl: concurrencyControl,
			name: this.scope.databaseName,
			scopeName: this.scope.name,
			collectionName: this.name,
		});

		const id = ret._id;
		document.setId(id);
	}
}