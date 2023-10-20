-- CreateTable
CREATE TABLE "Syndicate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Syndicate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "syndicateId" TEXT,
    "amountCents" BIGINT NOT NULL DEFAULT 0,
    "transactedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvestorToSyndicate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvestorToSyndicate_AB_unique" ON "_InvestorToSyndicate"("A", "B");

-- CreateIndex
CREATE INDEX "_InvestorToSyndicate_B_index" ON "_InvestorToSyndicate"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_syndicateId_fkey" FOREIGN KEY ("syndicateId") REFERENCES "Syndicate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestorToSyndicate" ADD CONSTRAINT "_InvestorToSyndicate_A_fkey" FOREIGN KEY ("A") REFERENCES "Investor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestorToSyndicate" ADD CONSTRAINT "_InvestorToSyndicate_B_fkey" FOREIGN KEY ("B") REFERENCES "Syndicate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
