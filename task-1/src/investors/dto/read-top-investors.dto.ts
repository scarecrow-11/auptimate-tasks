import { IsOptional, IsInt, IsPositive } from 'class-validator'
import { Transform } from 'class-transformer'

const DEFAULT_MAX_ROWS = 5

export class ReadTopInvestorsDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Transform(({ value }) => isNaN(Number(value)) ? DEFAULT_MAX_ROWS : Number(value))
    maxRows?: number = DEFAULT_MAX_ROWS
}
