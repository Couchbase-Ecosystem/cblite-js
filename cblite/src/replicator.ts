import {ReplicatorConfiguration} from './replicator-configuration';
import {uuid as v4} from './util/uuid';
import {ICoreEngine} from "../coretypes";
import {EngineLocator} from "./engine-locator";
import {ReplicatorStatus} from "./replicator-status";
import {ReplicatorActivityLevel} from "./replicator-activity-level";

export class Replicator {
    readonly ActivityLevel:ReplicatorActivityLevel = undefined;

    private _replicatorId: string = undefined;
    private status: ReplicatorStatus;
    private readonly _config: ReplicatorConfiguration;
    private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

    /**
     * Initializes a replicator with the given configuration.
     *
     * @param config
     */
    constructor(config: ReplicatorConfiguration) {
        this._config = config;
    }

    /**
     * Removes the replicator from the native engine and stops the replicator from running.
     * This will remove all listeners from the replicator.  As part of this, if you were to call start
     * after this method, a new replicator would be created Natively and a new replicator id would be
     * created.
     *
     * @function
     *
     */
    async cleanup():Promise<void> {
        await this._engine.replicator_Cleanup({replicatorId: this._replicatorId});
        this._replicatorId = null;
    }

    /**
     * returns the replicator id used to manage the replicator between the engine and the replicator
     * native implementation.  This value should get set when the replicator is created in the native
     * t engine via the start method.
     * @function
     *
     */
    getId() : string | undefined {
        return this._replicatorId;
    }

    /**
     * returns a copy of the replicators current configuration.
     * @function
     */
    getConfiguration():ReplicatorConfiguration {
        return this._config;
    }

    /**
     * returns the replicators current status: its activity level and progress.
     *
     * @function
     */
    getStatus():Promise<ReplicatorStatus> {
        return this._engine.replicator_GetStatus({replicatorId: this._replicatorId});
    }

    /**
     * Starts the replicator with an option to reset the local checkpoint of the replicator. When the
     * local checkpoint is reset, the replicator will sync all changes since the beginning of time from
     * the remote database.
     *
     * This method returns immediately; the replicator runs asynchronously and will report its progress
     * through the replicator change notification.
     *
     * @function
     *
     * @param {boolean} reset Resets the local checkpoint before starting the replicator.
     */
    async start(reset: boolean | undefined): Promise<void> {
        if (this._replicatorId !== undefined && reset) {
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

    /**
     * Stops a running replicator. This method returns immediately; when the replicator actually
     * stops, the replicator will change its status's activity level to
     * `ReplicatorActivityLevel.STOPPED` and the replicator change notification will be notified
     * accordingly.
     *
     * @function
     */
    stop():Promise<void> {
        return this._engine.replicator_Stop({replicatorId: this._replicatorId});
    }
}