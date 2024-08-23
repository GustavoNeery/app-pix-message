import { Readable, Writable } from "stream";
import { TransactionRepository } from "../repositories/transaction/TransactionRepository";
import { transactionRepositoryInstance } from "../repositories/transaction/TransactionRepository";
import { Transaction } from "../entities/Transaction";
import { FastifyReply } from "fastify";

class PixCollectorService {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  createReadableAndWritableStream(
    transactions: Transaction[],
    reply: FastifyReply
  ) {
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

    readableStream.pipe(writableStream);

    writableStream.on("error", (err) => {
      reply.send(err);
    });

    readableStream.on("error", (err) => {
      reply.send(err);
    });
  }

  async execute(ispb: string, reply: FastifyReply) {
    const transactions = await this.transactionRepository.findByIspb(ispb);
    this.createReadableAndWritableStream(transactions, reply);
  }
}

const pixCollectorServiceInstance = new PixCollectorService(
  transactionRepositoryInstance
);

export { PixCollectorService, pixCollectorServiceInstance };
