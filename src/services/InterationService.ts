import {
  InterationRepository,
  interationRepositoryInstance,
} from "../repositories/interation/InterationRepository";

class InterationService {
  interationRepository: InterationRepository;
  constructor(interationRepository: InterationRepository) {
    this.interationRepository = interationRepository;
  }

  async verifyInterationExists(interationId: string): Promise<boolean> {
    const interation = await this.interationRepository.findById(interationId);
    if (interation) {
      return true;
    } else {
      return false;
    }
  }

  async execute(ispb: string) {
    await this.interationRepository.create(ispb);
  }
}

const interationServiceInstance = new InterationService(
  interationRepositoryInstance
);

export { InterationService, interationServiceInstance };
