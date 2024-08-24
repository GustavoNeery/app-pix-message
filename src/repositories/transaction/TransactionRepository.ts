import { prisma } from "../../lib/prisma";
import ICreateTransactionDTO from "../../dtos/ICreateTransactionDTO";
import { ITransactionRepository } from "../transaction/ITransactionRepository";
import { Transaction } from "../../entities/Transaction";

class TransactionRepository implements ITransactionRepository {
  async create(transaction: ICreateTransactionDTO): Promise<Transaction> {
    const transactionCreated = await prisma.transaction.create({
      data: {
        valor: transaction.valor,
        dataHoraPagamento: transaction.dataHoraPagamento,
        pagador: {
          connect: { id: transaction.pagador.id },
        },
        recebedor: {
          connect: { id: transaction.recebedor.id },
        },
      },
      include: {
        pagador: true,
        recebedor: true,
      },
    });

    return transactionCreated;
  }

  async findByIspb(ispb: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        recebedor: {
          ispb: ispb,
        },
      },
      include: {
        pagador: true,
        recebedor: true,
      },
    });

    return transactions;
  }

  async findFirstByIspb(ispb: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findFirst({
      where: {
        recebedor: {
          ispb: ispb,
        },
      },
      include: {
        pagador: true,
        recebedor: true,
      },
    });

    return transaction;
  }
}

const transactionRepositoryInstance = new TransactionRepository();

export { transactionRepositoryInstance, TransactionRepository };
