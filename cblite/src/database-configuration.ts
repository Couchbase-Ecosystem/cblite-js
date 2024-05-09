/**
 * Configuration for opening a database
 */
export class DatabaseConfiguration {
    directory: string;
    encryptionKey: string;

    constructor();
    // eslint-disable-next-line no-dupe-class-members,no-unused-vars
    constructor(arg1: DatabaseConfiguration);
    // eslint-disable-next-line no-dupe-class-members,no-unused-vars
    constructor(arg1: string, arg2: string);
    // eslint-disable-next-line no-dupe-class-members
    constructor(
        arg1?: string | DatabaseConfiguration,
        arg2?: string) {
        if (typeof(arg1) === 'string') {
            this.directory = arg1 as string;
        } else if (arg1 instanceof DatabaseConfiguration){
            this.directory = arg1.directory;
            this.encryptionKey = arg1.encryptionKey;
        } else {
           //do nothing
            this.directory = undefined;
        }
        if(typeof(arg2) === 'string'){
           this.encryptionKey = arg2 as string;
        }
    }

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
