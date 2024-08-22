import ICreateParticipantDTO from "../../dtos/ICreateParticipantDTO";
import { Participant } from "../../entities/Participant";

export interface IParticipantRespository {
  create(participant: ICreateParticipantDTO): Promise<Participant>
}