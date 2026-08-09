-- CreateTable
CREATE TABLE "public"."Presente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "reservado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reserva" (
    "id" SERIAL NOT NULL,
    "nomePessoa" TEXT NOT NULL,
    "telefone" TEXT,
    "presenteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_presenteId_key" ON "public"."Reserva"("presenteId");

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_presenteId_fkey" FOREIGN KEY ("presenteId") REFERENCES "public"."Presente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
