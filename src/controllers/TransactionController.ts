import { AppError } from "../errors/AppError";
import { FastifyReply, FastifyRequest } from "fastify";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import {
  TransactionService,
  transactionServiceInstance,
} from "../services/TransactionService";

class TransactionController {
  private transactionService: TransactionService;
  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  execute(
    request: FastifyRequest<{ Params: IRequestParamsDTO }>,
    reply: FastifyReply
  ) {
    const { number, ispb } = request.params;
    try {
      if (!ispb || !number) {
        throw AppError.badRequest("Number or ISPB not provided.");
      }

      const parsedNumber = Number(number);

      if (Number.isNaN(parsedNumber) || parsedNumber === 0) {
        throw AppError.badRequest(
          "The number parameter must be a valid number."
        );
      }

      this.transactionService.execute(number, ispb);
      return reply.status(201).send({ message: "Transactions generated!" });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({ error: "Internal server error" });
    }
  }
}

const transactionController = new TransactionController(
  transactionServiceInstance
);

export default transactionController;
