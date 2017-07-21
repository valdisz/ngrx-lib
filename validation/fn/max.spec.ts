import 'jasmine';
import { max } from './max';

export default function() {
    const contains = jasmine.objectContaining;
    const validate = max(5);
    const valid = contains({ valid: true });
    const invalid = contains({ valid: false });

    describe('max', () => {
        describe('invalid', () => {
            it('longer string', () => expect(validate(null, '123456')).toEqual(invalid));
            it('longer array', () => expect(validate(null, [1,2,3,4,5,6])).toEqual(invalid));
            it('non array-like object', () => {
                expect(validate(null, 1)).toEqual(invalid);
                expect(validate(null, false)).toEqual(invalid);
                expect(validate(null, {})).toEqual(invalid);
            });
        });

        describe('valid', () => {
            it('undefined', () => expect(validate(null, undefined)).toEqual(valid));
            it('null', () => expect(validate(null, null)).toEqual(valid));
            it('exact length or shorter string', () => {
                expect(validate(null, '12345')).toEqual(valid);
                expect(validate(null, '1234')).toEqual(valid);
            });

            it('exact length or shorter array', () => {
                expect(validate(null, [1,2,3,4,5])).toEqual(valid);
                expect(validate(null, [1,2,3,4])).toEqual(valid);
            });
        });
    });
}
