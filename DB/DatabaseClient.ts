import { IPessoa } from "../Contracts";
import { IPessoaData } from "../Data/UserModel";

export abstract class DatabaseClient {
  searchByUserId(userId: string): Promise<IPessoaData> {
    throw Error("Not implemented");
  }
  createUser(user: IPessoa): Promise<void> {
    throw Error("Not implemented");
  }
  searchUsersByTerm(searchTerm: string): Promise<IPessoaData> {
    throw Error("Not implemented");
  }
  countTotalOfUsers(): Promise<number> {
    throw Error("Not implemented");
  }
  init() {}
}
