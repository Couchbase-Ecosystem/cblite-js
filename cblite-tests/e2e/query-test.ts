import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';
import * as namesData from "./names_100.json";
import {MutableDocument} from "cblite";

/**
 * QueryTests - reminder all test cases must start with 'test' in the name of the method or they will not run
 * */
export class QueryTests extends TestCase {
  constructor() {
    super();
  }

  async loadNamesData() {
    const docs = namesData;
    let count = 0;
    for (const doc of docs) {
      const mutableDoc = new MutableDocument(count.toString(),null,doc);
      await this.collection.save(mutableDoc);
      count++;
    }
  }
}
