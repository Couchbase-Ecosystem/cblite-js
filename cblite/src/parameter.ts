/**
 * A Parameters object used for setting values to the query parameters defined in the query.
 */
export class Parameter {
  _parameters: { [name:string]: any } = {};

  constructor(private parameters: Parameter = null) {
    this._parameters = parameters && parameters._parameters || {};
  }

  private set<T>(name: string, value: T, type: string = null) {
    this._parameters[name] = value;
    this._parameters[name].type = type;
  }

  setString(name: string, value: string) {
    this.set<string>(name, value, "string");
  }

  setBoolean(name: string, value: boolean) {
    this.set<boolean>(name, value, "boolean");
  }

  setFloat(name: string, value: number) {
    this.set<number>(name, value, "float");
  }

  setDouble(name: string, value: number) {
    this.set<number>(name, value, "double");
  }

  setInt(name: string, value: number) {
    this.set<number>(name, value, "int");
  }

  setInt64(name: string, value: number) {
    this.set<number>(name, value, "int64");
  }

  setDate(name: string, value: string) {
    this.set<string>(name, value, "date");
  }

  get(name: string) {
    return this._parameters[name];
  }
}