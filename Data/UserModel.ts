import mongoose, { Document, Model, Schema } from "mongoose";
import { IPessoa } from "../Contracts";

export interface IPessoaData extends IPessoa {
  id?: string;
}
