// const Concur = require('../../src/concur');

// // Validate
const concur = new Concur();

const schema = concur.schema({
    apple: concur.number().iterable().options([10, 11]),
    banana: concur.number().decimals(2).multipleOf(4).iterable().required(),
    digestives: concur.number().required()
})

const validate = schema.validate({
    apple: [10, 10],
    banana: [4, 7, 12, 23],
    chocolate: 'hi'
})

console.log(validate)


// // Validate a number
const concurNumber = new Concur();

const schemaNumber = concurNumber.schema(concurNumber.number().min(5).iterable().required());

const validateNumber = schemaNumber.validate();

console.log(validateNumber)


// // Validate an object
const concurObject = new Concur();

const schemaObject = concurObject.schema({
    fruits: concurObject.object({
        apple: concurObject.number().max(99).iterable().required(),
        banana: concurObject.object({
            cocoa: concurObject.number().required()
        })
    })
})

const validateObject = schemaObject.validate({
    fruits: {
        apple: [100, 1],
        banana: {},
        dill: 1
    }
})

console.log(validateObject)