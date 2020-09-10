const { VALID, INVALID } = require('../constants');

class ConcurBase {
    constructor () {
        this.status = VALID;
        this.key = undefined;
        this.value = undefined;
        this.errors = [];
        this._required = false;
        this._iterable = false;
        this._index = undefined;
        this._options = undefined;
        this._parse = false;
    }

    generateError = {
        invalid: (property, validOptions) => {
            const key = this.key ? this.key : '';
            const index = this._index !== undefined ? `[${this._index}]` : '';
            const separator = this.key ? ':' : '';
            const space = this._index !== undefined ? ' ' : '';
            const valid = validOptions ? `(${validOptions})` : '';
            this.errors.push(`${key}${index}${separator}${space}${INVALID} ${property.toUpperCase()}${valid}`);
        },
        required: () => {
            const key = this.key ? this.key : '';
            const separator = this.key ? ': ' : '';
            this.errors.push(`${key}${separator}REQUIRED`)
        },
        requiredProperties: () => this.errors.push(`${this.key}: REQUIRED PROPERTIES(${this._requiredProperties})`)
    }

    setInvalid (ignoreArray = false) {
        if (this._index !== undefined && ignoreArray === false) {
            this.status.splice(this._index, 1, INVALID);
        } else {
            this.status = INVALID;
        }
    }

    setValid (ignoreArray = false) {
        if (this._index !== undefined && ignoreArray === false) {
            this.status.splice(this._index, 1, VALID);
        } else {
            this.status = VALID;
        }
    }

    reset () {
        this.status = VALID;
        this.key = undefined;
        this.value = undefined;
        this.errors = [];
    }

    checkValid () {
        if (this._index !== undefined) {
            return this.status[this._index] === VALID;
        } else {
            return this.status === VALID;
        }
    }

    setValue (value) {
        this.value = value;
        return this;
    }

    iterable () {
        this._iterable = true;
        return this;
    }

    required () {
        this._required = true;
        return this;
    }

    options (values) {
        this._options = values;
        return this;
    }

    parse () {
        this._parse = true;
        return this;
    }

    checkRequired () {
        if (this._required) {
            this.setInvalid();
            this.generateError.required();
        }
    }

    checkType (value) {
        if (this.checkValid() && typeof value !== this.type) {
            this.setInvalid();
            this.generateError.invalid('TYPE', this.type);
        }
    }

    checkOptions (value) {
        if (this._options === undefined) return;
        if (this.checkValid() && !this._options.includes(value)) {
            this.setInvalid();
            this.generateError.invalid('OPTIONS', this._options);
        }
    }

    validate (value) {
        this.setValue(value);

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            if (this.parseForType) this.parseForType();
            if (this._iterable && Array.isArray(this.value)) {
                this.status = Array(this.value.length).fill(VALID);
                this.value.forEach((value, index) => {
                    this._index = index;
                    this.checkType(value);
                    this.checkOptions(value);
                    if (this.validateForType) this.validateForType(value);
                });

                if (this.status.includes(INVALID)) {
                    this.setInvalid(true);
                } else {
                    this.setValid(true);
                }
            } else {
                this.checkType(this.value);
                this.checkOptions(this.value);
                if (this.validateForType) this.validateForType(this.value);
            }
        }
        return this;
    }
}

module.exports = ConcurBase;
