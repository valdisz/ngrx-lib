import 'jasmine';
import { all} from './all';

export default function() {
    const contains = jasmine.objectContaining;
    const valid = contains({ isValid: true });
    const invalid = contains({ isValid: false });

    const success = () => ({ isValid: true });
    const failure = () => ({ isValid: false, message: 'failure' });

    describe('all', () => {
        it('valid when all are valid', () => expect(all(success, success, success)(null, null)).toEqual(valid));
        it('invalid when at leason one is invalid', () => expect(all(success, failure, success)(null, null)).toEqual(invalid));
    });
}
