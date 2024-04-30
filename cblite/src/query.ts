import { Database } from './database';
import { Parameter } from './parameter';
import {ICoreEngine} from "../coretypes";
import {EngineLocator} from "./engine-locator";
import {Result, ResultSet} from "./result";

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
  private _parameters: Parameter[];
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
    const queryResults = await this._engine.query_Execute({
      name: this._database.getName(),
      query: this._queryString,
      parameters: this._parameters
    });
    const data = queryResults["data"];
    return JSON.parse(data);
  }

  async explain(): Promise<ResultSet> {
    const queryResults = await this._engine.query_Explain({
      name: this._database.getName(),
      query: this._queryString,
      parameters: this._parameters
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
    return this._parameters;
  }

  addParameter(parameter: Parameter) {
    this._parameters.push(parameter);
  }

  removeParameter(parameter: Parameter) {
    const index = this._parameters.indexOf(parameter);
    if (index > -1) {
      this._parameters.splice(index, 1);
    }
  }

  toString() {
    return this._queryString;
  }
}
