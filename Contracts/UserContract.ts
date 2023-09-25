import { Document } from "mongoose";
import ContractExpection from "./ContractException";

export interface IPessoa {
  apelido: string;
  nome: string;
  nascimento: string;
  stack?: string[];
}
function checkMaximumFieldSize(
  field: string,
  value: string,
  maximumSize: number
) {
  if (value.length > maximumSize) {
    throw new ContractExpection(field);
  }
}
function checkDate(dateStr: string) {
  const dataException = new ContractExpection("Nascimento");
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getMonth() != month ||
    date.getFullYear() != year ||
    date.getDay() != day
  ) {
    throw dataException;
  }
  if (date.getMonth() == 2 && date.getDate() > 28) throw dataException;
}
export function validatePerson(pessoa: IPessoa) {
  checkMaximumFieldSize(
    "Apelido",
    pessoa.apelido,
    Number(Bun.env.MAX_APELIDO_SIZE)
  );
  checkMaximumFieldSize("Nome", pessoa.nome, Number(Bun.env.MAX_NOME_SIZE));
  pessoa.stack?.map((stack) =>
    checkMaximumFieldSize("Stack", stack, Number(Bun.env.MAX_STACK_ITEM_SIZE))
  );
  checkDate(pessoa.nascimento);
}
