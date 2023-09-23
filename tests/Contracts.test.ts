import { beforeEach, describe, expect, test } from "bun:test";
import { Pessoa, validatePerson } from "../Contracts/UserContract";
import ContractExpection from "../Contracts/ContractException";

describe("UserContract validation", () => {
  let user: Pessoa = {
    apelido: "",
    nome: "",
    nascimento: "",
    stack: [],
  };
  beforeEach(() => {
    user.apelido = "";
    user.nome = "";
    user.nascimento = "";
    user.stack = [];
  });
  test("Maximum apelido size", () => {
    user.apelido = "t".repeat(Number(Bun.env.MAX_APELIDO_SIZE) + 1);
    expect(() => validatePerson(user)).toThrow(
      new ContractExpection("Apelido")
    );
  });
  test("Maximum nome size", () => {
    user.nome = "t".repeat(Number(Bun.env.MAX_NOME_SIZE) + 1);
    expect(() => validatePerson(user)).toThrow(new ContractExpection("Nome"));
  });
  test("Maximum stack item size", () => {
    user.stack = ["t".repeat(Number(Bun.env.MAX_STACK_ITEM_SIZE) + 1)];
    expect(() => validatePerson(user)).toThrow(new ContractExpection("Stack"));
  });

  test("Date invalid", () => {
    user.nascimento = "2023-30-30";
    expect(() => validatePerson(user)).toThrow(
      new ContractExpection("Nascimento")
    );
  });

  test("Date invalid feb", () => {
    user.nascimento = "2023-02-30";
    expect(() => validatePerson(user)).toThrow(
      new ContractExpection("Nascimento")
    );
  });

  test("Date bad formatted", () => {
    user.nascimento = "NOTDATE";
    expect(() => validatePerson(user)).toThrow(
      new ContractExpection("Nascimento")
    );
  });
});
