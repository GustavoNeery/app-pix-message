import { AppError } from "../errors/AppError";
import { FastifyReply, FastifyRequest } from "fastify";
import IRequestParamsDTO from "../dtos/IRequestParamsDTO";
import { makeGenerateTransactionUseCase } from "../useCases/factories/makeGenerateTransactionUseCase";

export async function generate(
  request: FastifyRequest<{ Params: IRequestParamsDTO }>,
  reply: FastifyReply
) {
  const { number, ispb } = request.params;
  try {
    if (!ispb || !number) {
      throw AppError.badRequest("Number or ISPB not provided.");
    }

    const parsedNumber = Number(number);

    if (Number.isNaN(parsedNumber) || parsedNumber === 0) {
      throw AppError.badRequest("The number parameter must be a valid number.");
    }

    const generateTransactionUseCase = makeGenerateTransactionUseCase();

    await generateTransactionUseCase.execute(number, ispb);
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ error: error.message });
    }

    throw error;
  }

  return reply.status(201).send({ message: "Transactions generated!" });
}
