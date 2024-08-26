import { Interation } from "../entities/Interation";
import {
  InterationRepository,
  interationRepositoryInstance,
} from "../repositories/interation/InterationRepository";
import {
  InterationService,
  interationServiceInstance,
} from "./InterationService";

class StopInterationService {
  private interationRepository: InterationRepository;
  private interationService: InterationService;
  constructor(
    interationRepository: InterationRepository,
    interationService: InterationService
  ) {
    this.interationRepository = interationRepository;
    this.interationService = interationService;
  }

  async execute(
    ispb: string,
    interationId: string
  ): Promise<Interation | null> {
    const interation = await this.interationService.getInterationByIspbNoWait(
      ispb,
      interationId
    );
    if (interation) {
      this.interationRepository.delete(interation);
    }
    return interation;
  }
}

const stopInterationServiceInstance = new StopInterationService(
  interationRepositoryInstance,
  interationServiceInstance
);

export { StopInterationService, stopInterationServiceInstance };
