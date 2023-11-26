import mssql from "mssql";
import { dbConfig } from "../config/dbConfig";

export default class DatabaseHelper {
  static getInstance() {
      throw new Error("Method not implemented.");
  }
  private pool: Promise<mssql.ConnectionPool>;
  //   getConnection: any;
  constructor() {
    this.pool = this.getConnection();
  }
  async getConnection(): Promise<mssql.ConnectionPool> {
    const pool = mssql.connect(dbConfig) as Promise<mssql.ConnectionPool>;
    return pool;
  }
  createRequest(
    request: mssql.Request,
    data: { [c: string | number]: string | number }
  ) {
    const keys = Object.keys(data);

    keys.map((keyName) => {
      const keyValue = data[keyName];
      request.input(keyName, keyValue);
    });
    return request;
  }
  async query(query: string) {
    const results = (await this.pool).request().query(query);
    return results;
  }
  async execute(
    procedureName: string,
    data: { [c: string | number]: string | number } = {}
  ) {
    let pool = await this.pool;
    let request = (await pool.request()) as mssql.Request;
    request = this.createRequest(request, data);
    const result = await request.execute(procedureName);
    return result;
  }
}
