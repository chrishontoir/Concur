const ConcurBase = require('./base');

class ConcurArray extends ConcurBase {
    constructor (value) {
        super();
        this.type = 'array';
        this.properties = value;
        this._requiredProperties = [];
        this.required();
    }

    required () {
        if (this.properties._required) {
            this._requiredProperties.push(...this.properties._requiredProperties)
            this._required = true;
        }
    }

    checkRequired () {
        if (this._required) {
            this.setInvalid();
            this.generateError.requiredProperties();
        }
    }

    checkType (value) {
        if (this.checkValid() && !Array.isArray(value)) {
            this.setInvalid();
            this.generateError.invalid('TYPE', this.type);
        }
    }

    validate (value) {
        this.setValue(value);

        if (this.value === undefined || this.value.length === 0) {
            this.checkRequired();
        } else {
            this.checkType(this.value);
            if (this.status === 'INVALID') return;
            this.value.forEach((value, index) => {
                this.properties.reset();
                if (this._parse) this.properties.parse();
                this.properties.key = `${this.key}[${index}]`
                this.properties.validate(value)
                if (this.properties.status === 'INVALID') {
                    this.setInvalid();
                    this.errors.push(...this.properties.errors)
                }
            })
        }
    }
}

module.exports = ConcurArray;
