import { IPessoa } from "../Contracts";
import { UserRepository } from "../Data/UserRepository";

export async function registerUser(user: IPessoa, repository: UserRepository) {
  try {
    await repository.createUser(user);
  } catch (error) {
    console.error(error);
  }
}

export async function retrieveUser(
  searchTerm: string,
  repository: UserRepository
) {
  try {
    return await repository.searchUsersByTerm(searchTerm);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function countTotalUsers(repository: UserRepository) {
  return await repository.getTotalOfUsers();
}
