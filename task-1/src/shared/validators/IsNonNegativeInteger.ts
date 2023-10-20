import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export const IsNonNegativeInteger = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'isNonNegativeInteger',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate: (value: any) => {
                    return typeof value === 'number' && Number.isInteger(value) && value >= 0
                },
                defaultMessage: (args: ValidationArguments) => {
                    return `${args.property} must be a non-negative integer`
                }
            }
        })
    }
}
