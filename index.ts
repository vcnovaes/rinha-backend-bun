import { getCountOfUsers } from "./Controllers/UserController";
import { Route, Router } from "./Router/RouterMap";
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(Bun.env.DB_URI ?? "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const route = new URL(req.url);
    const requestedRoute: Route = { method: req.method, path: route.pathname };
    return new Router()
      .add({ method: "GET", path: "/contagem-pessoas" }, getCountOfUsers)
      .exec(requestedRoute, req, client);
  },
});

console.info("Server running on port ", server.port);
