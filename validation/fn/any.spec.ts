import 'jasmine';
import { any } from './any';

export default function() {
    const contains = jasmine.objectContaining;
    const valid = contains({ isValid: true });
    const invalid = contains({ isValid: false });

    const success = () => ({ isValid: true });
    const failure = () => ({ isValid: false, message: 'failure' });

    describe('any', () => {
        it('valid when at leason one is valid', () => expect(any(failure, failure, success)(null, null)).toEqual(valid));
        it('invalid when all are invalid', () => expect(any(failure, failure)(null, null)).toEqual(invalid));
    });
}
