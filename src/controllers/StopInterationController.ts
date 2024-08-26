import { FastifyReply, FastifyRequest } from "fastify";
import {
  StopInterationService,
  stopInterationServiceInstance,
} from "../services/StopInterationService";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import { AppError } from "../errors/AppError";

class StopInterationController {
  private stopInterationService: StopInterationService;
  constructor(stopInterationService: StopInterationService) {
    this.stopInterationService = stopInterationService;
  }

  async execute(
    request: FastifyRequest<{ Params: IRequestParamsDTO }>,
    reply: FastifyReply
  ) {
    const { ispb, interationId } = request.params;
    try {
      if (!interationId || !ispb) {
        throw AppError.badRequest("InterationId or Ispb not provied.");
      }
      const interation = await this.stopInterationService.execute(
        ispb,
        interationId
      );

      if (!interation) {
        throw AppError.notFound("Interation not found.");
      }
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({ error: "Internal server error" });
    }
  }
}

const stopInterationController = new StopInterationController(
  stopInterationServiceInstance
);

export default stopInterationController;
