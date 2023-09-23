import { expect, jest, mock, test } from "bun:test";
import { Router } from "../RouterMap";

test("Router", () => {
  const router = new Router();
  const mockController = jest.fn(
    (req: Request) => new Response("Test", { status: 200 })
  );

  const testRoute = { method: "TEST", path: "/ŧest" };
  router.add(testRoute, mockController);

  expect(
    router.exec(
      { method: "NOT TEST", path: "NOTPATH" },
      new Request("https://test.test.notfound/")
    )
  ).toHaveProperty("status", 404);

  expect(
    router.exec(testRoute, new Request("https://test.test.ok/"))
  ).toHaveProperty("status", 200);
});
