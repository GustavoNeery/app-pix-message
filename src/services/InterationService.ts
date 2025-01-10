import { Interation } from "../entities/Interation";
import {
  InterationRepository,
  interationRepositoryInstance,
} from "../repositories/interation/InterationRepository";

class InterationService {
  interationRepository: InterationRepository;
  constructor(interationRepository: InterationRepository) {
    this.interationRepository = interationRepository;
  }

  async getInteration(
    interationId: string | undefined
  ): Promise<Interation | null> {
    return await this.interationRepository.findById(interationId);
  }

  async incrementInterationCount(interation: Interation) {
    await this.interationRepository.updateInterationCount(interation);
  }

  async hasExceededLimitAmountOfCount(
    interationWithIspb: Interation
  ): Promise<boolean> {
    const QTD_MAX_CONSUMER = 6;
    if (interationWithIspb.callCount === QTD_MAX_CONSUMER) {
      return true;
    } else {
      return false;
    }
  }

  async getInterationByIspb(ispb: string, interationId: string) {
    const timeout = 8000;
    const interval = 500;
    const maxAttempts = timeout / interval;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const interation = await this.interationRepository.findByIspb(
        ispb,
        interationId
      );

      if (interation) {
        return interation;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return null;
  }

  async getInterationByIspbNoWait(ispb: string, interationId: string) {
    const interation = await this.interationRepository.findByIspb(
      ispb,
      interationId
    );

    if (interation) {
      return interation;
    }

    return null;
  }

  async execute(ispb: string): Promise<Interation> {
    const interation = await this.interationRepository.create(ispb);
    if(interation){
      this.incrementInterationCount(interation);
    }
    return interation;
  }
}

const interationServiceInstance = new InterationService(
  interationRepositoryInstance
);

export { InterationService, interationServiceInstance };
