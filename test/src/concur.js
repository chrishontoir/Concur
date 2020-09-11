const Concur = require('../../src/concur');

// // Validate
// const concur = new Concur();

// const schema = concur.schema({
//     apple: concur.number().iterable().options([10, 11]),
//     banana: concur.number().decimals(2).multipleOf(4).iterable().required(),
//     digestives: concur.number().required(),
//     animals: concur.array({
//         haribo: concur.number().required()
//     })
// });

// const validate = schema.validate({
//     apple: [10, 10],
//     banana: [4, 7, 12, 23],
//     chocolate: 'hi',
//     animals: [
//         {
//             haribo: '1',
//             test: 'test'
//         },
//         {
//             haribo: 1,
//             test: 'hey'
//         }
//     ]
// })

// console.log(validate)


// Validate a number
const concurNumber = new Concur();

const schemaNumber = concurNumber.schema(concurNumber.number().max(true).even().required());

const validateNumber = schemaNumber.validate(1);

console.log(validateNumber)


// Validate an object
const start = new Date();
const concurObject = new Concur();

const schemaObject = concurObject.schema({
    fruits: concurObject.object({
        apple: concurObject.number().max(99).iterable().required(),
        banana: concurObject.object({
            cocoa: concurObject.number().required()
        })
    })
}).querystring()

const validateObject = schemaObject.validate({
    fruits: {
        apple: ['100', '1'],
        banana: {
            cocoa: '2'
        },
        dill: '1'
    }
})

const end = new Date();

console.log(validateObject, end - start)


// Validate boolean
const concurBoolean = new Concur();

const schemaBoolean = concurBoolean.schema(concurBoolean.boolean().iterable()).querystring();

const validateBoolean = schemaBoolean.validate([false, 'false', true]);

console.log(validateBoolean);


// Validate string
const concurString = new Concur();

const schemaString = concurString.schema(concurString.string().iterable()).querystring();

const validateString = schemaString.validate(['hi', 'bye']);

console.log(validateString);