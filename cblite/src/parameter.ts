/**
 * A Parameters object used for setting values to the query parameters defined in the query.
 */
export class Parameter {
  _parameters: { [name:string]: any } = {};

  constructor(private parameters: Parameter = null) {
    this._parameters = parameters && parameters._parameters || {};
  }
  set<T>(name: string, value: T) {
    this._parameters[name] = value;
  }
  get(name: string) {
    return this._parameters[name];
  }
}