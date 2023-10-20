import { Module } from '@nestjs/common'
import { SyndicatesService } from './syndicates.service'
import { SyndicatesController } from './syndicates.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [SyndicatesService],
  controllers: [SyndicatesController]
})
export class SyndicatesModule {}
