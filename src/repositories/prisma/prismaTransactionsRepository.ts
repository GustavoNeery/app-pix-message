import { prisma } from "../../lib/prisma";
import { ITransactionRepository } from "../ITransactionRepository";
import ICreateTransactionDTO from "../../dtos/ICreateTransactionDTO";

export class PrismaTransactionRepository implements ITransactionRepository {
  async create(transaction: ICreateTransactionDTO) {
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

  async findByIspb(ispb: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        recebedor: {
          ispb: ispb,
        },
      },
      take: 10,
      include: {
        pagador: true,
        recebedor: true,
      },
    });

    return transactions;
  }

  async findFirstByIspb(ispb: string) {
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
