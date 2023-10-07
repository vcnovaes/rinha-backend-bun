import Database from "bun:sqlite";
import { Controller } from "./Controllers/UserController";
import { Route, Router } from "./Router/RouterMap";
import { MongoClient, ServerApiVersion } from "mongodb";
import { DatabaseClient } from "./DB/DatabaseClient";
import { SQLiteClient } from "./DB/SQLiteClient";
import { UserRepository } from "./Data/UserRepository";

const db = new SQLiteClient(Bun.env.SQLITE_FILE);
await db.init();
await db.createUser({
  apelido: "TestUser",
  nome: "Test",
  nascimento: "2023-10-10",
});
const userRepository = new UserRepository(db);
console.info("Ok");
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const route = new URL(req.url);
    const requestedRoute: Route = { method: req.method, path: route.pathname };
    return new Router()
      .add(
        { method: "GET", path: "/contagem-pessoas" },
        Controller.getCountOfUsers
      )
      .add({ method: "POST", path: "/pessoas" }, Controller.createUser)
      .exec(requestedRoute, req, userRepository);
  },
});
