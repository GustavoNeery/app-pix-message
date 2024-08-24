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

  async waitForMessages(
    ispb: string,
    isMultiPart: boolean
  ): Promise<Transaction[] | Transaction | null> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        const transactions = await this.verifyFindManyOrFindFirst(
          ispb,
          isMultiPart
        );
        if (transactions || Date.now() - startTime > this.maxWaitTime) {
          clearInterval(interval);
          resolve(transactions);
        }
      }, this.pollInterval);
    });
  }

  async verifyFindManyOrFindFirst(ispb: string, isMultiPart: boolean) {
    if (isMultiPart) {
      return await this.transactionRepository.findByIspb(ispb);
    } else {
      return await this.transactionRepository.findFirstByIspb(ispb);
    }
  }

  createReadableAndWritableStream(
    transactions: Transaction[] | Transaction | null,
    reply: FastifyReply
  ) {
    const readableStream = new Readable({
      objectMode: true,
      read() {
        if (Array.isArray(transactions)) {
          if (transactions.length > 0) {
            this.push(JSON.stringify(transactions.shift()));
          } else {
            this.push(null);
          }
        } else {
          this.push(JSON.stringify(transactions));
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

  async execute(
    ispb: string,
    reply: FastifyReply,
    isMultiPart: boolean
  ): Promise<Transaction[] | Transaction | null> {
    const transactions = await this.waitForMessages(ispb, isMultiPart);
    this.createReadableAndWritableStream(transactions, reply);
    return transactions;
  }
}

const pixCollectorServiceInstance = new PixCollectorService(
  transactionRepositoryInstance
);

export { PixCollectorService, pixCollectorServiceInstance };
