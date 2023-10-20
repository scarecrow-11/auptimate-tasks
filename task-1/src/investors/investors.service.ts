import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateInvestorDto } from './dto/create-investor-dto'
import { ReadTopInvestorsDto } from './dto/read-top-investors.dto'

@Injectable()
export class InvestorsService {
    constructor (private readonly prismaService: PrismaService) {}

    async create (createInvestorDto: CreateInvestorDto) {
        const { name, syndicateId } = createInvestorDto

        const createInvestorInput = {
            name,
            syndicates: syndicateId ?
                {
                    connect: {
                        id: syndicateId
                    }
                } :
                undefined
        } as Prisma.InvestorCreateInput

        const createdInvestor = await this.prismaService.investor.create({
            data: createInvestorInput
        })

        return createdInvestor
    }

    async getTopInvestors (readTopInvestorsDto: ReadTopInvestorsDto) {
        const { maxRows } = readTopInvestorsDto

        // The inner ORDER BY clause is to truncate the number of rows
        // The outer ORDER BY is to ensure the sort order just in case
        // the JOIN operation breaks the order.
        const topInvestors = await this.prismaService.$queryRaw`
            SELECT "i".*, "t"."syndicateCount"::SMALLINT, "t"."amount"
            FROM (
                SELECT
                    "investorId",
                    COUNT(DISTINCT "syndicateId") FILTER (WHERE "syndicateId" IS NOT NULL) AS "syndicateCount",
                    ((SUM("amountCents") FILTER (WHERE "syndicateId" IS NOT NULL)) / 100.0) AS "amount"
                FROM "Transaction"
                GROUP BY "investorId"
                ORDER BY "syndicateCount" DESC
                LIMIT ${maxRows}
            ) AS "t"
            INNER JOIN "Investor" "i" ON "i"."id" = "t"."investorId"
            ORDER BY "t"."syndicateCount" DESC
        `

        return topInvestors
    }
}
