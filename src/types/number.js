const ConcurBase = require('./base');

class ConcurNumber extends ConcurBase {
    constructor () {
        super();
        this.type = 'number';
        this._total = 0;
        this._min = undefined;
        this._max = undefined;
        this._decimals = undefined;
        this._multipleOf = undefined;
        this._sum = undefined;
        this._odd = false;
        this._even = false;
        this._lastIndex = true;
    }

    setValue (value) {
        this.value = value;
        this._total += value;
        return this;
    }

    min (value) {
        if (typeof value !== 'number') {
            this.setInvalid();
            this.generateError.schemaError('MIN', 'argument needs to be a number')
        } else {
            this._min = value;
        }
        return this;
    }

    max (value) {
        if (typeof value !== 'number') {
            this.setInvalid();
            this.generateError.schemaError('MAX', 'argument needs to be a number')
        } else {
            this._max = value;
        }
        return this;
    }

    decimals (precision) {
        if (typeof precision !== 'number') {
            this.setInvalid();
            this.generateError.schemaError('DECIMALS', 'argument needs to be a number')
        } else {
            this._decimals = precision;
        }
        return this;
    }

    multipleOf (value) {
        if (typeof value !== 'number') {
            this.setInvalid();
            this.generateError.schemaError('MULTIPLE_OF', 'argument needs to be a number')
        } else {
            this._multipleOf = value;
        }
        return this;
    }

    odd () {
        this._odd = true;
        return this;
    }

    even () {
        this._even = true;
        return this;
    }

    sum (value) {
        this._sum = value;
        return this;
    }

    checkType (value) {
        if (this.checkValid() && (typeof value !== this.type || isNaN(value))) {
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

    checkOdd (value) {
        if (this._odd === false) return;
        if (this.checkValid() && value % 2 !== 1) {
            this.setInvalid();
            this.generateError.invalid('ODD')
        }
    }

    checkEven (value) {
        if (this._even === false) return;
        if (this.checkValid() && value % 2 !== 0) {
            this.setInvalid();
            this.generateError.invalid('EVEN')
        }
    }

    checkSum () {
        if (this._sum === undefined) return;
        if (this.checkValid() && this._total !== this._sum) {
            this.setInvalid();
            this.generateError.invalid('SUM', this._sum)
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
        this.checkMin(value);
        this.checkMax(value);
        this.checkDecimals(value);
        this.checkMultipleOf(value);
        this.checkOdd(value);
        this.checkEven(value);

        if (this._lastIndex) {
            this.checkSum();
        }
        return this;
    }
}

module.exports = ConcurNumber;
