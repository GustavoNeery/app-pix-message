import { FastifyReply, FastifyRequest } from "fastify";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import {
  PixCollectorService,
  pixCollectorServiceInstance,
} from "../services/PixCollectorService";

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

    const transactions = await this.pixCollectorService.execute(ispb, reply);

    if (transactions.length === 0) {
      return reply.code(204).send();
    }

    reply.raw.writeHead(200, {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    });
  }
}

const pixCollectorController = new PixCollectorController(
  pixCollectorServiceInstance
);

export default pixCollectorController;
