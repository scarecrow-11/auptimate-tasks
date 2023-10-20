import { IsOptional, IsString, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import { IsNonNegativeInteger } from '../../shared/validators/IsNonNegativeInteger'

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim?.())
    investorId: string

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim?.())
    syndicateId?: string

    @IsNonNegativeInteger()
    amountCents: number
}
