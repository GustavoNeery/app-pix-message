import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import PixCollectorController from "../controllers/PixCollectorController";
import interationController from "../controllers/InterationController";
import StopInterationController from "../controllers/StopInterationController";
import { generate } from "../controllers/generate";

export async function transactionRoutes(app: FastifyInstance) {
  app.get(
    "/api/pix/:ispb/stream/start",
    async (
      request: FastifyRequest<{ Params: IRequestParamsDTO }>,
      reply: FastifyReply
    ) => {
      await PixCollectorController.execute(request, reply);
    }
  );

  app.get(
    "/api/pix/:ispb/stream/:interationId",
    async (
      request: FastifyRequest<{ Params: IRequestParamsDTO }>,
      reply: FastifyReply
    ) => {
      await interationController.execute(request, reply);
    }
  );

  app.post("/api/util/msgs/:ispb/:number", generate);

  app.delete(
    "/api/pix/:ispb/stream/:interationId",
    async (
      request: FastifyRequest<{ Params: IRequestParamsDTO }>,
      reply: FastifyReply
    ) => {
      await StopInterationController.execute(request, reply);
    }
  );
}
