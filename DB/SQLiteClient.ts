import Database from "bun:sqlite";
import { DatabaseClient } from "./DatabaseClient";
import { IPessoa } from "../Contracts";
import { resolve } from "bun";
import { IPessoaData } from "../Data/UserModel";
import { randomUUID } from "crypto";

export class SQLiteClient extends DatabaseClient {
  private db: Database;

  constructor(dbfile: string | null = null) {
    super();
    if (!dbfile) this.db = new Database();
    else this.db = new Database(dbfile);
  }
  override async init() {
    return new Promise<void>((resolve, reject) => {
      try {
        const checkIfExistsQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='pessoas'`;
        const checkIfExists = this.db.prepare(checkIfExistsQuery).get();
        console.info(checkIfExists);
        if (checkIfExists == undefined)
          this.db
            .prepare(
              `CREATE TABLE pessoas (
              id TEXT PRIMARY KEY,
              apelido TEXT NOT NULL,
              nome TEXT NOT NULL,
              nascimento TEXT NOT NULL,
              stack TEXT);`
            )
            .run();
        resolve();
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
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
  override createUser(user: IPessoa): Promise<void> {
    const id = randomUUID();
    console.info(id);
    const query = `INSERT INTO pessoas (id, apelido, nome, nascimento, stack) VALUES (?, ?, ?, ?, ?)`;
    const strStack = JSON.stringify(user.stack) ?? "";
    const objectValues = Object.values(user) as string[];
    if (!user.stack) objectValues.push(strStack);
    console.log(objectValues);
    return new Promise<void>((resolve, reject) => {
      try {
        objectValues.unshift(id);
        if (objectValues.length !== 5) throw Error("Wrong Lenght");
        console.info(objectValues, query);
        this.db.query(query).run(...objectValues);
        console.info("Oi");
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
  override searchByUserId(userId: string): Promise<IPessoaData> {
    const query = "SELECT * FROM pessoas WHERE id = (?)";
    return new Promise<IPessoa>((resolve, reject) => {
      try {
        const user = this.db.query(query).get(userId) as IPessoaData;
        if (user === undefined) throw Error("User not found");
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }
}
