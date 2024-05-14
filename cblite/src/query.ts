import { Database } from './database';
import { Parameter } from './parameter';
import {ICoreEngine} from "../coretypes";
import {EngineLocator} from "./engine-locator";
import {Result, ResultSet} from "./result";
import {Dictionary} from "./definitions";
import {Parameters} from "./parameters";

/*
export class QueryChange {
  _error: Error;
  _query: Query;
  _results: string;

  getError(): Error {
    return this._error;
  }
  getQuery(): Query {
    return this._query;
  }
  getResults(): string {
    return this._results;
  }
}

export type QueryChangeListener = (change: QueryChange) => void;
*/

/**
 * A database query. A Query instance can be constructed by calling
 * execute or explain.
 */
export class Query {
  private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);
  private readonly _queryString: string;
  parameters: Parameters;
  private _database: Database;

  constructor(queryString: string, database: Database) {
    this._queryString = queryString;
    this._database = database;
  }

  /*
  addChangeListener(listener: QueryChangeListener) {}
  removeChangeListener(token: ListenerToken) {}
  */

  async execute(): Promise<ResultSet> {
    if (this.parameters === undefined) {
      this.parameters = new Parameters();
    }
    const queryResults = await this._engine.query_Execute({
      name: this._database.getName(),
      query: this._queryString,
      parameters: this.parameters.get()
    });
    const data = queryResults["data"];
    return JSON.parse(data);
  }

  async explain(): Promise<ResultSet> {
    if (this.parameters === undefined) {
      this.parameters = new Parameters();
    }
    const queryResults = await this._engine.query_Explain({
      name: this._database.getName(),
      query: this._queryString,
      parameters: this.parameters.get()
    });
    const data = queryResults["data"];
    return JSON.parse(data);
  }

  getDatabase() {
    return this._database;
  }

  setDatabase(database: Database) {
    this._database = database;
  }

  getParameters() {
    return this.parameters;
  }

  addParameter(parameters: Parameters) {
    this.parameters = parameters;
  }

  toString() {
    return this._queryString;
  }
}
