import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionService, transactionServiceInstance } from "../services/TransactionService";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";

class TransactionController {
  private transactionService: TransactionService;
  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  execute(request: FastifyRequest<{Params: IRequestParamsDTO}>, reply: FastifyReply) {
    const { number } = request.params;
    this.transactionService.execute(number);
    return reply.status(201).send({message: 'Transaction generated!'});
  }
}

const transactionController = new TransactionController(transactionServiceInstance);
export default transactionController;