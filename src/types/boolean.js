const VALID = 'VALID';
const INVALID = 'INVALID';

const ConcurBase = require('./base');

class ConcurBoolean extends ConcurBase {
    constructor () {
        super();
        this.type = 'boolean';
    }

    parseBoolean () {
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

    validate (value) {
        this.setValue(value);
        this.parseBoolean();

        if (this.value === undefined) {
            this.checkRequired();
        } else {
            if (this._iterable && Array.isArray(this.value)) {
                this.status = Array(this.value.length).fill('VALID');
                this.value.forEach((value, index) => {
                    this._index = index;
                    this.checkType(value);
                });

                if (this.status.includes('INVALID')) {
                    this.setInvalid(true);
                } else {
                    this.setValid(true)
                }
            } else {
                this.checkType(this.value);
            }
        }
        return this;
    }
}

module.exports = ConcurBoolean;
