const ConcurNumber = require('./types/number');

class Concur {
    constructor () {
        this.status = 'VALID';
        this.errors = [];
        this._schema = undefined;
        this.response = undefined;
        this.number = () => new ConcurNumber()
    }

    schema (schema) {
        this._schema = schema;
        return this;
    }

    validate(object) {
        Object.entries(this._schema).forEach(entry => {
            const [schemaKey, schemaObject] = entry;
            schemaObject.key = schemaKey;
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

        if (this.errors.length) {
            this.response = { status: this.status, reason: this.errors };
        } else {
            this.response = { status: this.status };
        }
        return this.response;
    }
}

module.exports = Concur;
