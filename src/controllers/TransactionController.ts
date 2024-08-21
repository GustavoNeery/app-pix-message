import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionService, transactionServiceInstance } from "../services/TransactionService";

class TransactionController {
  private transactionService: TransactionService;
  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  execute(request: FastifyRequest, reply: FastifyReply) {
    this.transactionService.execute();
    reply.status(201).send({message: 'Transaction generated!'});
  }
}

const transactionController = new TransactionController(transactionServiceInstance);
export default transactionController;