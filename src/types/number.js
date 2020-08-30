class ConcurNumber {
    constructor () {
        this.status = 'VALID';
        this.key = undefined;
        this._required = false;
        this.value = undefined;
        this.type = 'number';
        this.errors = [];
        this._iterable = false;
        this._min = undefined;
        this._max = undefined;
        this._decimals = undefined;
        this._multipleOf = undefined;
        this._options = undefined;
    }

    generateError = {
        invalid: (property, index) => index !== undefined
            ? this.errors.push(`${this.key ? `${this.key}[${index}]: ` : `[${index}] `}INVALID ${property.toUpperCase()}`)
            : this.errors.push(`${this.key ? `${this.key}: ` : ''}INVALID ${property.toUpperCase()}`),
        required: () => this.errors.push(`${this.key}: REQUIRED`)
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
            this.status = 'INVALID';
            this.generateError.required();
        }
    }

    checkType (value, index) {
        if (index !== undefined) {
            if (typeof value !== this.type) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid(`TYPE(${this.type})`, index);
            }
        } else {
            if (typeof value !== this.type) {
                this.status = 'INVALID';
                this.generateError.invalid(`TYPE(${this.type})`);
            }
        }
    }

    checkMin (value, index) {
        if (this._min === undefined) return;
        if (index !== undefined) {
            if (this.status[index] === 'VALID' && value < this._min) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid(`MIN(${this._min})`, index);
            }
        } else {
            if (this.status === 'VALID' && value < this._min) {
                this.status = 'INVALID';
                this.generateError.invalid(`MIN(${this._min})`);
            }
        }
    }

    checkMax (value, index) {
        if (this._max === undefined) return;
        if (index !== undefined) {
            if (this.status[index] === 'VALID' && value > this._max) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid(`MAX(${this._max})`, index);
            }
        } else {
            if (this.status === 'VALID' && value > this._max) {
                this.status = 'INVALID';
                this.generateError.invalid(`MAX(${this._max})`);
            }
        }
    }

    checkDecimals (value, index) {
        if (this._decimals === undefined) return;
        if (index !== undefined) {
            if (
                this.status[index] === 'VALID' &&
                value.toString().split('.')[1] &&
                value.toString().split('.')[1].length > this._decimals
            ) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid(`DECIMALS(${this._decimals})`, index);
            }
        } else {
            if (
                this.status === 'VALID' &&
                value.toString().split('.')[1] &&
                value.toString().split('.')[1].length > this._decimals
            ) {
                this.status = 'INVALID';
                this.generateError.invalid(`DECIMALS(${this._decimals})`);
            }
        }
    }

    checkMultipleOf (value, index) {
        if (this._multipleOf === undefined) return;
        if (index !== undefined) {
            if (this.status[index] === 'VALID' && value % this._multipleOf !== 0) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid(`MULTIPLE_OF(${this._multipleOf})`, index);
            }
        } else {
            if (this.status === 'VALID' && value % this._multipleOf !== 0) {
                this.status = 'INVALID';
                this.generateError.invalid(`MULTIPLE_OF(${this._multipleOf})`);
            }
        }
    }

    checkOptions (value, index) {
        if (this._options === undefined) return;
        if (index !== undefined) {
            if (this.status[index] === 'VALID' && !this._options.includes(value)) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid(`OPTIONS(${this._options})`, index);
            }
        } else {
            if (this.status === 'VALID' && !this._options.includes(value)) {
                this.status = 'INVALID';
                this.generateError.invalid(`OPTIONS(${this._options})`);
            }
        }
    }

    validate (value) {
        this.setValue(value);

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            if (this._iterable && Array.isArray(this.value)) {
                this.status = Array(this.value.length).fill('VALID')
                this.value.forEach((value, index) => {
                    this.checkType(value, index);
                    this.checkMin(value, index);
                    this.checkMax(value, index);
                    this.checkDecimals(value, index);
                    this.checkMultipleOf(value, index);
                    this.checkOptions(value, index);
                });

                if (this.status.includes('INVALID')) {
                    this.status = 'INVALID';
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