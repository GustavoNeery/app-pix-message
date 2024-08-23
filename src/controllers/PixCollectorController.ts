import { FastifyReply, FastifyRequest } from "fastify";
// import { Readable } from "stream";
import { prisma } from "../lib/prisma";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import { Readable, Writable } from "stream";

class PixCollectorController {
  constructor() {}

  async execute(
    request: FastifyRequest<{ Params: IRequestParamsDTO }>,
    reply: FastifyReply
  ) {
    // const { ispb } = request.params;

    const transactions = await prisma.transaction.findMany({
      include: {
        pagador: true,
        recebedor: true,
      },
    });

    const readableStream = new Readable({
      objectMode: true,
      read() {
        if (transactions.length > 0) {
          this.push(JSON.stringify(transactions.shift()));
        } else {
          this.push(null);
        }
      },
    });

    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        reply.raw.write(chunk, encoding, callback);
      },
      final(callback) {
        reply.raw.end();
        callback();
      },
    });

    reply.raw.writeHead(200, {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    });

    readableStream.pipe(writableStream);

    writableStream.on("error", (err) => {
      reply.send(err);
    });

    readableStream.on("error", (err) => {
      reply.send(err);
    });
  }
}

const pixCollectorController = new PixCollectorController();

export default pixCollectorController;
