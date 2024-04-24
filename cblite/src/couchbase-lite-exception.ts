export class CouchbaseLiteException extends Error {
  constructor(public message: string, public domain: string, public code: number) {
    super();
  }
}