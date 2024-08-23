import { Decimal } from "@prisma/client/runtime/library";
import { Participant } from "./Participant";

class Transaction {
  id?: string;
  valor: Decimal;
  pagador: Participant;
  recebedor: Participant;
  campoLivre?: string;
  txId?: string;
  dataHoraPagamento: Date;

  constructor({ valor, pagador, recebedor, dataHoraPagamento }: Transaction) {
    this.valor = valor;
    this.pagador = pagador;
    this.recebedor = recebedor;
    this.dataHoraPagamento = dataHoraPagamento;
  }
}

export { Transaction };
