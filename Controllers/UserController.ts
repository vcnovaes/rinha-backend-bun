import { MongoClient } from "mongodb";
import { countTotalUsers } from "../Service/UserService";

export function postUser(req: Request) {}

export async function getCountOfUsers(
  req: Request,
  client: MongoClient | null
) {
  if (client == null) return new Response("Database Error", { status: 500 });
  const totalCount: number = await countTotalUsers(client);
  return new Response(JSON.stringify(totalCount), { status: 200 });
}
