import { Controller, Post, Get, Body, Query } from '@nestjs/common'
import { InvestorsService } from './investors.service'
import { CreateInvestorDto } from './dto/create-investor-dto'
import { ReadTopInvestorsDto } from './dto/read-top-investors.dto'

@Controller('investors')
export class InvestorsController {
    constructor (private readonly investorsService: InvestorsService) {}

    @Post()
    async create (@Body() createInvestorDto: CreateInvestorDto) {
        return this.investorsService.create(createInvestorDto)
    }

    @Get('top-investors')
    async getTopInvestors (@Query() readTopInvestorsDto: ReadTopInvestorsDto) {
        return this.investorsService.getTopInvestors(readTopInvestorsDto)
    }
}
