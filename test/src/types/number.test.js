const ConcurNumber = require('../../../src/types/number');

beforeEach(() => {
    this.number = new ConcurNumber();
})

describe('ConcurNumber()', () => {
    test('should set this.status to VALID', () => {
        expect(this.number.status).toStrictEqual('VALID');
    })
    test('should set this.key to undefined', () => {
        expect(this.number.key).toStrictEqual(undefined);
    })
    test('should set this.value to undefined', () => {
        expect(this.number.value).toStrictEqual(undefined);
    })
    test('should set this.type to number', () => {
        expect(this.number.type).toStrictEqual('number');
    })
    test('should set this.errors to an empty array', () => {
        expect(this.number.errors).toStrictEqual([]);
    })
    test('should set this._required to false', () => {
        expect(this.number._required).toStrictEqual(false);
    })
    test('should set this._iterable to false', () => {
        expect(this.number._iterable).toStrictEqual(false);
    })
    test('should set this._index to undefined', () => {
        expect(this.number._index).toStrictEqual(undefined);
    })
    test('should set this._min to undefined', () => {
        expect(this.number._min).toStrictEqual(undefined);
    })
    test('should set this._max to undefined', () => {
        expect(this.number._max).toStrictEqual(undefined);
    })
    test('should set this._decimals to undefined', () => {
        expect(this.number._decimals).toStrictEqual(undefined);
    })
    test('should set this._multipleOf to undefined', () => {
        expect(this.number._multipleOf).toStrictEqual(undefined);
    })
    test('should set this._options to undefined', () => {
        expect(this.number._options).toStrictEqual(undefined);
    })
})

describe('setValue(5)', () => {
    test('should set this.value to 5', () => {
        this.number.setValue(5);
        expect(this.number.value).toStrictEqual(5);
    })
})

describe('iterable()', () => {
    test('should set this._iterable to true', () => {
        this.number.iterable();
        expect(this.number._iterable).toStrictEqual(true);
    })
})

describe('required()', () => {
    test('should set this._required to true', () => {
        this.number.required();
        expect(this.number._required).toStrictEqual(true);
    })
})

describe('min(10)', () => {
    test('should set this._min to 10', () => {
        this.number.min(10);
        expect(this.number._min).toStrictEqual(10);
    })
})

describe('max(28)', () => {
    test('should set this._max to 28', () => {
        this.number.max(28);
        expect(this.number._max).toStrictEqual(28);
    })
})

describe('decimals(3)', () => {
    test('should set this._decimals to 3', () => {
        this.number.decimals(3);
        expect(this.number._decimals).toStrictEqual(3);
    })
})

describe('multipleOf(6)', () => {
    test('should set this._multipleOf to 6', () => {
        this.number.multipleOf(6);
        expect(this.number._multipleOf).toStrictEqual(6);
    })
})

describe('options([1, 2, 3])', () => {
    test('should set this._options to [1, 2, 3]', () => {
        this.number.options([1, 2, 3]);
        expect(this.number._options).toStrictEqual([1, 2, 3]);
    })
})

describe('checkRequired()', () => {
    describe('&& this._required = true', () => {
        beforeEach(() => {
            this.number.required();
            this.number.checkRequired();
        })
        test('should set this.status to INVALID', () => {
            expect(this.number.status).toStrictEqual('INVALID');
        })
        test('should add an error to this.errors', () => {
            expect(this.number.errors).toStrictEqual(["REQUIRED"]);
        })
    })

    describe('&& this._required = false', () => {
        beforeEach(() => {
            this.number.checkRequired();
        })
        test('should keep this.status as VALID', () => {
            expect(this.number.status).toStrictEqual('VALID');
        })
        test('should not add an error to this.errors', () => {
            expect(this.number.errors).toStrictEqual([]);
        })
    })
})

describe('checkMin()', () => {
    describe('&& this._min === undefined', () => {
        beforeEach(() => {
            this.number.checkMin();
        })
        test('should keep this.status as VALID', () => {
            expect(this.number.status).toStrictEqual('VALID');
        })
        test('should not add an error to this.errors', () => {
            expect(this.number.errors).toStrictEqual([]);
        })
    })

    describe('&& this._min === 2 && this.value === 3', () => {
        beforeEach(() => {
            this.number.min(2)
            this.number.checkMin(3);
        })
        test('should keep this.status as VALID', () => {
            expect(this.number.status).toStrictEqual('VALID');
        })
        test('should not add an error to this.errors', () => {
            expect(this.number.errors).toStrictEqual([]);
        })
    })

    describe('&& this._min === 2 && this.value === 2', () => {
        beforeEach(() => {
            this.number.min(2)
            this.number.checkMin(2);
        })
        test('should keep this.status as VALID', () => {
            expect(this.number.status).toStrictEqual('VALID');
        })
        test('should not add an error to this.errors', () => {
            expect(this.number.errors).toStrictEqual([]);
        })
    })

    describe('&& this._min === 2 && this.value === 1', () => {
        beforeEach(() => {
            this.number.min(2)
            this.number.checkMin(1);
        })
        test('should set this.status to INVALID', () => {
            expect(this.number.status).toStrictEqual('INVALID');
        })
        test('should add an error to this.errors', () => {
            expect(this.number.errors).toStrictEqual(["INVALID MIN(2)"]);
        })
    })
})
