import { Decimal } from "@prisma/client/runtime/library";
interface ICreateTransactionDTO {
  valor: Decimal;
  dataHoraPagamento: Date;
}

export default ICreateTransactionDTO;