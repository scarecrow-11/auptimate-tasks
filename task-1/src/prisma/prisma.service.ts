import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

// By default, PrismaClient look for BigInt.toJSON() method to serialize BigInt columns
// from database. On other hand, JavaScript can't parse all BigInt numbers safely.
// Adding this method ensures that all BigInt values are converted to String for precision
(BigInt.prototype as any).toJSON = function () {
    return this.toString()
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor () {
        super()
    }

    async onModuleInit () {
        await this.$connect()
    }
}
