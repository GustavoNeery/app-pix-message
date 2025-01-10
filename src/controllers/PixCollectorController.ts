import { FastifyReply, FastifyRequest } from "fastify";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import {
  PixCollectorService,
  pixCollectorServiceInstance,
} from "../services/PixCollectorService";
import { AppError } from "../errors/AppError";
import {
  InterationService,
  interationServiceInstance,
} from "../services/InterationService";
import {
  TransactionService,
  transactionServiceInstance,
} from "../services/TransactionService";

class PixCollectorController {
  private pixCollectorService: PixCollectorService;
  private interationService: InterationService;
  private transactionService: TransactionService;
  constructor(
    pixCollectorService: PixCollectorService,
    interationService: InterationService,
    transactionService: TransactionService
  ) {
    this.pixCollectorService = pixCollectorService;
    this.interationService = interationService;
    this.transactionService = transactionService;
  }

  async execute(
    request: FastifyRequest<{ Params: IRequestParamsDTO }>,
    reply: FastifyReply
  ) {
    const { ispb } = request.params;
    const header = request.headers["accept"];
    let isMultiPart = false;

    try {
      if (header === "multipart/json") {
        isMultiPart = true;
      }

      if (!ispb) {
        throw AppError.badRequest("ISPB not provided.");
      }

      if (!(await this.transactionService.verifyTransactionWithIspbExists(ispb))) {
        return reply.code(204).send();
      }
      const interation = await this.interationService.execute(ispb);
      const pullNextUri = `teste/${ispb}/${interation.id}`;

      reply.raw.writeHead(200, {
        "Pull-Next": pullNextUri,
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      });

      const transactions = await this.pixCollectorService.execute(
        ispb,
        reply,
        isMultiPart
      );

      if (!transactions) {
        return reply.code(204).send();
      }
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({ error: "Internal server error" });
    }
  }
}

const pixCollectorController = new PixCollectorController(
  pixCollectorServiceInstance,
  interationServiceInstance,
  transactionServiceInstance
);

export default pixCollectorController;
