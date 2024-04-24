import { TestCase } from './test-case';
import { ITestResult } from './test-result.types';
import { assert, expect } from 'chai';
import { MutableDocument, ConcurrencyControl, Blob } from 'cblite';

/**
 * DatabaseTests - reminder all test cases must start with 'test' in the name of the method, or they will not run
 * */
export class DatabaseTests extends TestCase {
  constructor() {
    super();
  }

  /**
   * This method creates a new document with a predefined ID and name, saves it to the database,
   * and then verifies the document by comparing it with the expected data.
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testCreateDocument(): Promise<ITestResult> {
    const id = '123';
    const doc = new MutableDocument();
    doc.setId(id);
    doc.setString('name', 'Scott');
    const dic = doc.toDictionary;

    await this.database?.save(doc);
    return this.verifyDoc('testCreateDocument', id, JSON.stringify(dic));
  }

  /**
   * This method creates a new document with a predefined ID and name, saves it to the database,
   * and then deletes the document and validates the document is no longer in the database
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDeleteDocument(): Promise<ITestResult> {
    const id = '123';
    const doc = new MutableDocument();
    doc.setId(id);
    doc.setString('name', 'Scott');
    await this.database?.save(doc);
    const deleteResult = await this.database
      .deleteDocument(doc)
      .then(() => {
        return {
          testName: 'testDeleteDocument',
          success: true,
          message: 'success',
          data: undefined,
        };
      })
      .catch((error: any) => {
        return {
          testName: 'testDeleteDocument',
          success: false,
          message: JSON.stringify(error),
          data: undefined 
        };
      });
    return deleteResult;
  }

  /**
   * This method tests the properties of a database
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testDatabaseProperties(): Promise<ITestResult> {
    const pathResults = await this.getPlatformPath();
    if (!pathResults.success) {
      return pathResults;
    }
    const path = pathResults.data;
    try {
      const dbPath = await this.database?.getPath();
      const dbName = this.databaseName;
      const name = this.database?.getName();

      expect(dbPath).to.include(path);
      expect(name).to.equal(dbName);

      return {
        testName: 'testDatabaseProperties',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: 'testDatabaseProperties',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

  /**
   * This method tests creating documents with an ID and then 
   * make sure the document was saved 
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveDocWithId(): Promise<ITestResult> {
    try {
      const docId = await this.createDocumentWithId('doc1');
      const count = await this.getDocumentCount();
      assert.equal(1, count);
      await this.verifyDoc(
        'testSaveDocWithId',
        'doc1',
        JSON.stringify(docId.toDictionary),
      );
      return {
        testName: 'testSaveDocWithId',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: 'testSaveDocWithId',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

  /**
   * This method tests creating documents with weird special characters
   * in the documentId to make sure the Javascript to Native Bridge 
   * doesn't eat the characters and the document is saved correctly. 
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveDocWithSpecialCharactersDocID(): Promise<ITestResult> {
    try {
      const docId = await this.createDocumentWithId(
        '~@#$%^&*()_+{}|\\][=-/.,<>?":;',
      );
      const count = await this.getDocumentCount();
      assert.equal(1, count);
      await this.verifyDoc(
        'testSaveDocWithSpecialCharactersDocID',
        '~@#$%^&*()_+{}|\\][=-/.,<>?":;',
        JSON.stringify(docId.toDictionary),
      );
      return {
        testName: 'testSaveDocWithSpecialCharactersDocID',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: 'testSaveDocWithSpecialCharactersDocID',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

  /**
   * This method tests updating documents multiple times and then 
   * verifying the document sequence number
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveSameDocTwice(): Promise<ITestResult> {
    try {
      //create document first time
      const docId = await this.createDocumentWithId('doc1');
      let count = await this.getDocumentCount();
      assert.equal(1, count);
      //save the same document again to check sequence number
      await this.database?.save(docId);
      const docSeq2 = await this.database?.getDocument('doc1');
      count = await this.getDocumentCount();
      assert.equal(1, count);
      assert.equal(2, docSeq2?.getSequence());
      return {
        testName: 'testSaveSameDocTwice',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: 'testSaveSameDocTwice',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }


  /**
   * This method tests creating and then updating the same document 
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testAndUpdateMutableDoc(): Promise<ITestResult> {
    try {
      const doc = await this.createDocumentWithId('doc1');
      //update
      doc.setString('firstName', 'Steve');
      await this.database?.save(doc);
      let count = await this.getDocumentCount();
      assert.equal(1, count);

      //update
      doc.setString('lastName', 'Jobs');
      await this.database?.save(doc);
      count = await this.getDocumentCount();
      assert.equal(1, count);

      doc.setInt('age', 56);
      await this.database?.save(doc);
      count = await this.getDocumentCount();
      assert.equal(1, count);

      //validate saves worked
      const updatedDoc = await this.database?.getDocument('doc1');
      assert.equal(4, updatedDoc?.getSequence());
      assert.equal('Steve', updatedDoc?.getString('firstName'));
      assert.equal('Jobs', updatedDoc?.getString('lastName'));
      assert.equal(56, updatedDoc?.getString('age'));

      return {
        testName: 'testAndUpdateMutableDoc',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: 'testAndUpdateMutableDoc',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

  /**
   * This method tests custom conflict resolution by creating a document, 
   * updating it, and then testing if the update worked based on the  
   * ConcurrencyControl parameter passed in. 
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveDocWithConflict(): Promise<ITestResult> {
    const result1 = await this.saveDocWithConflict(
      'testSaveDocWithConflict',
      undefined,
    );
    if (!result1.success) return result1;

    //reset the database
    await this.tearDown();
    await this.init();
    const result2 = await this.saveDocWithConflict(
      'testSaveDocWithConflict',
      ConcurrencyControl.FAIL_ON_CONFLICT,
    );
    if (result2.success) {
      return {
        testName: 'testSaveDocWithConflict',
        success: false,
        message: 'Expected conflict error with ConcurrencyControl.FAIL_ON_CONFLICT but did not get one',
        data: undefined,
      };
    }

    //reset the database
    await this.tearDown();
    await this.init();
    const result3 = await this.saveDocWithConflict(
      'testSaveDocWithConflict',
      ConcurrencyControl.LAST_WRITE_WINS,
    );
    if (!result3.success) return result3;

    return {
      testName: 'testSaveDocWithConflict',
      success: true,
      message: 'success',
      data: undefined,
    };
  }

  async testSaveDocWithNoParentConflict(): Promise<ITestResult> {
    return {
      testName: 'testSaveDocWithNoParentConflict',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testSaveDocWithDeletedConflict(): Promise<ITestResult> {
    return {
      testName: 'testSaveDocWithDeletedConflict',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeletePreSaveDoc(): Promise<ITestResult> {
    return {
      testName: 'testDeletePreSaveDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeleteSameDocTwice(): Promise<ITestResult> {
    return {
      testName: 'testDeleteSameDocTwice',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeleteNoneExistingDoc(): Promise<ITestResult> {
    return {
      testName: 'testDeleteNoneExistingDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeleteAndUpdateDoc(): Promise<ITestResult> {
    return {
      testName: 'testDeleteAndUpdateDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeleteAlreadyDeletedDoc(): Promise<ITestResult> {
    return {
      testName: 'testDeleteAlreadyDeletedDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeleteDocWithConflict(): Promise<ITestResult> {
    return {
      testName: 'testDeleteDocWithConflict',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testPurgePreSaveDoc(): Promise<ITestResult> {
    return {
      testName: 'testPurgePreSaveDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testPurgeDoc(): Promise<ITestResult> {
    return {
      testName: 'testPurgeDoc',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testPurgeSameDocTwice(): Promise<ITestResult> {
    return {
      testName: 'testPurgeSameDocTwice',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }
  
  async testPurgeDocumentOnADeletedDocument(): Promise<ITestResult> {
    return {
      testName: 'testPurgeDocumentOnADeletedDocument',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testPreSavePurgeDocumentWithID(): Promise<ITestResult> {
    return {
      testName: 'testPreSavePurgeDocumentWithID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testPurgeDocumentWithID(): Promise<ITestResult> {
    return {
      testName: 'testPurgeDocumentWithID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testCallPurgeDocumentWithIDTwice(): Promise<ITestResult> {
    return {
      testName: 'testCallPurgeDocumentWithIDTwice',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDeletePurgedDocumentWithID(): Promise<ITestResult> {
    return {
      testName: 'testDeletePurgedDocumentWithID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testPurgeDocumentWithIDOnADeletedDocument(): Promise<ITestResult> {
    return {
      testName: 'testDeletePurgedDocumentWithID',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testDefaultDatabaseConfiguration(): Promise<ITestResult> {
    return {
      testName: 'testDefaultDatabaseConfiguration',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testCopyingDatabaseConfiguration(): Promise<ITestResult> {
    return {
      testName: 'testCopyingDatabaseConfiguration',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }

  async testCopyingDatabase(): Promise<ITestResult> {
    return {
      testName: 'testCopyingDatabase',
      success: false,
      message: 'Not implemented',
      data: undefined,
    };
  }



  /**
   * This method tests running compact on a database
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testPerformMaintenanceCompact(): Promise<ITestResult> {
    try {
      //get 20 docs to test with
      const docs = await this.createDocs('testPerformMaintenanceCompact', 20);

      //update the docs 25 times
      for (const doc of docs) {
        for (let counter = 0; counter < 25; counter++) {
          doc.setValue('number', counter.toString());
          await this.database?.save(doc);
        }
      }

      //create blobs for each of the docs
      for (const doc of docs) {
        const dbDoc = await this.database?.getDocument(doc.getId());
        const mutableDoc = MutableDocument.fromDocument(dbDoc);
        const encoder = new TextEncoder();
        const arrayBuffer = encoder.encode('hello blob');
        const blob = new Blob('text/plain', arrayBuffer);
        mutableDoc.setBlob('blob', blob);
        await this.database?.save(mutableDoc);
      }

      //validate document and attachment count
      const originalDocCount = await this.getDocumentCount();
      assert.equal(originalDocCount, 20);

      //TODO validate amount of attachments

      //compact
      await this.database?.compact();

      //delete all the docs
      for (const doc of docs) {
        await this.database?.deleteDocument(doc);
      }

      //validate the document and attachment count
      const postDeleteDocCount = await this.getDocumentCount();
      assert.equal(postDeleteDocCount, 0);

      //compact again
      await this.database?.compact();

      //TODO validate the attachment count
      return {
        testName: 'testPerformMaintenanceCompact',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: unknown) {
      return {
        testName: 'testPerformMaintenanceCompact',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

    /**
   * This method tests adding many documents to a database, then cleaning
   * up and trying again to validate that the init process works and the
   * database isn't the same database file.
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async testSaveManyDocs(): Promise<ITestResult> {
    try {
      await this.createDocs('testSaveManyDocs', 5000);
      let count = await this.getDocumentCount();
      assert.equal(5000, count);
      await this.verifyDocs('testSaveManyDocs', 5000);

      //cleanup
      await this.tearDown();
      await this.init();

      //try again to validate that we can create new documents after cleanup
      await this.createDocs('testSaveManyDocs', 1000);
      count = await this.getDocumentCount();
      assert.equal(1000, count);
      await this.verifyDocs('testSaveManyDocs', 1000);

      return {
        testName: 'testSaveManyDocs',
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: 'testSaveManyDocs',
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }


   /**
   * This is a helper method used to test ConcurrencyControl
   *
   * @returns {Promise<ITestResult>} A promise that resolves to an ITestResult object which contains the result of the verification.
   */
  async saveDocWithConflict(
    methodName: string,
    control: ConcurrencyControl | undefined,
  ): Promise<ITestResult> {
    try {
        const doc  = await this.createDocumentWithId('doc1');
        doc.setString('firstName', 'Steve');
        doc.setString('lastName', 'Jobs');
        await this.database.save(doc);

        //get two of the same document
        const doc1a = await this.database.getDocument('doc1');
        const doc1b = await this.database.getDocument('doc1');
        const mutableDoc1a = MutableDocument.fromDocument(doc1a);
        const mutableDoc1b = MutableDocument.fromDocument(doc1b);

        mutableDoc1a.setString('lastName', 'Wozniak');
        await this.database.save(mutableDoc1a);
        mutableDoc1a.setString('nickName', 'The Woz');
        await this.database.save(mutableDoc1a);
        const updatedDoc1a = await this.database.getDocument('doc1');
        assert.equal('Wozniak', updatedDoc1a?.getString('lastName'));
        assert.equal('The Woz', updatedDoc1a?.getString('nickName'));
        assert.equal('Steve', updatedDoc1a?.getString('firstName'));
        assert.equal(4, updatedDoc1a?.getSequence());
        if(control === undefined){
          await this.database.save(mutableDoc1b);
        } else {
          await this.database.save(mutableDoc1b, control);
        }
        const updatedDoc1b = await this.database.getDocument('doc1');
        assert.equal(mutableDoc1b.getString('lastName'), updatedDoc1b.getString('lastName'));
        assert.equal(5, updatedDoc1b.getSequence());
      return {
        testName: methodName,
        success: true,
        message: 'success',
        data: undefined,
      };
    } catch (error: any) {
      return {
        testName: methodName,
        success: false,
        message: JSON.stringify(error),
        data: undefined,
      };
    }
  }

}
