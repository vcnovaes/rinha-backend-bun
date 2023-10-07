import { countTotalUsers, registerUser } from "../Service/UserService";
import { UserRepository } from "../Data/UserRepository";
import { IPessoa, validatePerson } from "../Contracts";
import ContractExpection from "../Contracts/ContractException";

export function postUser(req: Request) {}
export namespace Controller {
  export async function getCountOfUsers(
    req: Request,
    repository: UserRepository
  ) {
    const total = await countTotalUsers(repository);
    return new Response(JSON.stringify(total), { status: 200 });
  }
  export const createUser = async (
    req: Request,
    repository: UserRepository
  ) => {
    const body = await req.json();
    try {
      const person = body as IPessoa;
      console.info(person);
      await registerUser(validatePerson(person), repository);
      return new Response("Sucessful", { status: 200 });
    } catch (error: any) {
      console.error(error);
      if (error.message)
        return new Response("An Error occurred", { status: 500 });
    }
  };
}
