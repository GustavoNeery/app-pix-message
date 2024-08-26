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

class InterationController {
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
    const { ispb, interationId } = request.params;
    const header = request.headers["accept"];
    let isMultiPart = false;

    try {
      let pullNextUri = "";
      let transactions = null;

      if (header === "multipart/json") {
        isMultiPart = true;
      }

      if (!ispb || !interationId) {
        throw AppError.badRequest("ISPB or InterationId not provided.");
      }

      const interation =
        await this.interationService.getInteration(interationId);

      const interationWithIspb =
        await this.interationService.getInterationByIspb(ispb, interationId);

      if (!interationWithIspb) {
        return reply.code(204).send();
      }

      if (
        await this.interationService.hasExceededLimitAmountOfCount(
          interationWithIspb
        )
      ) {
        throw AppError.tooManyRequests(
          "Number of consumers cannot be exceeded."
        );
      }

      if (!interation) {
        throw AppError.notFound("Interation not found.");
      } else {
        pullNextUri = `/api/pix/${ispb}/stream/${interation.id}`;
      }

      transactions = await this.pixCollectorService.execute(
        ispb,
        reply,
        isMultiPart,
        interationWithIspb
      );

      if (!(await this.transactionService.verifyIspbExists(ispb))) {
        return reply.code(204).send();
      }

      if (!transactions) {
        return reply.code(204).send();
      }

      reply.raw.writeHead(200, {
        "Pull-Next": pullNextUri,
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({ error: "Internal server error" });
    }
  }
}

const interationController = new InterationController(
  pixCollectorServiceInstance,
  interationServiceInstance,
  transactionServiceInstance
);

export default interationController;
