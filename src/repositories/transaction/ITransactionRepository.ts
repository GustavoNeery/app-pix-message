import ICreateTransactionDTO from "../../dtos/ICreateTransactionDTO";
import { Transaction } from "../../entities/Transaction";

export interface ITransactionRepository {
  create(transaction: ICreateTransactionDTO): Promise<Transaction>;
  findAllTransactionsByIspb(ispb: string): Promise<Transaction[]>;
  findFirstTransactionByIspb(ispb: string): Promise<Transaction | null>;
}
