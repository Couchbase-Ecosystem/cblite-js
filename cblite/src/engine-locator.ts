import { ICoreEngine } from '../coretypes';

export class EngineLocator {
	static readonly key: string = 'default';
	private static engines: Map<string, ICoreEngine> = new Map();

	static registerEngine(key: string, service: ICoreEngine): void {
		EngineLocator.engines.set(key, service);
	}

	static getEngine(key: string): ICoreEngine {
		return EngineLocator.engines.get(key);
	}
}