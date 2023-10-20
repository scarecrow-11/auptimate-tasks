import { IsString, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateSyndicateDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim?.())
    name: string
}
