import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';

/**
 * DocumentTests - reminder all test cases must start with 'test' in the name of the method or they will not run
 * */
export class DocumentTests extends TestCase {
  constructor() {
    super();
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCreateDoc(): Promise<ITestResult> {
    return {
      testName: 'testCreateDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCreateDocWithID(): Promise<ITestResult> {
    return {
      testName: 'testCreateDocWithID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCreateDocwithEmptyStringID(): Promise<ITestResult> {
    return {
      testName: 'testCreateDocwithEmptyStringID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCreateDocWithNullID(): Promise<ITestResult> {
    return {
      testName: 'testCreateDocWithNullID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCreateDocWithDict(): Promise<ITestResult> {
    return {
      testName: 'testCreateDocWithDict',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetDictionaryContent(): Promise<ITestResult> {
    return {
      testName: 'testSetDictionaryContent',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetValueFromNewEmptyDoc(): Promise<ITestResult> {
    return {
      testName: 'testGetValueFromNewEmptyDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveThenGetFromAnotherDB(): Promise<ITestResult> {
    return {
      testName: 'testSaveThenGetFromAnotherDB',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testNoCacheNoLive(): Promise<ITestResult> {
    return {
      testName: 'testNoCacheNoLive',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetString(): Promise<ITestResult> {
    return {
      testName: 'testSetString',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetString(): Promise<ITestResult> {
    return {
      testName: 'testGetString',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetNumber(): Promise<ITestResult> {
    return {
      testName: 'testSetNumber',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetInteger(): Promise<ITestResult> {
    return {
      testName: 'testGetInteger',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetFloat(): Promise<ITestResult> {
    return {
      testName: 'testGetFloat',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetDouble(): Promise<ITestResult> {
    return {
      testName: 'testGetDouble',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetGetMinMaxNumbers(): Promise<ITestResult> {
    return {
      testName: 'testSetGetMinMaxNumbers',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetGetFloatNumbers(): Promise<ITestResult> {
    return {
      testName: 'testSetGetFloatNumbers',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetBoolean(): Promise<ITestResult> {
    return {
      testName: 'testSetBoolean',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetBoolean(): Promise<ITestResult> {
    return {
      testName: 'testGetBoolean',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetDate(): Promise<ITestResult> {
    return {
      testName: 'testSetDate',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetDate(): Promise<ITestResult> {
    return {
      testName: 'testGetDate',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetBlob(): Promise<ITestResult> {
    return {
      testName: 'testSetBlob',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetBlob(): Promise<ITestResult> {
    return {
      testName: 'testGetBlob',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetDictionary(): Promise<ITestResult> {
    return {
      testName: 'testSetDictionary',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetDictionary(): Promise<ITestResult> {
    return {
      testName: 'testGetDictionary',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetArray(): Promise<ITestResult> {
    return {
      testName: 'testSetArray',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetArray(): Promise<ITestResult> {
    return {
      testName: 'testGetArray',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetNull(): Promise<ITestResult> {
    return {
      testName: 'testSetNull',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testUpdateDictionaryInArray(): Promise<ITestResult> {
    return {
      testName: 'testUpdateDictionaryInArray',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testUpdateNestedArray(): Promise<ITestResult> {
    return {
      testName: 'testUpdateNestedArray',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testUpdateArrayInDictionary(): Promise<ITestResult> {
    return {
      testName: 'testUpdateArrayInDictionary',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetDictionaryToMultipleKeys(): Promise<ITestResult> {
    return {
      testName: 'testSetDictionaryToMultipleKeys',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSetArrayToMultipleKeys(): Promise<ITestResult> {
    return {
      testName: 'testSetArrayToMultipleKeys',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCount(): Promise<ITestResult> {
    return {
      testName: 'testCount',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testContainsKey(): Promise<ITestResult> {
    return {
      testName: 'testContainsKey',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testRemoveKeys(): Promise<ITestResult> {
    return {
      testName: 'testRemoveKeys',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testBlob(): Promise<ITestResult> {
    return {
      testName: 'testBlob',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testMultipleBlobRead(): Promise<ITestResult> {
    return {
      testName: 'testMultipleBlobRead',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testReadingExistingBlob(): Promise<ITestResult> {
    return {
      testName: 'testReadingExistingBlob',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testEnumeratingKeys(): Promise<ITestResult> {
    return {
      testName: 'testEnumeratingKeys',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testEqualityDifferentDocID(): Promise<ITestResult> {
    return {
      testName: 'testEqualityDifferentDocID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testEqualityDifferentDB(): Promise<ITestResult> {
    return {
      testName: 'testEqualityDifferentDB',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testRevisionIDNewDoc(): Promise<ITestResult> {
    return {
      testName: 'testRevisionIDNewDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testRevisionIDExistingDoc(): Promise<ITestResult> {
    return {
      testName: 'testRevisionIDExistingDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testJSONNumber(): Promise<ITestResult> {
    return {
      testName: 'testJSONNumber',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDocumentToJSON(): Promise<ITestResult> {
    return {
      testName: 'testDocumentToJSON',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testUnsavedMutableDocumentToJSON(): Promise<ITestResult> {
    return {
      testName: 'testUnsavedMutableDocumentToJSON',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSpecialJSONStrings(): Promise<ITestResult> {
    return {
      testName: 'testSpecialJSONStrings',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testBlobToJSON(): Promise<ITestResult> {
    return {
      testName: 'testBlobToJSON',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetBlobFromProps(): Promise<ITestResult> {
    return {
      testName: 'testGetBlobFromProps',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testUnsavedBlob(): Promise<ITestResult> {
    return {
      testName: 'testUnsavedBlob',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testGetBlobWithInvalidProps(): Promise<ITestResult> {
    return {
      testName: 'testGetBlobWithInvalidProps',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveBlobAndCompactDB(): Promise<ITestResult> {
    return {
      testName: 'testSaveBlobAndCompactDB',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }
}
