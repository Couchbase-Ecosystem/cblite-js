import {ReplicatorConfiguration} from './replicator-configuration';
import {uuid as v4} from './util/uuid';
import {ICoreEngine} from "../coretypes";
import {EngineLocator} from "./engine-locator";
import {ReplicatorStatus} from "./replicator-status";

export enum ReplicatorActivityLevel {
    STOPPED = 0,
    OFFLINE = 1,
    CONNECTING = 2,
    IDLE = 3,
    BUSY = 4,
}

export class Replicator {
    readonly ActivityLevel = ReplicatorActivityLevel;

    private _replicatorId: string = null;

    private status: ReplicatorStatus;
    
    private _config: ReplicatorConfiguration;

    private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

    /**
     * Initializes a replicator with the given configuration.
     *
     * @param config
     */
    constructor(config: ReplicatorConfiguration) {
        this._replicatorId = v4();
        this._config = config;
    }

    setId(replicatorId: string) {
        this._replicatorId = replicatorId;
    }

    getId() {
        return this._replicatorId;
    }

    async start(): Promise<void> {
        if (this._replicatorId != null) {
            await this._engine.replicator_Restart({
                replicatorId: this._replicatorId,
            });
            return;
        }

        const ret = await this._engine
            .replicator_Create({config: this._config});
        this._replicatorId = ret.replicatorId;

        await this._engine.replicator_Start({replicatorId: this._replicatorId});
    }

    async cleanup():Promise<void> {
        await this._engine.replicator_Cleanup({replicatorId: this._replicatorId});
        this._replicatorId = null;
    }

    stop():Promise<void> {
        return this._engine.replicator_Stop({replicatorId: this._replicatorId});
    }

    resetCheckpoint():Promise<void> {
        return this._engine.replicator_ResetCheckpoint({replicatorId: this._replicatorId});
    }

    getStatus():Promise<ReplicatorStatus> {
        return this._engine.replicator_GetStatus({replicatorId: this._replicatorId});
    }
}