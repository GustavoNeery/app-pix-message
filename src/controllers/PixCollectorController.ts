import { FastifyReply, FastifyRequest } from "fastify";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import {
  PixCollectorService,
  pixCollectorServiceInstance,
} from "../services/PixCollectorService";
import { AppError } from "../errors/AppError";

class PixCollectorController {
  private pixCollectorService: PixCollectorService;
  constructor(pixCollectorService: PixCollectorService) {
    this.pixCollectorService = pixCollectorService;
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

      const transactions = await this.pixCollectorService.execute(
        ispb,
        reply,
        isMultiPart
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
  pixCollectorServiceInstance
);

export default pixCollectorController;
