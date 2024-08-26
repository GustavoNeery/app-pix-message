import { Interation } from "../../entities/Interation";
import { prisma } from "../../lib/prisma";
import { IInterationRepository } from "./IInterationRepository";

class InterationRepository implements IInterationRepository {
  async findById(interationId: string | undefined): Promise<Interation | null> {
    return await prisma.interation.findUnique({
      where: {
        id: interationId,
      },
    });
  }

  async findByIspb(
    ispb: string,
    interationId: string
  ): Promise<Interation | null> {
    const interation = await prisma.interation.findFirst({
      where: {
        ispb,
        id: interationId,
      },
    });

    return interation;
  }

  async updateCount(interation: Interation): Promise<void> {
    await prisma.interation.update({
      where: { id: interation.id },
      data: {
        callCount: {
          increment: 1,
        },
      },
    });
  }

  async create(ispb: string): Promise<Interation> {
    return await prisma.interation.create({
      data: {
        ispb: ispb,
      },
    });
  }
}

const interationRepositoryInstance = new InterationRepository();

export { InterationRepository, interationRepositoryInstance };
