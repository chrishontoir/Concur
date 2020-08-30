const Concur = require('../../src/concur');

// Validate an object
const concurObject = new Concur();

const schemaObject = concurObject.schema({
    apple: concurObject.number().multiple(),
    banana: concurObject.number(),
    digestives: concurObject.number().required()
})

const validateObject = schemaObject.validate({
    apple: [1, 10, 'a'],
    banana: 1,
    chocolate: 'hi'
})

console.log(validateObject)


// Validate a number
const concurNumber = new Concur();

const schemaNumber = concurNumber.schema(concurNumber.number().min(5).multiple());

const validateNumber = schemaNumber.validate(['a', 7, 2]);

console.log(validateNumber)
