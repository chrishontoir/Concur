const ConcurBase = require('./base');

class ConcurString extends ConcurBase {
    constructor () {
        super();
        this.type = 'string';
        this._min = undefined;
        this._max = undefined;
    }

    min (value) {
        this._min = value;
        return this;
    }

    max (value) {
        this._max = value;
        return this;
    }

    checkMin (value) {
        if (this._min === undefined) return;
        if (this.checkValid() && value.length < this._min) {
            this.setInvalid();
            this.generateError.invalid('MIN', this._min);
        }
    }

    checkMax (value) {
        if (this._max === undefined) return;
        if (this.checkValid() && value.length > this._max) {
            this.setInvalid();
            this.generateError.invalid('MAX', this._max);
        }
    }

    parseForType () {
        if (this._parse) {
            if (this._iterable && Array.isArray(this.value)) {
                this.value = this.value.map(value => String(value))
            } else {
                this.value = String(this.value)
            }
        }
    }

    validateForType (value) {
        this.checkMin(value);
        this.checkMax(value);
        return this;
    }
}

module.exports = ConcurString;
