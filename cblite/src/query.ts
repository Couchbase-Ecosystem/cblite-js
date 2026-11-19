import { ICoreEngine, QueryChangeListener } from '../core-types';
import { Database } from './database';
import { EngineLocator } from './engine-locator';
import { ResultSet } from './result';
import { Parameters } from './parameters';
import { ListenerToken } from './listener-token';
import { ChangeListenerSlot } from './util/change-listener-slot';

/**
 * A database query. A Query instance can be constructed by calling
 * execute or explain.
 */
export class Query {
  private readonly _queryString: string;
  parameters: Parameters = new Parameters();
  private _database: Database;

  //used for engine calls
  private _engine: ICoreEngine = EngineLocator.getEngine(EngineLocator.key);

  //query change listener support
  private _changeListener = new ChangeListenerSlot<QueryChangeListener>();

  constructor(queryString: string, database: Database) {
    this._queryString = queryString;
    this._database = database;
  }

  /**
   * Adds a query change listener.
   *
   * @function
   */
  async addChangeListener(listener: QueryChangeListener): Promise<ListenerToken> {
    const token = this._engine.getUUID();

    return this._changeListener.claim(token, listener, {
      start: () =>
        this._engine.query_AddChangeListener(
          {
            name: this._database.getUniqueName(),
            query: this._queryString,
            parameters: this.parameters.get(),
            changeListenerToken: token,
          },
          (data, err) => {
            if (err) {
              throw err;
            }
            this.notifyChangeListeners(data);
          }
        ),
      // calling the remove listener native method
      stop: () =>
        this._engine.listenerToken_Remove({
          changeListenerToken: token,
        }),
      alreadyStartedMessage: `Listener for query ${this._queryString} already started`,
    });
  }

  /**
   * Adds a Parameter object used for setting values to the query parameters defined in the query. All parameters defined in the query must be given values before running the query, or the query will fail.
   *
   * @function
   */
  addParameter(parameters: Parameters) {
    this.parameters = parameters;
  }

  /**
   * Executes the query. The returning an enumerator that returns result rows one at a time.
   *
   * The results come from a snapshot of the database taken at the moment -run: is called, so they will not reflect any changes made to the database afterward.
   *
   * @function
   */
  async execute(): Promise<ResultSet> {

    const queryResults = await this._database.getEngine().query_Execute({
      name: this._database.getUniqueName(),
      query: this._queryString,
      parameters: this.parameters.get(),
    });
    const data = queryResults.data;
    return JSON.parse(data);
  }

  /**
   *
   * Returns a string describing the implementation of the compiled query. This is intended to be read by a developer for purposes of optimizing the query, especially to add database indexes. It’s not machine-readable and its format may change.
   *
   * As currently implemented, the result is two or more lines separated by newline characters:
   *
   * The first line is the SQLite SELECT statement.
   * The subsequent lines are the output of SQLite’s “EXPLAIN QUERY PLAN” command applied to that statement; for help interpreting this, see https://www.sqlite.org/eqp.html . The most important thing to know is that if you see “SCAN TABLE”, it means that SQLite is doing a slow linear scan of the documents instead of using an index.
   *
   * @function
   */
  async explain(): Promise<string> {
    const queryResults = await this._database.getEngine().query_Explain({
      name: this._database.getUniqueName(),
      query: this._queryString,
      parameters: this.parameters.get(),
    });
    return queryResults.data;
  }

  getDatabase() {
    return this._database;
  }

  /**
   * A Parameters object used for setting values to the query parameters defined in the query. All parameters defined in the query must be given values before running the query, or the query will fail.
   *
   * The returned Parameters object will be readonly.
   *
   * @function
   */
  getParameters() {
    return this.parameters;
  }

  /**
   * send data to the listener
   *
   * @function
   */
  private notifyChangeListeners(data: any) {
    const stringData = data.data;
    this._changeListener.notify({
      query: this,
      error: data.error,
      results: JSON.parse(stringData),
    });
  }

  /**
   * Removes a change listener wih the given listener token.
   *
   * @function
   */
  async removeChangeListener(token: string | ListenerToken) {
    const uuidToken: string = typeof token === 'string' 
      ? token 
      : token.getUuidToken();

    if (!(await this._changeListener.remove(uuidToken))) {
      // Unknown token: call generic bridge method directly; the active
      // listener (if any) stays registered.
      await this._engine.listenerToken_Remove({
        changeListenerToken: uuidToken
      });
    }
  }

  setDatabase(database: Database) {
    this._database = database;
  }

  /**
   * Returns the query string used to create this Query instance
   * @returns {string} The original query string
   * @example
   * const query = new Query("SELECT * FROM users WHERE age >= $minAge", database);
   * console.log(query.toString());
   * // Returns: "SELECT * FROM users WHERE age >= $minAge"
   * 
   * // Useful for debugging or logging query definitions
   * console.log(`Current query: ${query}`); // Automatically calls toString()
   */
  toString() {
    return this._queryString;
  }
}
