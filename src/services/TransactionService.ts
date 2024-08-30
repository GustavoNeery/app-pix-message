import { Decimal } from "@prisma/client/runtime/library";
import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import { ParticipantService } from "../services/ParticipantService";
import { participantServiceInstance } from "../services/ParticipantService";
import { PrismaTransactionRepository } from "../repositories/prisma/prismaTransactionsRepository";
import { Transaction } from "../entities/Transaction";

class TransactionService {
  private participantService: ParticipantService;
  private transactionRepository: PrismaTransactionRepository;

  constructor(
    participantService: ParticipantService,
    transactionRepository: PrismaTransactionRepository
  ) {
    this.participantService = participantService;
    this.transactionRepository = transactionRepository;
  }

  async generateTransaction(ispb: string): Promise<ICreateTransactionDTO> {
    return {
      valor: new Decimal(
        parseFloat((Math.random() * (1000 - 0) + 0).toFixed(2))
      ),
      dataHoraPagamento: new Date(),
      pagador: await this.participantService.execute(),
      recebedor: await this.participantService.execute(ispb),
    };
  }

  async verifyIspbExists(ispb: string): Promise<Transaction | null> {
    const timeout = 8000;
    const interval = 500;
    const maxAttempts = timeout / interval;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const transaction =
        await this.transactionRepository.findFirstByIspb(ispb);

      if (transaction) {
        return transaction;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return null;
  }

  async execute(number: string, ispb: string) {
    for (let i = 0; i < parseInt(number); i++) {
      const transactionGenerated = await this.generateTransaction(ispb);
      await this.transactionRepository.create(transactionGenerated);
    }
  }
}

const transactionServiceInstance = new TransactionService(
  participantServiceInstance,
  transactionRepositoryInstance
);

export { transactionServiceInstance, TransactionService };
