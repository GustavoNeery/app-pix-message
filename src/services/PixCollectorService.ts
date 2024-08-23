import { FastifyReply } from "fastify";
import { Readable, Writable } from "stream";
import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/transaction/TransactionRepository";
import { transactionRepositoryInstance } from "../repositories/transaction/TransactionRepository";

class PixCollectorService {
  private readonly maxWaitTime = 8000; // 8 segundos
  private readonly pollInterval = 500;
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async waitForMessages(ispb: string): Promise<Transaction[]> {
    const startTime = Date.now();
    let transactions: Transaction[] = [];

    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        transactions = await this.transactionRepository.findByIspb(ispb);
        if (
          transactions.length > 0 ||
          Date.now() - startTime > this.maxWaitTime
        ) {
          clearInterval(interval);
          resolve(transactions);
        }
      }, this.pollInterval);
    });
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

  async execute(ispb: string, reply: FastifyReply): Promise<Transaction[]> {
    const transactions = await this.waitForMessages(ispb);
    this.createReadableAndWritableStream(transactions, reply);
    return transactions;
  }
}

const pixCollectorServiceInstance = new PixCollectorService(
  transactionRepositoryInstance
);

export { PixCollectorService, pixCollectorServiceInstance };
