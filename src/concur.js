const ConcurNumber = require('./types/number');
const ConcurObject = require('./types/object');

class Concur {
    constructor () {
        this.status = 'VALID';
        this.errors = [];
        this._schema = undefined;
        this.response = undefined;
        this._parse = false;
        this.number = () => new ConcurNumber()
        this.object = object => new ConcurObject(object)
    }

    schema (schema) {
        if (arguments.length > 1) {
            this.status = 'INVALID';
            this.errors.push('schema() only accepts one argument');
        } else {
            this._schema = schema;
        }
        return this;
    }

    querystring () {
        this._parse = true;
        return this;
    }

    validate(value) {
        if (arguments.length > 1) {
            this.status = 'INVALID';
            this.errors.push('validate() only accepts one argument');
        }

        if (this.status === 'VALID') {
            if (this._schema instanceof ConcurNumber) {
                this.validateNumber(value);
            } else {
                this.validateObject(value);
            }
        }

        if (this.errors.length) {
            this.response = { status: this.status, reason: this.errors };
        } else {
            this.response = { status: this.status };
        }
        return this.response;
    }

    validateNumber(number) {
        if (this._parse) this._schema.parse();
        this._schema.validate(number);
        if (this._schema.status === 'INVALID') {
            this.status = 'INVALID';
            this.errors.push(...this._schema.errors);
        }
    }

    validateObject(object) {
        Object.entries(this._schema).forEach(entry => {
            const [schemaKey, schemaObject] = entry;
            schemaObject.key = schemaKey;
            if (this._parse) schemaObject.parse();
            schemaObject.validate(object[schemaKey])
            if (schemaObject.status === 'INVALID') {
                this.status = 'INVALID';
                this.errors.push(...schemaObject.errors);
            }
            delete object[schemaKey];
        });

        Object.keys(object).forEach(key => {
            this.status = 'INVALID';
            this.errors.push(`${key}: UNKNOWN`);
        })
    }
}

module.exports = Concur;
