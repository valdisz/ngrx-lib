import 'jasmine';
import { min } from './min';

export default function() {
    const contains = jasmine.objectContaining;
    const validate = min(5);
    const valid = contains({ valid: true });
    const invalid = contains({ valid: false });

    describe('min', () => {
        describe('invalid', () => {
            it('undefined', () => expect(validate(null, undefined)).toEqual(invalid));
            it('null', () => expect(validate(null, null)).toEqual(invalid));
            it('shorter string', () => expect(validate(null, '1234')).toEqual(invalid));
            it('shorter array', () => expect(validate(null, [1,2,3,4])).toEqual(invalid));
            it('non array-like object', () => {
                expect(validate(null, 1)).toEqual(invalid);
                expect(validate(null, false)).toEqual(invalid);
                expect(validate(null, {})).toEqual(invalid);
            });
        });

        describe('valid', () => {
            it('exact length or longer string', () => {
                expect(validate(null, '123456')).toEqual(valid);
                expect(validate(null, '12345')).toEqual(valid);
            });

            it('exact length or longer array', () => {
                expect(validate(null, [1,2,3,4,5,6])).toEqual(valid);
                expect(validate(null, [1,2,3,4,5])).toEqual(valid);
            });
        });
    });
}
