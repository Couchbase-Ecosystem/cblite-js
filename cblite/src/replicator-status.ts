import {CouchbaseLiteException} from "./couchbase-lite-exception";
import {ReplicatorActivityLevel} from "./replicator";
import {ReplicatorProgress} from "./replicator-progress";

export class ReplicatorStatus {
    constructor(
        private activityLevel: ReplicatorActivityLevel,
        private progress: ReplicatorProgress,
        private error: CouchbaseLiteException,
    ) {
    }

    getActivityLevel() {
        return this.activityLevel;
    }

    getProgress() {
        return this.progress;
    }

    getError() {
        return this.error;
    }

    toString() {
        return `Status{activityLevel=${this.activityLevel}, progress=${this.progress}, error=${this.error}}`;
    }

    copy() {
        return new ReplicatorStatus(this.activityLevel, this.progress, this.error);
    }
}