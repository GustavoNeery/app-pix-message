import { Interation } from "../../entities/Interation";
import { prisma } from "../../lib/prisma";
import { IInterationRepository } from "./IInterationRepository";

class InterationRepository implements IInterationRepository {
  async findById(interationId: string): Promise<Interation | null> {
    return await prisma.interation.findUnique({
      where: {
        id: interationId,
      },
    });
  }

  async create(ispb: string): Promise<void> {
    await prisma.interation.create({
      data: {
        ispb: ispb,
      },
    });
  }
}

const interationRepositoryInstance = new InterationRepository();

export { InterationRepository, interationRepositoryInstance };
