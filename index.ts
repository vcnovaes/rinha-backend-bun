import { Route, Router } from "./Router/RouterMap";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const route = new URL(req.url);
    const requestedRoute: Route = { method: req.method, path: route.pathname };
    return new Router()
      .add(
        { method: "GET", path: "/" },
        (req: Request) => new Response("OK", { status: 200 })
      )
      .exec(requestedRoute, req);
  },
});

console.info("Server running on port ", server.port);
