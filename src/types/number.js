const VALID = 'VALID';
const INVALID = 'INVALID';

const ConcurBase = require('./base');

class ConcurNumber extends ConcurBase {
    constructor () {
        super();
        this.type = 'number';
        this._min = undefined;
        this._max = undefined;
        this._decimals = undefined;
        this._multipleOf = undefined;
        this._parse = false;
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

    parse() {
        this._parse = true;
        return this;
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

    parseNumber () {
        if (this._parse) {
            if (this._decimals === undefined) {
                this.value = parseInt(this.value);
            } else {
                this.value = parseFloat(this.value);
            }
        }
    }

    validate (value) {
        this.setValue(value);
        this.parseNumber();

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            if (this._iterable && Array.isArray(this.value)) {
                this.status = Array(this.value.length).fill(VALID);
                this.value.forEach((value, index) => {
                    this._index = index;
                    this.checkType(value);
                    this.checkMin(value);
                    this.checkMax(value);
                    this.checkDecimals(value);
                    this.checkMultipleOf(value);
                    this.checkOptions(value);
                });

                if (this.status.includes(INVALID)) {
                    this.setInvalid(true);
                } else {
                    this.status = VALID;
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
