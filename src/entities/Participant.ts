class Participant {
  id?: string;
  nome: string;
  cpfCnpj: string;
  ispb: string;
  agencia: string;
  contaTransacional: string;
  tipoConta: string;

  constructor({
    nome,
    cpfCnpj,
    ispb,
    agencia,
    contaTransacional,
    tipoConta,
  }: Participant) {
    this.nome = nome;
    this.cpfCnpj = cpfCnpj;
    this.ispb = ispb;
    this.agencia = agencia;
    this.contaTransacional = contaTransacional;
    this.tipoConta = tipoConta;
  }
}

export { Participant };
