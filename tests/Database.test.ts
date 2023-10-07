import { beforeAll, describe, expect, test } from "bun:test";
import { SQLiteClient } from "../DB/SQLiteClient";

describe("SQLite Client", () => {
  let db: SQLiteClient;
  beforeAll(async () => {
    db = new SQLiteClient("db:test");
    await db.init();
  });

  test("It insert a person", async () => {
    await db.createUser({
      apelido: "TestUser",
      nome: "Test",
      nascimento: "2023-10-10",
    });
  });
});
