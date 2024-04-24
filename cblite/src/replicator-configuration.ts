import {Authenticator} from './authenticator';
import {Collection} from "./collection";
import {CollectionConfig} from "./collection-config";
import {Endpoint} from "./endpoint";

export enum ReplicatorType {
    PUSH_AND_PULL = 'PUSH_AND_PULL',
    PUSH = 'PUSH',
    PULL = 'PULL'
}

export class ReplicatorConfiguration {
    static readonly ReplicatorType = ReplicatorType;

    // Replicator option dictionary keys:
    static kC4ReplicatorOptionExtraHeaders = "headers";  // Extra HTTP headers; string[]
    static kC4ReplicatorOptionCookies = "cookies";  // HTTP Cookie header value; string
    static kCBLReplicatorAuthOption = "auth";       // Auth settings; Dict
    static kC4ReplicatorOptionPinnedServerCert = "pinnedCert";  // Cert or public key; data
    static kC4ReplicatorOptionDocIDs = "docIDs";   // Docs to replicate; string[]
    static kC4ReplicatorOptionChannels = "channels";// SG channel names; string[]
    static kC4ReplicatorOptionFilter = "filter";   // Filter name; string
    static kC4ReplicatorOptionFilterParams = "filterParams";  // Filter params; Dict[string]
    static kC4ReplicatorOptionSkipDeleted = "skipDeleted"; // Don't push/pull tombstones; bool
    static kC4ReplicatorOptionNoConflicts = "noConflicts"; // Puller rejects conflicts; bool
    static kC4ReplicatorCheckpointInterval = "checkpointInterval"; // How often to checkpoint, in seconds; number
    static kC4ReplicatorOptionRemoteDBUniqueID = "remoteDBUniqueID"; // How often to checkpoint, in seconds; number
    static kC4ReplicatorResetCheckpoint = "reset"; // reset remote checkpoint

    // Auth dictionary keys:
    static kC4ReplicatorAuthType = "type"; // Auth property; string
    static kCBLReplicatorAuthUserName = "username"; // Auth property; string
    static kCBLReplicatorAuthPassword = "password"; // Auth property; string
    static kC4ReplicatorAuthClientCert = "clientCert"; // Auth property; value platform-dependent

    // auth.type values:
    static kC4AuthTypeBasic = "Basic"; // HTTP Basic (the default)
    static kC4AuthTypeSession = "Session"; // SG session cookie
    static kC4AuthTypeOpenIDConnect = "OpenID Connect";
    static kC4AuthTypeFacebook = "Facebook";
    static kC4AuthTypeClientCert = "Client Cert";

    private continuous = false;
    private replicatorType: ReplicatorType;
    private authenticator: Authenticator;
    private pinnedServerCertificate: string;
    private headers: { [name: string]: string };
    private heartbeat: number;
    private maxAttempts: number;
    private maxAttemptWaitTime: number;
    private selfSignedCerts: boolean;
    private autoPurgeEnabled: boolean;
    private acceptParentDomainCookies: boolean;
    private collections: Map<Collection[], CollectionConfig>;

    constructor(private target: Endpoint) {
        this.replicatorType = ReplicatorType.PUSH_AND_PULL;
        this.target = target;
        this.heartbeat = 60;
        this.collections = new Map();
    }

    getCollections() {
        return Array.from(this.collections.keys());
    }

    addCollection(collection: Collection, config: CollectionConfig) {
        const cols: Collection[] = [];
        cols.push(collection);

        this.removeCollection(collection);
        this.collections.set(cols, config);
    }

    addCollections(collections: Collection[],
                   config: CollectionConfig) {
        this.removeCollections(collections);
        this.collections.set(collections, config);
    }

    private removeCollections(collections: Collection[]) {
        for (const col of collections) {
            for (const key of this.collections.keys()) {
                if (key.includes(col)) {
                    this.collections.delete(key);
                }
            }
        }
    }

    removeCollection(collection: Collection) {
        for (const key of this.collections.keys()) {
            if (key.includes(collection)) {
                const newCols = key.filter((col) => col !== collection);
                const config = this.collections.get(key);
                this.collections.delete(key);
                this.collections.set(newCols, config);
            }
        }
    }

    getCollectionConfig(collection: Collection): CollectionConfig | null {
        for (const key of this.collections.keys()) {
            if (key.includes(collection)) {
                return this.collections.get(key);
            }
        }
        return null;
    }

    setReplicatorType(replicatorType: ReplicatorType) {
        this.replicatorType = replicatorType;
    }

    setContinuous(continuous: boolean) {
        this.continuous = continuous;
    }

    setAuthenticator(authenticator: Authenticator) {
        this.authenticator = authenticator;
    }

    setPinnedServerCertificate(pinnedServerCertificate: string) {
        this.pinnedServerCertificate = pinnedServerCertificate;
    }

    setHeaders(headers: { [name: string]: string }) {
        this.headers = headers;
    }

    setHeartbeat(heartbeat: number) {
        this.heartbeat = heartbeat;
    }

    setMaxAttempts(maxAttempts: number) {
        this.maxAttempts = maxAttempts;
    }

    setMaxAttemptWaitTime(maxAttemptWaitTime: number) {
        this.maxAttemptWaitTime = maxAttemptWaitTime;
    }

    setSelfSignedCerts(selfSignedCerts: boolean) {
        this.selfSignedCerts = selfSignedCerts;
    }

    setAutoPurgeEnabled(autoPurgeEnabled: boolean) {
        this.autoPurgeEnabled = autoPurgeEnabled;
    }

    setAcceptParentDomainCookies(acceptParentDomainCookies: boolean) {
        this.acceptParentDomainCookies = acceptParentDomainCookies;
    }

    toJson() {
        return {
            replicatorType: this.replicatorType,
            collectionConfigs: this.collections,
            continuous: this.continuous,
            authenticator: {type: this.authenticator.getType(), data: this.authenticator.toJson()},
            target: this.target.toJson(),
            headers: this.headers,
            heartbeat: this.heartbeat,
            maxAttempts: this.maxAttempts,
            maxAttemptWaitTime: this.maxAttemptWaitTime,
            pinnedServerCertificate: this.pinnedServerCertificate,
            autoPurgeEnabled: this.autoPurgeEnabled,
            acceptParentDomainCookies: this.acceptParentDomainCookies,
            selfSignedCerts: this.selfSignedCerts
        }
    }
}