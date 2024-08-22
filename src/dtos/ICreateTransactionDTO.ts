import { Decimal } from "@prisma/client/runtime/library";
import { Participant } from "../entities/Participant";
interface ICreateTransactionDTO {
  valor: Decimal;
  dataHoraPagamento: Date;
  pagador: Participant;
  recebedor: Participant;
}

export default ICreateTransactionDTO;