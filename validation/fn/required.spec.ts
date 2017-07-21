import 'jasmine';
import { required } from './required';

export default function() {
    const contains = jasmine.objectContaining;
    const validate = required();
    const valid = contains({ valid: true });
    const invalid = contains({ valid: false });

    describe('required', () => {
        describe('invalid', () => {
            it('undefined', () => expect(validate(null, undefined)).toEqual(invalid));
            it('null', () => expect(validate(null, null)).toEqual(invalid));
            it('empty string', () => expect(validate(null, '')).toEqual(invalid));
            it('whitespace', () => expect(validate(null, '   ')).toEqual(invalid));
        });

        describe('valid', () => {
            it('non-null or empty value', () => {
                expect(validate(null, 1)).toEqual(valid);
                expect(validate(null, {})).toEqual(valid);
                expect(validate(null, "foo")).toEqual(valid);
                expect(validate(null, true)).toEqual(valid);
                expect(validate(null, false)).toEqual(valid);
            });
        });
    });
}
