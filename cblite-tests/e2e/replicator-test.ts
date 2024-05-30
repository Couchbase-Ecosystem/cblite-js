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
      //check to make sure that the default values are being set in the configuration
      expect(config.getCollections().length).to.be.equal(1);
      expect(config.getCollections()[0]).to.be.equal(this.collection);
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
          message: `${error}`,
          data: undefined,
        };
    }
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testReplicationStatusChangeListenerEvent(): Promise<ITestResult> {
    try {

      //this is using the replication configuration from the Android Kotlin Learning path
      //**TODO update to use the new configuration and endpoint**
      const target = new URLEndpoint('ws://localhost:4984/projects');
      const auth = new BasicAuthenticator('demo@example.com', 'P@ssw0rd12');
      const config = new ReplicatorConfiguration(target);
      config.addCollection(this.defaultCollection);
      config.setAuthenticator(auth);

      let isError = false;
      let didGetChangeStatus = false;

      const replicator = await Replicator.create(config);
      const token = await replicator.addChangeListener((change) => {

        //check to see if there was an error
        const error = change.status.getError();
        if (error !== undefined) {
          isError = true;
        }
        //get the status of the replicator using ReplicatorActivityLevel enum
        if (change.status.getActivityLevel() ===  ReplicatorActivityLevel.IDLE) {
          //do something because the replicator is now IDLE
        }
        didGetChangeStatus = true;
      });

      //don't start with a new checkpoint by passing false to the start method
      await replicator.start(false);
      //we need to sleep to wait for the documents to replicate, no one would ever normally do this
      //don't include in docs
      await this.sleep(5000);

      //this mimics what someone would do when the app needs to close to properly clean up the
      //replicator and processes
      await replicator.removeChangeListener(token);
      await replicator.stop();

      //validate we got documents replicated
      const count = await this.defaultCollection.count();
      expect(count.count).to.be.greaterThan(0);

      //validate our listener was called and there wasn't errors
      expect(isError).to.be.false;
      expect(didGetChangeStatus).to.be.true;

      return {
        testName: 'testReplicationStatusChangeListenerEvent',
        success: true,
        message: `success`,
        data: undefined,
      };
    } catch (error) {
      return {
        testName: 'testReplicationStatusChangeListenerEvent',
        success: false,
        message: `${error}`,
        data: undefined,
      };
    }
  }

  /**
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDocumentChangeListenerEvent(): Promise<ITestResult> {
    try {

      //this is using the replication configuration from the Android Kotlin Learning path
      //**TODO update to use the new configuration and endpoint**
      const target = new URLEndpoint('ws://localhost:4984/projects');
      const auth = new BasicAuthenticator('demo@example.com', 'P@ssw0rd12');
      const config = new ReplicatorConfiguration(target);
      config.addCollection(this.defaultCollection);
      config.setAuthenticator(auth);

      let isError = false;
      let didGetDocumentUpdate = false;

      const replicator = await Replicator.create(config);

      const token = await replicator.addDocumentChangeListener((change) => {
        //check to see if the documents were pushed or pulled
        //if isPush is true then the documents were pushed, else it was pulled
        const isPush = change.isPush;
        //loop through documents
        for (const doc of change.documents) {
            //details of each document along with if there was an error on that doc
            const id = doc.id;
            const flags = doc.flags;
            const error = doc.error;
            if (error !== undefined) {
                isError = true;
            }
        }
        didGetDocumentUpdate = true;
      });

      //don't start with a new checkpoint by passing false to the start method
      await replicator.start(false);
      //we need to sleep to wait for the documents to replicate, no one would ever normally do this
      //don't include in docs
      await this.sleep(5000);

      //this mimics what someone would do when the app needs to close to properly clean up the
      //replicator and processes
      await replicator.removeChangeListener(token);
      await replicator.stop();

      //validate we got documents replicated
      const count = await this.defaultCollection.count();
      expect(count.count).to.be.greaterThan(0);

      //validate our listener was called and there wasn't erorrs
      expect(isError).to.be.false;
      expect(didGetDocumentUpdate).to.be.true;

      return {
        testName: 'testDocumentChangeListenerEvent',
        success: true,
        message: `success`,
        data: undefined,
      };
    } catch (error) {
      return {
        testName: 'testDocumentChangeListenerEvent',
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
