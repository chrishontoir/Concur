class ConcurNumber {
    constructor () {
        this.status = 'VALID';
        this.key = undefined;
        this.value = undefined;
        this.type = 'number';
        this.errors = [];
        this._required = false;
        this._iterable = false;
        this._index = undefined;
        this._min = undefined;
        this._max = undefined;
        this._decimals = undefined;
        this._multipleOf = undefined;
        this._options = undefined;
    }

    generateError = {
        invalid: (property, validOptions) => {
            const key = this.key ? this.key : '';
            const index = this._index !== undefined ? `[${this._index}]` : '';
            const separator = this.key ? ': ' : ' ';
            const valid = validOptions ? `(${validOptions})` : '';
            this.errors.push(`${key}${index}${separator}INVALID ${property.toUpperCase()}${valid}`);
        },
        required: () => this.errors.push(`${this.key}: REQUIRED`)
    }

    setInvalid (ignoreArray = false) {
        if (this._index !== undefined && ignoreArray === false) {
            this.status.splice(this._index, 1, 'INVALID');
        } else {
            this.status = 'INVALID';
        }
    }

    checkValid () {
        if (this._index !== undefined) {
            return this.status[this._index] === 'VALID';
        } else {
            return this.status === 'VALID';
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

    min (value) {
        this._min = value;
        return this;
    }

    max (value) {
        this._max = value;
        return this;
    }

    decimals(precision) {
        this._decimals = precision;
        return this;
    }

    multipleOf(value) {
        this._multipleOf = value;
        return this;
    }

    options(values) {
        this._options = values;
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

    checkMin (value) {
        if (this._min === undefined) return;
        if (this.checkValid() && value < this._min) {
            this.setInvalid();
            this.generateError.invalid('MIN', this._min);
        }
    }

    checkMax (value) {
        if (this._max === undefined) return;
        if (this.checkValid() && value > this._max) {
            this.setInvalid();
            this.generateError.invalid('MAX', this._max);
        }
    }

    checkDecimals (value) {
        if (this._decimals === undefined) return;
        if (
            this.checkValid() &&
            value.toString().split('.')[1] &&
            value.toString().split('.')[1].length > this._decimals
        ) {
            this.setInvalid();
            this.generateError.invalid('DECIMALS', this._decimals);
        }
    }

    checkMultipleOf (value) {
        if (this._multipleOf === undefined) return;
        if (this.checkValid() && value % this._multipleOf !== 0) {
            this.setInvalid();
            this.generateError.invalid('MULTIPLE_OF', this._multipleOf);
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
            if (this._iterable && Array.isArray(this.value)) {
                this.status = Array(this.value.length).fill('VALID');
                this.value.forEach((value, index) => {
                    this._index = index;
                    this.checkType(value);
                    this.checkMin(value);
                    this.checkMax(value);
                    this.checkDecimals(value);
                    this.checkMultipleOf(value);
                    this.checkOptions(value);
                });

                if (this.status.includes('INVALID')) {
                    this.setInvalid(true);
                } else {
                    this.status = 'VALID';
                }
            } else {
                this.checkType(this.value);
                this.checkMin(this.value);
                this.checkMax(this.value);
                this.checkDecimals(this.value);
                this.checkMultipleOf(this.value);
                this.checkOptions(this.value);
            }
        }
        return this;
    }
}

module.exports = ConcurNumber;