-- CreateTable
CREATE TABLE "Transaction" (
    "endToEndId" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "campoLivre" TEXT NOT NULL DEFAULT '',
    "txId" TEXT NOT NULL,
    "data_hora_pagamento" TIMESTAMP(3) NOT NULL,
    "pagadorId" TEXT NOT NULL,
    "recebedorId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("endToEndId")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_pagadorId_fkey" FOREIGN KEY ("pagadorId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_recebedorId_fkey" FOREIGN KEY ("recebedorId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
