import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import TransactionController from "../controllers/TransactionController";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import PixCollectorController from "../controllers/PixCollectorController";
import interationController from "../controllers/InterationController";
import StopInterationController from "../controllers/StopInterationController";

export async function createTransaction(app: FastifyInstance) {
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

  app.post(
    "/api/util/msgs/:ispb/:number",
    async (
      request: FastifyRequest<{ Params: IRequestParamsDTO }>,
      reply: FastifyReply
    ) => {
      await TransactionController.execute(request, reply);
    }
  );

  app.delete(
    "/api/util/msgs/:ispb/:number",
    async (
      request: FastifyRequest<{ Params: IRequestParamsDTO }>,
      reply: FastifyReply
    ) => {
      await StopInterationController.execute(request, reply);
    }
  );
}
