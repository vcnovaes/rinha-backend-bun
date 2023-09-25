import { Model } from "mongoose";
import { IPessoaData } from "./UserModel";
import { IPessoa } from "../Contracts";
import { MongoClient } from "mongodb";
import { DatabaseClient } from "../DB/DatabaseClient";

export class UserRepository {
  private client: DatabaseClient;
  constructor(client: DatabaseClient) {
    this.client = client;
  }

  async getTotalOfUsers(): Promise<number> {
    return await this.client.countTotalOfUsers();
  }

  async getUserById(userId: string): Promise<IPessoa> {
    const userData = await this.client.searchByUserId(userId);
    delete userData.id;
    return { ...userData };
  }

  async createUser(userData: IPessoa): Promise<void> {
    const user = await this.createUser(userData);
    return user;
  }

  async searchUsersByTerm(searchTerm: string) {
    const result = await this.client.searchUsersByTerm(searchTerm);

    return;
  }
}
