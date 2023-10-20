import { Controller, Post, Body } from '@nestjs/common'
import { SyndicatesService } from './syndicates.service'
import { CreateSyndicateDto } from './dto/create-syndicate-dto'

@Controller('syndicates')
export class SyndicatesController {
    constructor (private readonly syndicatesService: SyndicatesService) {}

    @Post()
    async create (@Body() createSyndicateDto: CreateSyndicateDto) {
        return this.syndicatesService.create(createSyndicateDto)
    }
}
