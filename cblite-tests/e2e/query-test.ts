import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';
import * as namesData from "./names_100.json";
import {Collection, MutableDocument} from "cblite";
import {expect} from "chai";

/**
 * QueryTests - reminder all test cases must start with 'test' in the name of the method or they will not run
 * */
export class QueryTests extends TestCase {
  constructor() {
    super();
  }

  async testQueryDefaultCollection(): Promise<ITestResult> {
    const queries = [
        'SELECT name.first FROM _ ORDER BY name.first LIMIT 1',
        'SELECT name.first FROM _default ORDER BY name.first limit 1',
        `SELECT name.first FROM \`${this.database.getName()}\` ORDER BY name.first limit 1`
    ];
    return await this.queryCollectionNamesData(this.defaultCollection, queries, 'testQueryDefaultCollection');
  }

  async testQueryDefaultScope(): Promise<ITestResult> {
    const collection = await this.database.createCollection('names');
    const queries = [
      'SELECT name.first FROM _default.names ORDER BY name.first LIMIT 1',
      'SELECT name.first FROM names ORDER BY name.first LIMIT 1'
    ];
    return await this.queryCollectionNamesData(collection, queries, 'testQueryDefaultScope');
  }

  async testQueryCollection(): Promise<ITestResult> {
    const collection = await this.database.createCollection('names', 'people');
    const queries = [
      'SELECT name.first FROM people.names ORDER BY name.first LIMIT 1',
    ];
    return await this.queryCollectionNamesData(collection, queries, 'testQueryCollection');
  }

  async testQueryInvalidCollection(): Promise<ITestResult> {
    const collection = await this.database.createCollection('names', 'people');
    const queries = [
      'SELECT name.first FROM person.names ORDER BY name.first LIMIT 11',
    ];
    const result = await this.queryCollectionNamesData(collection, queries, 'testQueryInvalidCollection');
    if (!result.success){
        return {
            testName: 'testQueryInvalidCollection',
            success: true,
            message: 'success',
            data: undefined,
        };
    } else {
      return {
        testName: '',
        success: false,
        message: 'Error - expected query to fail',
        data: undefined,
      };
    }
  }

  async testJoinWithCollections(): Promise<ITestResult> {
    try {
      const flowersCol = await this.database.createCollection('flowers', 'test');
      const colorsCol = await this.database.createCollection('colors', 'test');

      //add documents
      await flowersCol.save(new MutableDocument('c1', null, {name: 'rose', cid: 1}));
      await flowersCol.save(new MutableDocument('c2', null, {name: 'hydrangea', cid: 2}));

      await colorsCol.save(new MutableDocument('c1', null, {color: 'red', cid: 1}));
      await colorsCol.save(new MutableDocument('c2', null, {color: 'blue', cid: 2}));
      await colorsCol.save(new MutableDocument('c3', null, {color: 'white', cid: 3}));

      const strQuery = 'SELECT a.name, b.color FROM test.flowers a JOIN test.colors b ON a.cid = b.cid ORDER BY a.name';

      const query = this.database.createQuery(strQuery);
      const result = await query.execute();

      expect(result.length).to.be.equal(2);
      expect(result[0].name).to.be.equal('hydrangea');
      expect(result[0].color).to.be.equal('blue');
      expect(result[1].name).to.be.equal('rose');
      expect(result[1].color).to.be.equal('red');

      return {
        testName: 'testJoinWithCollections',
        success: true,
        message: 'success',
        data: undefined,
      }

    } catch (error){
      return {
        testName: 'testJoinWithCollections',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      }
    }
  }

  async queryCollectionNamesData(collection: Collection, queries: string[], testName: string)
      : Promise<ITestResult> {
    try {
      await this.loadNamesData(collection);
      for(const query of queries) {
        const dbQuery = this.database.createQuery(query);
        const result = await dbQuery.execute();
        expect(result.length).to.be.equal(1);
      }

    } catch(error){
      return {
        testName: testName,
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
    return {
      testName: testName,
      success: true,
      message: 'success',
      data: undefined,
    };
  }

  async loadNamesData(collection: Collection) {
    const docs = namesData;
    let count = 0;
    for (const doc of docs['default']) {
      const mutableDoc = new MutableDocument(`doc-${count.toString()}`,null,doc);
      await collection.save(mutableDoc);
      count++;
    }
  }
}
