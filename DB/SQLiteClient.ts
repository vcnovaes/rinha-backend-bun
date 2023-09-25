import Database from "bun:sqlite";
import { DatabaseClient } from "./DatabaseClient";
import { IPessoa } from "../Contracts";

export class SQLiteClient extends DatabaseClient {
  private db: Database;

  constructor() {
    super();
    this.db = new Database();
  }
  override init() {
    this.db
      .query(
        `CREATE TABLE pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apelido TEXT NOT NULL,
    nome TEXT NOT NULL,
    nascimento TEXT NOT NULL,
    stack TEXT`
      )
      .run();
  }

  override countTotalOfUsers(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const query = "SELECT COUNT(*) as total FROM pessoas";
      try {
        const res = Number(this.db.query(query).get());
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }
  override createUser(user: IPessoa): void {
    const query =
      "INSERT INTO pessoas (apelido, nome, nascimento, stack) VALUES (?, ?, ?, ?)";
    const strStack = JSON.stringify(user);
    const objectValues = Object.values(user);
    if (user.stack) objectValues[objectValues.length - 1] = strStack;

    this.db.query(query, objectValues);
  }
  override searchByUserId(userId: string): void {}
  override searchUsersByTerm(searchTerm: string): void {}
}
