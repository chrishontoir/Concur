const ConcurBase = require('./base');

class ConcurObject extends ConcurBase {
    constructor (value) {
        super();
        this.type = 'object';
        this.properties = value;
        this._requiredProperties = [];
        this._lastIndex = true;
        this.required();
    }

    required () {
        Object.entries(this.properties).forEach(property => {
            const [propertyKey, propertyValue] = property;
            if (propertyValue._required) {
                this._requiredProperties.push(propertyKey);
            }
        })
        if (this._requiredProperties.length > 0) {
            this._required = true;
        }
    }

    checkRequired() {
        if (this._required) {
            this.setInvalid();
            this.generateError.requiredProperties();
        }
    }


    validate (value) {
        this.setValue(value)

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            this.checkType(this.value);
            if (this.status === 'INVALID') return;
            Object.entries(this.properties).forEach(property => {
                const [propertyKey, propertyValue] = property;
                propertyValue.reset();
                if (this._parse) propertyValue.parse();
                propertyValue._lastIndex = this._lastIndex;
                propertyValue.key = `${this.key}.${propertyKey}`;
                propertyValue.validate(value[propertyKey])
                if (propertyValue.status === 'INVALID') {
                    this.setInvalid();
                    this.errors.push(...propertyValue.errors);
                }
                delete value[propertyKey];
            });
    
            Object.keys(value).forEach(key => {
                this.setInvalid();
                this.errors.push(`${this.key}.${key}: UNKNOWN`);
            })
        }
    }
}

module.exports = ConcurObject;
