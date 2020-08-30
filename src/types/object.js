class ConcurObject {
    constructor (value) {
        this.status = 'VALID';
        this.key = undefined;
        this._required = false;
        this.properties = value;
        this._requiredProperties = [];
        this.type = 'object';
        this.errors = [];
        this.value = undefined;
        this._parse = false;
    }

    generateError = {
        invalid: (property, index) => index !== undefined
            ? this.errors.push(`${this.key ? `${this.key}[${index}]: ` : `[${index}] `}INVALID ${property.toUpperCase()}`)
            : this.errors.push(`${this.key ? `${this.key}: ` : ''}INVALID ${property.toUpperCase()}`),
        required: () => this.errors.push(`${this.key}: REQUIRED PROPERTIES(${this._requiredProperties})`)
    }

    setValue (value) {
        this.value = value;
        return this;
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
            this.status = 'INVALID';
            this.generateError.required();
        }
    }

    checkType () {
        if (typeof this.value !== this.type) {
            this.status = 'INVALID';
            this.generateError.invalid(`TYPE(${this.type})`);
        }
    }

    validate (value) {
        this.value = value;
        this.required();

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            this.checkType();
            if (this.status === 'INVALID') return;
            Object.entries(this.properties).forEach(property => {
                const [propertyKey, propertyValue] = property;
                propertyValue.key = `${this.key}.${propertyKey}`;
                if (this._parse) propertyValue.parse();
                propertyValue.validate(value[propertyKey])
                if (propertyValue.status === 'INVALID') {
                    this.status = 'INVALID';
                    this.errors.push(...propertyValue.errors);
                }
                delete value[propertyKey];
            });
    
            Object.keys(value).forEach(key => {
                this.status = 'INVALID';
                this.errors.push(`${key}: UNKNOWN`);
            })
        }
    }
}

module.exports = ConcurObject;
