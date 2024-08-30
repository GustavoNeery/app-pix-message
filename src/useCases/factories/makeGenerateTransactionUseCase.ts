import { ParticipantRepository } from "../../repositories/participant/ParticipantRepository";
import { PrismaTransactionRepository } from "../../repositories/prisma/prismaTransactionsRepository";
import { ParticipantService } from "../../services/ParticipantService";
import { GenerateTransactionUseCase } from "../generateTransaction";

export function makeGenerateTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const participantRepository = new ParticipantRepository();
  const participantService = new ParticipantService(participantRepository);
  const generateTransactionUseCase = new GenerateTransactionUseCase(
    transactionRepository,
    participantService
  );

  return generateTransactionUseCase;
}
