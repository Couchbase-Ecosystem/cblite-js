import {
  Database,
  Collection,
  Scope,
  FileSystem,
  MutableDocument,
  DatabaseConfiguration,
  Dictionary,
  uuid,
} from 'cblite';

import { assert } from 'chai';

import { ITestResult } from './test-result.types';

export class TestCase {
  //setup shared properties
  database: Database | undefined = undefined;
  otherDatabase: Database | undefined = undefined;
  databaseName: string = '';
  otherDatabaseName: string = 'otherDb';
  scopeName: string = 'testScope';
  collectionName: string = 'testCollection';
  collection: Collection | undefined = undefined;
  scope: Scope | undefined = undefined;
  directory: string | undefined = undefined;
  dataSource: string = this.scopeName + '.' + this.collectionName;

  async init(): Promise<ITestResult> {
    try {
      //try to get the platform local directory - can't run tests if we can't save a database to a directory
      this.databaseName = uuid().toString();
      const filePathResult = await this.getPlatformPath();
      if (filePathResult.success) {
        this.directory = filePathResult.data;
      } else {
        return {
          testName: 'init',
          success: false,
          message: filePathResult.message,
          data: undefined,
        };
      }

      //create a database and then open it
      const databaseResult = await this.getDatabase(
        this.databaseName,
        this.directory,
        '',
      );
      if (databaseResult instanceof Database) {
        this.database = databaseResult;
        await this.database?.open();
        //add scope and collection
        this.scope = await this.database?.scope(this.scopeName);
        if (this.scope !== undefined) {
          this.collection = await this.database.createCollection(this.collectionName, this.scope);
          if (this.collection === undefined) {
            return {
              testName: 'init',
              success: false,
              message: 'Failed to create collection',
              data: undefined,
            };
          }
        }
      } else {
        if (typeof databaseResult === 'string') {
          const message = databaseResult as string;
          return {
            testName: 'init',
            success: false,
            message: message,
            data: undefined,
          };
        }
      }
      return {
        testName: 'init',
        success: true,
        message: undefined,
        data: undefined,
      };
    } catch (error) {
      return {
        testName: 'init',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

  async tearDown(){
    if (this.database !== undefined){
      await this.deleteDatabase(this.database);
      this.database = undefined;
      this.scope = undefined;
      this.collection = undefined;
    }
    if (this.otherDatabase !== undefined){
      await this.deleteDatabase(this.otherDatabase);
      this.otherDatabase = undefined;
    }
  }

  async deleteDatabase(db: Database): Promise<ITestResult> {
    try {
      await db.deleteDatabase();
      return {
        testName: this.constructor.name + '.deleteDatabase',
        success: true,
        message: undefined,
        data: undefined,
      };
    } catch (error) {
      if (error.errorMessage !== 'No such open database') {
        return {
          testName: this.constructor.name + '.deleteDatabase',
          success: false,
          message: JSON.stringify(error),
          data: undefined,
        };
      } else {
        return {
          testName: this.constructor.name + '.deleteDatabase',
          success: true,
          message: undefined,
          data: undefined,
        };
      }
    }
  }

  async getPlatformPath(): Promise<ITestResult> {
    const pd = new FileSystem();
    try {
      const result: string = await pd.getDefaultPath();
      return {
        testName: this.constructor.name + '.getPlatformPath',
        success: true,
        message: undefined,
        data: result,
      };
    } catch (error) {
      return {
        testName: this.constructor.name + '.getPlatformPath',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

  async getDatabase(
    name: string,
    path: string | undefined,
    encryptionKey: string | undefined,
  ): Promise<Database | string> {
    const config = new DatabaseConfiguration();
    try {
      config.directory = path ?? '';
      config.encryptionKey = encryptionKey ?? '';
      const db = new Database(name, config);
      return db;
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async createDocumentWithId(id: string): Promise<MutableDocument> {
    const doc = new MutableDocument(id);
    doc.setValue('key', 1);
    await this.collection.save(doc);
    const savedDoc = await this.collection.document(id);
    assert.equal(savedDoc?.getId(), id);
    assert.equal(savedDoc?.getSequence(), 1);
    const mutableSavedDoc = MutableDocument.fromDocument(savedDoc);
    return mutableSavedDoc;
  }

  createDocumentWithIdAndData(id: string, data: Dictionary): MutableDocument {
    const doc = new MutableDocument(id);
    doc.setData(data);
    return doc;
  }

  createDocumentNumbered(start: number, end: number): MutableDocument[] {
    const docs: MutableDocument[] = [];
    for (let counter = start; counter <= end; counter++) {
      const doc = new MutableDocument('doc-' + counter);
      doc.setNumber('number', counter);
      docs.push(doc);
    }
    return docs;
  }

  async createDocs(
    methodName: string,
    number: number,
  ): Promise<MutableDocument[]> {
    const docs = this.createDocumentNumbered(1, number);
    try {
      for (const doc of docs) {
        await this.database?.save(doc);
      }
    } catch (error) {
      throw new Error("Can't create docs:" + JSON.stringify(error));
    }
    return docs;
  }

  async verifyDocs(testName: string, number: number): Promise<ITestResult> {
    try {
      for (let counter = 1; counter <= number; counter++) {
        const id = 'doc-' + counter;
        const doc = await this.collection.document(id);
        const dictionary = doc.toDictionary();
        const json = JSON.stringify(dictionary);
        const verify = await this.verifyDoc(testName, id, json);
        if (!verify.success) {
          return verify;
        }
      }
    } catch (error) {
      return {
        testName: testName,
        success: false,
        message: 'failed',
        data: JSON.stringify(error),
      };
    }
    return {
      testName: testName,
      success: true,
      message: 'success',
      data: undefined,
    };
  }

  async verifyDoc(
    testName: string,
    withId: string,
    withData: string,
  ): Promise<ITestResult> {
    const doc = await this.collection.document(withId);
    if (doc === undefined && doc === null) {
      return {
        testName: testName,
        success: false,
        message: 'Document not found',
        data: undefined,
      };
    } else {
      if (
        doc?.getId() === withId &&
        JSON.stringify(doc.toDictionary) === withData
      ) {
        return {
          testName: testName,
          success: true,
          message: 'success',
          data: undefined,
        };
      } else {
        return {
          testName: testName,
          success: false,
          message: 'failed',
          data: "id or data doesn't match",
        };
      }
    }
  }

  async getDocumentCount(): Promise<number> {
    const queryString = "SELECT COUNT(*) FROM " + this.dataSource;
    const query = this.database?.createQuery(queryString);
    const resultSet = await query.execute();
    if (resultSet != null) {
      return Number.parseInt(resultSet['count']);
    }
    return 0;
  }
}
