-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "ispb" TEXT NOT NULL,
    "agencia" TEXT NOT NULL,
    "contaTransacional" TEXT NOT NULL,
    "tipoConta" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);
