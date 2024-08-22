import { Decimal } from "@prisma/client/runtime/library";
import ICreateParticipantDTO from "./ICreateParticipantDTO";
interface ICreateTransactionDTO {
  valor: Decimal;
  dataHoraPagamento: Date;
  pagador: ICreateParticipantDTO;
  recebedor: ICreateParticipantDTO;
}

export default ICreateTransactionDTO;