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
        invalid: (property, index) => index !== undefined ? this.errors.push(`${this.key}[${index}]: INVALID ${property}`) : this.errors.push(`${this.key}: INVALID ${property}`),
        required: () => this.errors.push(`${this.key}: REQUIRED`)
    }

    setValue (value) {
        this.value = value;
        return this;
    }

    required () {
        this._required = true;
        return this;
    }

    multiple () {
        this.array = true;
        return this;
    }

    min (value) {
        this.minValue = value;
        return this;
    }

    checkMin () {
        if (this.array && Array.isArray(this.value)) {
            this.value.forEach((value, index) => {
                if (value < this.minValue) {
                    this.status = 'INVALID';
                    this.generateError.invalid('MIN', index);
                }
            })
        } else {
            if (this.value < this.minValue) {
                this.status = 'INVALID';
                this.generateError.invalid('MIN');
            }
        }
    }

    max (value) {
        this.maxValue = value;
        return this;
    }

    checkMax () {
        if (this.array && Array.isArray(this.value)) {
            this.value.forEach((value, index) => {
                if (value > this.maxValue) {
                    this.status = 'INVALID';
                    this.generateError.invalid('MAX', index);
                }
            })
        } else {
            if (this.value > this.maxValue) {
                this.status = 'INVALID';
                this.generateError.invalid('MAX');
            }
        }
    }

    checkRequired () {
        if (this._required) {
            this.status = 'INVALID';
            this.generateError.required();
        }
    }

    checkType () {
        if (this.array && Array.isArray(this.value)) {
            this.value.forEach((value, index) => {
                if (typeof value !== this.type) {
                    this.status = 'INVALID';
                    this.generateError.invalid('TYPE', index);
                }
            })
        } else {
            if (typeof this.value !== this.type) {
                this.status = 'INVALID';
                this.generateError.invalid('TYPE');
            }
        }
    }

    validate (value) {
        this.setValue(value);
        if (this.value !== undefined) {
            this.checkType();
            this.checkMin();
            this.checkMax();
        } else {
            this.checkRequired();
        }
        return this;
    }
}

module.exports = ConcurNumber;