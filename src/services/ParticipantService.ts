import { faker } from "@faker-js/faker";
import ICreateParticipantDTO from "../dtos/ICreateParticipantDTO";
import { ParticipantRepository } from "../repositories/participant/ParticipantRepository";
import { participantRepositoryInstance } from "../repositories/participant/ParticipantRepository";
import { Participant } from "../entities/Participant";

class ParticipantService {
  private participantRepository: ParticipantRepository;

  constructor(participantRepository: ParticipantRepository) {
    this.participantRepository = participantRepository;
  }

  async generateParticipant(ispb?: string): Promise<ICreateParticipantDTO> {
    return {
      nome: faker.person.fullName(),
      cpfCnpj: faker.number
        .int({ min: 10000000000, max: 99999999999 })
        .toString(),
      ispb: ispb
        ? ispb
        : faker.number.int({ min: 1000000, max: 9999999 }).toString(),
      agencia: faker.number
        .int({ min: 0, max: 9999 })
        .toString()
        .padStart(4, "0"),
      contaTransacional: faker.number
        .int({ min: 1000000, max: 9999999 })
        .toString(),
      tipoConta: Array.from({ length: 4 }, () =>
        faker.string.alpha({ casing: "upper" })
      ).join(""),
    };
  }

  async execute(ispb?: string): Promise<Participant> {
    const participantGenerated = await this.generateParticipant(ispb);
    return await this.participantRepository.create(participantGenerated);
  }
}

const participantServiceInstance = new ParticipantService(
  participantRepositoryInstance
);

export { participantServiceInstance, ParticipantService };
