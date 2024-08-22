import { prisma } from "../../lib/prisma";
import ICreateParticipantDTO from "../../dtos/ICreateParticipantDTO";
import { IParticipantRespository } from "../participant/IParticipantRepository";
import { Participant } from "../../entities/Participant";

export class ParticipantRepository implements IParticipantRespository{
  
  async create(participant: ICreateParticipantDTO): Promise<Participant>{
    const participantCreated = await prisma.participant.create({
      data: {
        nome: participant.nome,
        cpfCnpj: participant.cpfCnpj,
        ispb: participant.ispb,
        agencia: participant.agencia,
        contaTransacional: participant.contaTransacional,
        tipoConta: participant.tipoConta
      }
    });

    return participantCreated;
  }
}

const participantRepositoryInstance = new ParticipantRepository();

export default participantRepositoryInstance; 