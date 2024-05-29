import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';
import {
  BasicAuthenticator,
  Replicator,
  ReplicatorActivityLevel,
  ReplicatorConfiguration,
  ReplicatorType,
  URLEndpoint
} from 'cblite';
import {expect} from "chai";

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
  async testReplicatorConfigDefaultValues(): Promise<ITestResult> {
    const target = new URLEndpoint('ws://localhost:4984/db');
    const config = new ReplicatorConfiguration(target);
    config.addCollection(this.collection);

    try {
      expect(config.getCollections().length).to.be.equal(1);
      expect(config.getCollections()[0][0]).to.be.equal(this.collection);
      expect(config.getReplicatorType()).to.be.equal(ReplicatorType.PUSH_AND_PULL);

      expect(config.getAcceptOnlySelfSignedCerts()).to.be.equal(ReplicatorConfiguration.defaultSelfSignedCertificateOnly);
      expect(config.getAllowReplicatingInBackground()).to.be.equal(ReplicatorConfiguration.defaultAllowReplicatingInBackground);
      expect(config.getAcceptParentDomainCookies()).to.be.equal(ReplicatorConfiguration.defaultAcceptParentDomainCookies);
      expect(config.getAutoPurgeEnabled()).to.be.equal(ReplicatorConfiguration.defaultEnableAutoPurge);
      expect(config.getContinuous()).to.be.equal(ReplicatorConfiguration.defaultContinuous);
      expect(config.getHeartbeat()).to.be.equal(ReplicatorConfiguration.defaultHeartbeat);
      expect(config.getMaxAttempts()).to.be.equal(ReplicatorConfiguration.defaultMaxAttemptsSingleShot);
      expect(config.getMaxAttemptWaitTime()).to.be.equal(ReplicatorConfiguration.defaultMaxAttemptsWaitTime);

      expect(config.getHeaders()).to.be.equal(undefined);
      expect(config.getAuthenticator()).to.be.equal(undefined);
      return {
        testName: 'testReplicatorConfigDefaultValues',
        success: true,
        message: `success`,
        data: undefined,
      };
    } catch (error) {
        return {
          testName: 'testReplicatorConfigDefaultValues',
          success: false,
          message: error,
          data: undefined,
        };
    }
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testEmptyPush(): Promise<ITestResult> {
    try {
      const target = new URLEndpoint('ws://localhost:4984/db');
      const auth = new BasicAuthenticator('user', 'password');
      const config = new ReplicatorConfiguration(target);
      config.addCollection(this.defaultCollection);

      const replicator = await Replicator.create(config);
      const token = await replicator.addChangeListener((change) => {
        const error = change.status.getError();
        if (error !== null) {
          return {
            testName: 'testEmptyPush',
            success: false,
            message: error,
            data: undefined,
          };
        } else {
          if (change.status.getActivityLevel() ===  ReplicatorActivityLevel.IDLE) {
            return {
              testName: 'testEmptyPush',
              success: true,
              message: `success`,
              data: undefined,
            };
          }
        }
      });
      await replicator.start(false);
      await replicator.stop();

      return {
        testName: 'testEmptyPush',
        success: true,
        message: `success`,
        data: undefined,
      };
    } catch (error) {
      return {
        testName: 'testEmptyPush',
        success: false,
        message: `Error:${error}`,
        data: undefined,
      };
    }
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
