import { Dictionary } from './definitions';
import { Blob } from './blob';
import { Collection } from './collection';
import { ICoreEngine } from '../core-types';
import { EngineLocator } from './engine-locator';

export class Document {
  protected doc: Dictionary = {};
  private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

  constructor(
    protected id: string = null,
    protected sequenceNo: number = null,
    data: Dictionary = {}
  ) {
    if (id === null) {
      this.id = this._engine.getUUID();
    }
    this.doc = data;
  }

  count(): number {
    return Object.keys(this.doc).length;
  }

  getData() {
    return this.doc;
  }

  private _get(key: string) {
    return this.doc[key];
  }

  getArray(key: string) {
    return key in this.doc ? this.doc[key] : null;
  }

  getBlob(key: string): Blob {
    if (key in this.doc) {
      const data = this._get(key);
      if (data.content_type) {
        const b = new Blob(data.content_type, null);
        b.digest = data.digest;
        b.length = data.length;
        return b;
      }
      return this._get(key);
    } else {
      return null;
    }
  }

  async getBlobContent(key: string, collection: Collection): Promise<ArrayBuffer> {
    const data = await collection.getEngine().collection_GetBlobContent({
      documentId: this.getId(),
      key: key,
      collectionName: collection.name,
      scopeName: collection.scope.name,
      name: collection.scope.database.getName(),
    });
    return data.data;
  }

  getBoolean(key: string) {
    return key in this.doc ? this.doc[key] : false;
  }

  getDate(key: string) {
    return key in this.doc ? this.doc[key] : null;
  }

  getDictionary(key: string) {
    return key in this.doc ? this.doc[key] : null;
  }

  getDouble(key: string) {
    return key in this.doc ? this.doc[key] : 0.0;
  }

  getFloat(key: string) {
    return key in this.doc ? this.doc[key] : 0.0;
  }

  getId(): string {
    return this.id;
  }

  getInt(key: string) {
    if (key in this.doc) {
      const value = this.doc[key];
      if (typeof value === 'number') {
        return Math.floor(value);
      }
      if (typeof value === 'boolean') {
        return value ? 1 : 0;
      }
    }
    return 0;
  }

  getKeys(): string[] {
    return Object.keys(this.doc);
  }

  getLong(key: string) {
    return key in this.doc ? this.doc[key] : 0;
  }

  getSequence(): number {
    return this.sequenceNo;
  }

  getString(key: string) {
    if (key in this.doc) {
      const value = this.doc[key];
      if (typeof value === 'string') {
        return value;
      } 
    }
    return null;
  }

  getValue(key: string) {
    return key in this.doc ? this.doc[key] : null;
  }

  toDictionary() {
    return this.doc;
  }
}
