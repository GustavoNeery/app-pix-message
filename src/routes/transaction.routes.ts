import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import TransactionController from "../controllers/TransactionController";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import PixCollectorController from "../controllers/PixCollectorController";

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

  app.post(
    "/api/util/msgs/:ispb/:number",
    async (
      request: FastifyRequest<{ Params: IRequestParamsDTO }>,
      reply: FastifyReply
    ) => {
      await TransactionController.execute(request, reply);
    }
  );
}
