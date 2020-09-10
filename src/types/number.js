const ConcurBase = require('./base');

class ConcurNumber extends ConcurBase {
    constructor () {
        super();
        this.type = 'number';
        this._min = undefined;
        this._max = undefined;
        this._decimals = undefined;
        this._multipleOf = undefined;
    }

    min (value) {
        this._min = value;
        return this;
    }

    max (value) {
        this._max = value;
        return this;
    }

    decimals (precision) {
        this._decimals = precision;
        return this;
    }

    multipleOf (value) {
        this._multipleOf = value;
        return this;
    }

    checkMin (value) {
        if (this._min === undefined) return;
        if (this.checkValid() && value < this._min) {
            this.setInvalid();
            this.generateError.invalid('MIN', this._min);
        }
    }

    checkType (value) {
        if (this.checkValid() && (typeof value !== this.type || isNaN(value))) {
            this.setInvalid();
            this.generateError.invalid('TYPE', this.type);
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
        if (this.checkValid() && value.toString()?.split('.')?.[1]?.length > this._decimals) {
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

    parseForType () {
        if (this._parse) {
            if (this._iterable && Array.isArray(this.value)) {
                this.value = this.value.map(value => parseFloat(value))
            } else {
                this.value = parseFloat(this.value)
            }
        }
    }

    validateForType (value) {
        this.checkMin(value)
        this.checkMax(value)
        this.checkDecimals(value)
        this.checkMultipleOf(value)
        return this;
    }
}

module.exports = ConcurNumber;
