const ConcurBase = require('./base');

class ConcurBoolean extends ConcurBase {
    constructor () {
        super();
        this.type = 'boolean';
        this._true = false;
        this._false = false;
    }

    true () {
        this._true = true;
        return this;
    }

    false () {
        this._false = true;
        return this;
    }

    checkTrue (value) {
        if (this._true === false) return;
        if (this.checkValid() && value !== true) {
            this.setInvalid();
            this.generateError.invalid('TRUE');
        }
    }

    checkFalse (value) {
        if (this._false === false) return;
        if (this.checkValid() && value !== false) {
            this.setInvalid();
            this.generateError.invalid('FALSE');
        }
    }

    parseForType () {
        if (this._parse) {
            if (this._iterable && Array.isArray(this.value)) {
                this.value = this.value.map(value => {
                    if (value?.toString().toLowerCase() === 'true') {
                        return true;
                    }
                    if (value?.toString().toLowerCase() === 'false') {
                        return false;
                    }
                    return value;
                })
            } else {
                if (this.value?.toString().toLowerCase() === 'true') {
                    this.value = true;
                }
                if (this.value?.toString().toLowerCase() === 'false') {
                    this.value = false;
                }
            }
        }
    }

    validateForType (value) {
        this.checkTrue(value);
        this.checkFalse(value);
        return this;
    }
}

module.exports = ConcurBoolean;
