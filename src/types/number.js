class ConcurNumber {
    constructor () {
        this.status = 'VALID';
        this.key = undefined;
        this._required = false;
        this.value = undefined;
        this.type = 'number';
        this.errors = [];
        this.array = false;
        this.minValue = undefined;
        this.maxValue = undefined;
    }

    generateError = {
        invalid: (property, index) => index !== undefined
            ? this.errors.push(`${this.key ? `${this.key}[${index}]: ` : `[${index}] `}INVALID ${property}`)
            : this.errors.push(`${this.key ? `${this.key}: ` : ''}INVALID ${property}`),
        required: () => this.errors.push(`${this.key}: REQUIRED`)
    }

    setValue (value) {
        this.value = value;
        return this;
    }

    multiple () {
        this.array = true;
        return this;
    }

    required () {
        this._required = true;
        return this;
    }

    min (value) {
        this.minValue = value;
        return this;
    }

    max (value) {
        this.maxValue = value;
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
                this.generateError.invalid('TYPE', index);
            }
        } else {
            if (typeof value !== this.type) {
                this.status = 'INVALID';
                this.generateError.invalid('TYPE');
            }
        }
    }

    checkMin (value, index) {
        if (index !== undefined) {
            if (this.status[index] === 'VALID' && value < this.minValue) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid('MIN', index);
            }
        } else {
            if (this.status === 'VALID' && value < this.minValue) {
                this.status = 'INVALID';
                this.generateError.invalid('MIN');
            }
        }
    }

    checkMax (value, index) {
        if (index !== undefined) {
            if (this.status[index] === 'VALID' && value > this.maxValue) {
                this.status.splice(index, 1, 'INVALID');
                this.generateError.invalid('MAX', index);
            }
        } else {
            if (this.status === 'VALID' && value > this.maxValue) {
                this.status = 'INVALID';
                this.generateError.invalid('MAX');
            }
        }
    }

    validate (value) {
        this.setValue(value);

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            if (this.array && Array.isArray(this.value)) {
                this.status = Array(this.value.length).fill('VALID')
                this.value.forEach((value, index) => {
                    this.checkType(value, index);
                    this.checkMin(value, index);
                    this.checkMax(value, index);
                });

                if (this.status.includes('INVALID')) {
                    this.status = 'INVALID';
                } else {
                    this.status = 'VALID';
                }
            } else {
                this.checkType(this.value);
                this.checkMin(this.value);
            }
        }
        return this;
    }
}

module.exports = ConcurNumber;