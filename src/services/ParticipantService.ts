import { faker } from "@faker-js/faker";
import ICreateParticipantDTO from "../dtos/ICreateParticipantDTO";

class ParticipantService {
  constructor() {

  }

  async generateParticipant(ispb?: string): Promise<ICreateParticipantDTO> {
    return {
      nome: faker.person.fullName(),
      cpfCnpj: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      ispb: ispb ? ispb : faker.number.int({ min: 1000000, max: 9999999 }).toString(),
      agencia: faker.number.int({ min: 0, max: 9999 }).toString().padStart(4, '0'),
      contaTransacional: faker.number.int({ min: 1000000, max: 9999999 }).toString(),
      tipoConta: Array.from({ length: 4 }, () => faker.string.alpha({ casing: 'upper' })).join('')
    }
  }

  async execute(ispb?: string) {
    const participantGenerated = await this.generateParticipant(ispb);
    return participantGenerated;
  }
}

const participantServiceInstance = new ParticipantService();

export { participantServiceInstance, ParticipantService };