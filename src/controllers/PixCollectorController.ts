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

class PixCollectorController {
  private pixCollectorService: PixCollectorService;
  private interationService: InterationService;
  constructor(
    pixCollectorService: PixCollectorService,
    interationService: InterationService
  ) {
    this.pixCollectorService = pixCollectorService;
    this.interationService = interationService;
  }

  async execute(
    request: FastifyRequest<{ Params: IRequestParamsDTO }>,
    reply: FastifyReply
  ) {
    const { ispb, interationId } = request.params;
    const header = request.headers["accept"];
    let isMultiPart = false;

    try {
      if (header === "multipart/json") {
        isMultiPart = true;
      }

      if (!ispb) {
        throw AppError.badRequest("ISPB not provided.");
      }

      if (interationId) {
        const interactionExists =
          await this.interationService.verifyInterationExists(interationId);

        if (!interactionExists) {
          throw AppError.notFound("interation not found.");
        }
      }

      const transactions = await this.pixCollectorService.execute(
        ispb,
        reply,
        isMultiPart,
        interationId
      );

      if (!transactions) {
        return reply.code(204).send();
      }

      reply.raw.writeHead(200, {
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

const pixCollectorController = new PixCollectorController(
  pixCollectorServiceInstance,
  interationServiceInstance
);

export default pixCollectorController;
