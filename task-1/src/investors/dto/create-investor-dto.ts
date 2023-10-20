import { IsOptional, IsString, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateInvestorDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim?.())
    name: string

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim?.())
    syndicateId?: string
}
