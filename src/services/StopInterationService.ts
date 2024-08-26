import {
  InterationRepository,
  interationRepositoryInstance,
} from "../repositories/interation/InterationRepository";

class StopInterationService {
  private interationRepository: InterationRepository;
  constructor(interationRepository: InterationRepository) {
    this.interationRepository = interationRepository;
  }

  async execute(ispb: string, interationId: string) {}
}

const stopInterationServiceInstance = new StopInterationService(
  interationRepositoryInstance
);

export { StopInterationService, stopInterationServiceInstance };
