import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'

@Injectable()
export class TransactionsService {
    constructor (private readonly prismaService: PrismaService) {}

    async create (createTransactionDto: CreateTransactionDto) {
        const { investorId, syndicateId, amountCents } = createTransactionDto

        const investor = await this.prismaService.investor.findUnique({
            where: {
                id: investorId
            },
            select: {
                id: true
            }
        })
        if (!investor) {
            throw new HttpException(`Investor with ID '${investorId}' does not exist`, HttpStatus.BAD_REQUEST)
        }

        const createTransactionInput = {
            investor: {
                connect: {
                    id: investorId
                }
            },
            syndicate: syndicateId ?
                {
                    connect: {
                        id: syndicateId
                    }
                } :
                undefined,
            amountCents,
            transactedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        } as unknown as Prisma.TransactionCreateInput

        const createdTransaction = await this.prismaService.transaction.create({
            data: createTransactionInput
        })

        return createdTransaction
    }
}
