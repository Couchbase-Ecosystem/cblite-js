import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';

/**
 * QueryBuilderTests - reminder all test cases must start with 'test' in the name of the method or they will not run
 * */
export class QueryBuilderTests extends TestCase {
  constructor() {
    super();
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectCount(): Promise<ITestResult> {
    return {
      testName: 'testSelectCount',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectAll(): Promise<ITestResult> {
    return {
      testName: 'testSelectAll',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectFieldsWhere(): Promise<ITestResult> {
    return {
      testName: 'testSelectAll',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectWhere(): Promise<ITestResult> {
    return {
      testName: 'testSelectWhere',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectJoin(): Promise<ITestResult> {
    return {
      testName: 'testSelectJoin',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectGroupBy(): Promise<ITestResult> {
    return {
      testName: 'testSelectGroupBy',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSelectGroupByHaving(): Promise<ITestResult> {
    return {
      testName: 'testSelectGroupByHaving',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }
}
