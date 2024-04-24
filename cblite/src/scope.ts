import {ICoreEngine} from "../coretypes";
import {EngineLocator} from "./engine-locator";
import {Collection} from "./collection";

export class Scope {

	private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

	name: string;
	databaseName: string;

	constructor(name: string | undefined,  databaseName: string | undefined) {
		this.name = name ?? "";
		this.databaseName = databaseName ?? "";
	}

	async collections(): Promise<Collection[]> {
		const results = await this._engine.collection_GetCollections({name: this.databaseName, scopeName: this.name});
		return results.collections;
	}

	async collection(collectionName: string): Promise<Collection | null> {
		return this._engine.collection_GetCollection({
			name: this.databaseName,
			collectionName: collectionName,
			scopeName: this.name
		});
	}
}