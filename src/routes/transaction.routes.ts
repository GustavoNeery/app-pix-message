import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import TransactionController from "../controllers/TransactionController";


export async function createTransaction(app: FastifyInstance) {
  app.post('/api/util/msgs/:ispb/:number', async (request: FastifyRequest, reply: FastifyReply) => {
    await TransactionController.execute(request, reply);
  })

}