import 'jasmine';
import { isDate } from './is-date';

export default function() {
    const contains = jasmine.objectContaining;
    const validate = isDate();
    const valid = contains({ valid: true });
    const invalid = contains({ valid: false });

    describe('isDate', () => {
        describe('invalid', () => {
            it('undefined', () => expect(validate(null, undefined)).toEqual(invalid));
            it('null', () => expect(validate(null, null)).toEqual(invalid));
            it('number', () => expect(validate(null, 1)).toEqual(invalid));
            it('boolean', () => expect(validate(null, true)).toEqual(invalid));
            it('object', () => expect(validate(null, {})).toEqual(invalid));
            it('string not formated as date', () => expect(validate(null, 'foo')).toEqual(invalid));
        });

        describe('valid', () => {
            it('Date object', () => expect(validate(null, new Date())).toEqual(valid));
            it('string formatted as date', () => expect(validate(null, '01-01-2020')).toEqual(valid));
        });
    });
}
