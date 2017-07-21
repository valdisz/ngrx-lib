import 'jasmine';
import { isNumber } from './is-number';

export default function() {
    const contains = jasmine.objectContaining;
    const validate = isNumber();
    const valid = contains({ valid: true });
    const invalid = contains({ valid: false });

    describe('isNumber', () => {
        describe('invalid', () => {
            it('undefined', () => expect(validate(null, undefined)).toEqual(invalid));
            it('null', () => expect(validate(null, null)).toEqual(invalid));
            it('boolean', () => expect(validate(null, true)).toEqual(invalid));
            it('object', () => expect(validate(null, {})).toEqual(invalid));
            it('string not formated as number', () => expect(validate(null, 'foo')).toEqual(invalid));
        });

        describe('valid', () => {
            it('string formatted as whole number', () => expect(validate(null, '1')).toEqual(valid));
            it('string formated as real number', () => expect(validate(null, '1.1')).toEqual(valid));
            it('whole number', () => expect(validate(null, 1)).toEqual(valid));
            it('real number', () => expect(validate(null, 1.1)).toEqual(valid));
        });
    });
}