/**
 * Configuration for opening a database
 */
export class DatabaseConfiguration {
  directory: string;
  encryptionKey: string;

  getDirectory() {
    return this.directory;
  }

  setDirectory(directory: string) {
    this.directory = directory;
    return this;
  }

  getEncryptionKey() {
    return this.encryptionKey;
  }

  setEncryptionKey(key: string) {
    this.encryptionKey = key;
    return this;
  }
}
