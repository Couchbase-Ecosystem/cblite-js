import { ICoreEngine } from '../core-types';
import { EngineLocator } from './engine-locator';
import { Collection } from './collection';
import { Database } from './database';

export class Scope {
  private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

  /**
   * Scope's name.
   *
   * @property
   */
  name: string;

  /**
   * Scope's Database.
   *
   * @property
   */
  database: Database;

  constructor(name: string | undefined, database: Database) {
    this.name = name ?? '';
    this.database = database;
  }

  /**
 * Retrieves all collections within this scope
 * @returns {Promise<Collection[]>} A Promise that resolves to an array of Collection instances
 * @throws {Error} If the database is closed or there's an error accessing collections
 */
  async collections(): Promise<Collection[]> {
    const results = await this._engine.collection_GetCollections({
      name: this.database.getUniqueName(),
      scopeName: this.name,
    });
    return results.collections;
  }

  /**
 * Retrieves a specific collection within this scope by name
 * @param {string} collectionName - The name of the collection to retrieve
 * @returns {Promise<Collection | null>} A Promise that resolves to the Collection instance, or null if not found
 * @throws {Error} If the database is closed or there's an error accessing the collection
 */
  async collection(collectionName: string): Promise<Collection | null> {
    return this._engine.collection_GetCollection({
      name: this.database.getUniqueName(),
      collectionName: collectionName,
      scopeName: this.name,
    });
  }
}
