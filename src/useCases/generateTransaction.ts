import { Decimal } from "@prisma/client/runtime/library";
import { PrismaTransactionRepository } from "../repositories/prisma/prismaTransactionsRepository";
import { ParticipantService } from "../services/ParticipantService";

export class GenerateTransactionUseCase {
  constructor(
    private transactionRepository: PrismaTransactionRepository,
    private participantService: ParticipantService
  ) {}

  async execute(number: string, ispb: string) {
    const transactions = [];
    for (let i = 0; i < parseInt(number); i++) {
      transactions[i] = await this.transactionRepository.create({
        valor: new Decimal(
          parseFloat((Math.random() * (1000 - 0) + 0).toFixed(2))
        ),
        dataHoraPagamento: new Date(),
        pagador: await this.participantService.execute(),
        recebedor: await this.participantService.execute(ispb),
      });
    }

    return transactions;
  }
}
