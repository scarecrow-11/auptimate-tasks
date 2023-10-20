import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { SyndicatesModule } from './syndicates/syndicates.module'
import { InvestorsModule } from './investors/investors.module'
import { TransactionsModule } from './transactions/transactions.module'

@Module({
  imports: [PrismaModule, SyndicatesModule, InvestorsModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
