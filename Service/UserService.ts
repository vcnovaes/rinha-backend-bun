import { MongoClient } from "mongodb";
import { IPessoa } from "../Contracts";
import { UserRepository } from "../Data/UserRepository";

export function registerUser(user: IPessoa, client: MongoClient) {}

export function retrieveUser(
  user: IPessoa,
  searchTerm: string,
  client: MongoClient
) {}

export async function countTotalUsers(client: MongoClient) {
  const rep = new UserRepository(client);

  await rep.connect();
  const allUsers = await rep.getAllUsers();
  await rep.disconnect();
  return allUsers.length;
}

export function retriveUserById(id: string, client: MongoClient) {}
