const Concur = require('../../src/concur');

const concur = new Concur();

const schema = concur.schema({
    apple: concur.number().multiple(),
    banana: concur.number().required()
})

const validated = schema.validate({
    apple: [1, 10, 3],
    banana: 1,
    chocolate: 'hi'
})

console.log(validated)

