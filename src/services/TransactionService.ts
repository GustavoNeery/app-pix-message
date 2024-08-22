import { Decimal } from "@prisma/client/runtime/library";
import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import { ParticipantService } from "../services/ParticipantService";
import { participantServiceInstance } from "../services/ParticipantService";


class TransactionService {
  private participantService: ParticipantService;
  constructor(participantService: ParticipantService) {
    this.participantService = participantService;
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
      console.log(transactionGenerated);
    }
  }
}

const transactionServiceInstance = new TransactionService(participantServiceInstance);

export {transactionServiceInstance, TransactionService};