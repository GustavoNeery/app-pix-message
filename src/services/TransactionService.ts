import { Decimal } from "@prisma/client/runtime/library";
import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";

class TransactionService {
  constructor() {

  }

  async generateTransaction(): Promise<ICreateTransactionDTO> {
    return {
      valor: new Decimal(parseFloat((Math.random() * (1000 - 0) + 0).toFixed(2))),
      dataHoraPagamento: new Date() 
    }
  }

  async execute(number: string) {
    for(let i = 0; i < parseInt(number); i++) {
      const transactionGenerated = await this.generateTransaction();
    }
    console.log('Transactions generated');
  }
}

const transactionServiceInstance = new TransactionService();

export {transactionServiceInstance, TransactionService};