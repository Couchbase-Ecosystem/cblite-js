import { Collection } from './collection';
import { Document } from './document';
import { Dictionary } from './definitions';
import { Blob } from './blob';

interface BlobDefinition {
  _type: 'blob';
  data: Dictionary;
}

export class MutableDocument extends Document {
  private _blobs: { [key: string]: BlobDefinition | null };

  constructor();
  // eslint-disable-next-line
  constructor(id: string);
  // eslint-disable-next-line
  constructor(id: string, data: Dictionary);
  // eslint-disable-next-line
  constructor(id: string | null, sequenceNo: number | null, data: Dictionary | null);
  // eslint-disable-next-line
  constructor( id?: string, sequenceNo?: number, revisionID?: string, data?: Dictionary, collection?: Collection);
  // Actual constructor implementation
  constructor(
    id: string = null,
    sequenceNoOrData: number | Dictionary = null,
    revisionIDOrData: string | Dictionary = null,
    data: Dictionary = {},
    collection: Collection = null,
  ) {
    if (arguments.length === 0) {
      super(null, null, null, null, {});
    } else if (arguments.length === 1) {
      // Just ID
      super(id, null, null, null, {});
    } else if (arguments.length === 2 && typeof sequenceNoOrData === 'object') {
      // ID and data
      super(id, null, null, null, sequenceNoOrData || {});
    } else if (arguments.length === 3 && typeof revisionIDOrData === 'object') {
      // ID, sequenceNo, and data
      super(id, sequenceNoOrData as number, null, null, revisionIDOrData || {});
    } else {
      // Full constructor
      super(id, sequenceNoOrData as number, revisionIDOrData as string, collection, data);
    }
    this._blobs = {};
  }

  static fromDocument(document: Document) {
    return new MutableDocument(
      document.getId(),
      document.getSequence(),
      document.getRevisionID(),
      document.getData(),
      document.getCollection()
    );
  }

  static fromJSON(documentId: string, jsonString: string): MutableDocument {
    try {
      const data = JSON.parse(jsonString);
      return new MutableDocument(documentId, data);
    } catch (e) {
      throw new Error(`Failed to parse JSON string: ${e.message}`);
    }
  }

  remove(key: string): MutableDocument {
    const parts = key.split('.');
    let current = this.doc;
    
    // Navigate to the parent object for nested properties
    for (let i = 0; i < parts.length - 1; i++) {
      if (current[parts[i]] === undefined) {
        return this;
      }
      current = current[parts[i]];
    }
    
    // Delete the final property
    delete current[parts[parts.length - 1]];
    return this;
  }

  _set<T>(key: string, value: T | null) {
    if (key in this._blobs) {
      delete this._blobs[key];
    }
    this.doc[key] = value;
  }

  setId(id: string) {
    this.id = id;
  }

  setArray<T>(key: string, value: T[]): MutableDocument {
    this._set(key, value);
    return this;
  }

  setBlob(key: string, value: Blob | null): MutableDocument {
    //remove it from the internal doc because it's a blob
    if (key in this.doc) {
      delete this.doc[key];
    }
    if (value === null) {
      this._blobs[key] = null;
      return this;
    }
    this._blobs[key] =  {
      _type: 'blob',
      data: value.toDictionary(),
    };
    return this;
  }

  setBoolean(key: string, value: boolean): MutableDocument {
    this._set(key, value);
    return this;
  }

  setCollection(collection: Collection) {
    this.collection = collection;
  }

  setData(data: Dictionary): MutableDocument {
    this.doc = data;
    return this;
  }

  setDate(key: string, value: Date | null): MutableDocument {
    if (value !== null) {
      this._set(key, value.toISOString());
    } else {
      this._set(key, value);
    }
    return this;
  }

  setDictionary(key: string, value: Dictionary | null): MutableDocument {
    this._set(key, value);
    return this;
  }

  setDouble(key: string, value: number): MutableDocument {
    this._set(key, value);
    return this;
  }

  setFloat(key: string, value: number): MutableDocument {
    this._set(key, value);
    return this;
  }

  setInt(key: string, value: number): MutableDocument {
    this._set(key, value);
    return this;
  }

  setLong(key: string, value: number): MutableDocument {
    this._set(key, value);
    return this;
  }

  setNumber(key: string, value: number): MutableDocument {
    this._set(key, value);
    return this;
  }

  setRevisionID(revisionID: string) {
    this.revisionID = revisionID;
  }

  setSequence(sequence: number) {
    this.sequenceNo = sequence;
  }

  setString(key: string, value: string | null): MutableDocument {
    this._set(key, value);
    return this;
  }

  setValue<T>(key: string, value: T): MutableDocument {
    this._set(key, value);
    return this;
  }

  blobsToJsonString(): string {
    return JSON.stringify(this._blobs);
  }
}
