import { beforeAll, describe, expect, jest, test } from "bun:test";
import { Router } from "../Router/RouterMap";
import { MongoClient } from "mongodb";

describe("Router", () => {
  let router: Router;
  const mockController = jest.fn(
    (req: Request) => new Response("Test", { status: 200 })
  );

  beforeAll(() => (router = new Router()));
  const testRoute = { method: "TEST", path: "/ŧest" };
  test("Not existing route", () => {
    expect(
      router.exec(
        { method: "NOT TEST", path: "NOTPATH" },
        new Request("https://test.test.notfound/"),
        null
      )
    ).toHaveProperty("status", 404);
  });

  test("Health check route", () => {
    router.add(testRoute, mockController);
    expect(
      router.exec(testRoute, new Request("https://test.test.ok/"), null)
    ).toHaveProperty("status", 200);
  });
});
