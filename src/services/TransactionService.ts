import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";

class TransactionService {
  constructor() {

  }

  generateTransaction() {
    
  }

  execute() {
    this.generateTransaction();
    console.log('Transaction generate');
  }
}

const transactionServiceInstance = new TransactionService();

export {transactionServiceInstance, TransactionService};