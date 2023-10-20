import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSyndicateDto } from './dto/create-syndicate-dto'

@Injectable()
export class SyndicatesService {
    constructor (private readonly prismaService: PrismaService) {}

    async create (createSyndicateDto: CreateSyndicateDto) {
        const { name } = createSyndicateDto

        const syndicateCreateInput = {
            name,
            createdAt: new Date(),
            updatedAt: new Date()
        } as Prisma.SyndicateCreateInput

        const createdSyndicate = await this.prismaService.syndicate.create({
            data: syndicateCreateInput
        })

        return createdSyndicate
    }
}
