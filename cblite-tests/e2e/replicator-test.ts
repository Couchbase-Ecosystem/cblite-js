import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';

/**
 * ReplicatorTests - reminder all test cases must start with 'test' in the name of the method or they will not run
 * */
export class ReplicatorTests extends TestCase {
  constructor() {
    super();
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testEmptyPush(): Promise<ITestResult> {
    return {
      testName: 'testEmptyPush',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testStartWithCheckpoint(): Promise<ITestResult> {
    return {
      testName: 'testStartWithCheckpoint',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testStartWithResetCheckpointContinuous(): Promise<ITestResult> {
    return {
      testName: 'testStartWithResetCheckpointContinuous',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDocumentReplicationEvent(): Promise<ITestResult> {
    return {
      testName: 'testDocumentReplicationEvent',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testRemoveDocumentReplicationListener(): Promise<ITestResult> {
    return {
      testName: 'testRemoveDocumentReplicationListener',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDocumentReplicationEventWithPushConflict(): Promise<ITestResult> {
    return {
      testName: 'testDocumentReplicationEventWithPushConflict',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDocumentReplicationEventWithPullConflict(): Promise<ITestResult> {
    return {
      testName: 'testDocumentReplicationEventWithPullConflict',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDocumentReplicationEventWithDeletion(): Promise<ITestResult> {
    return {
      testName: 'testDocumentReplicationEventWithDeletion',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSingleShotPushFilter(): Promise<ITestResult> {
    return {
      testName: 'testSingleShotPushFilter',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testContinuousPushFilter(): Promise<ITestResult> {
    return {
      testName: 'testContinuousPushFilter',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testPullFilter(): Promise<ITestResult> {
    return {
      testName: 'testPullFilter',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testPushAndForget(): Promise<ITestResult> {
    return {
      testName: 'testPushAndForget',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testPullRemovedDocWithFilterSingleShot(): Promise<ITestResult> {
    return {
      testName: 'testPullRemovedDocWithFilterSingleShot',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testPullRemovedDocWithFilterContinuous(): Promise<ITestResult> {
    return {
      testName: 'testPullRemovedDocWithFilterContinuous',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testStopAndRestartPushReplicationWithFilter(): Promise<ITestResult> {
    return {
      testName: 'testStopAndRestartPushReplicationWithFilter',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testStopAndRestartPullReplicationWithFilter(): Promise<ITestResult> {
    return {
      testName: 'testStopAndRestartPullReplicationWithFilter',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testReplicatorConfigDefaultValues(): Promise<ITestResult> {
    return {
      testName: 'testReplicatorConfigDefaultValues',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testRemoveChangeListener(): Promise<ITestResult> {
    return {
      testName: 'testRemoveChangeListener',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testAddRemoveChangeListenerAfterReplicatorStart(): Promise<ITestResult> {
    return {
      testName: 'testAddRemoveChangeListenerAfterReplicatorStart',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCopyingReplicatorConfiguration(): Promise<ITestResult> {
    return {
      testName: 'testCopyingReplicatorConfiguration',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testReplicationConfigSetterMethods(): Promise<ITestResult> {
    return {
      testName: 'testReplicationConfigSetterMethods',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }
}
