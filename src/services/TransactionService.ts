import { Decimal } from "@prisma/client/runtime/library";
import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import { ParticipantService } from "../services/ParticipantService";
import { participantServiceInstance } from "../services/ParticipantService";
import { TransactionRepository } from "../repositories/transaction/TransactionRepository";
import { transactionRepositoryInstance } from "../repositories/transaction/TransactionRepository";

class TransactionService {
  private participantService: ParticipantService;
  private transactionRepository: TransactionRepository;

  constructor(participantService: ParticipantService, transactionRepository: TransactionRepository) {
    this.participantService = participantService;
    this.transactionRepository = transactionRepository;
  }

  async generateTransaction(ispb: string): Promise<ICreateTransactionDTO> {
    return {
      valor: new Decimal(parseFloat((Math.random() * (1000 - 0) + 0).toFixed(2))),
      dataHoraPagamento: new Date(),
      pagador: await this.participantService.execute(),
      recebedor: await this.participantService.execute(ispb)
    }
  }

  async execute(number: string, ispb: string) {
    for(let i = 0; i < parseInt(number); i++) {
      const transactionGenerated = await this.generateTransaction(ispb);
      await this.transactionRepository.create(transactionGenerated);
    }
  }
}

const transactionServiceInstance = new TransactionService(participantServiceInstance, transactionRepositoryInstance);

export {transactionServiceInstance, TransactionService};