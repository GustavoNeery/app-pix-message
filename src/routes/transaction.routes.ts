import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import TransactionController from "../controllers/TransactionController";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";


export async function createTransaction(app: FastifyInstance) {
  app.post('/api/util/msgs/:ispb/:number', async (request: FastifyRequest<{ Params: IRequestParamsDTO }>, reply: FastifyReply) => {
    await TransactionController.execute(request, reply);
  })

}