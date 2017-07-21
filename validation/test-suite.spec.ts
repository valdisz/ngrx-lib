import 'jasmine';

import isDate from './fn/is-date.spec';
import isInteger from './fn/is-integer.spec';
import isNumber from './fn/is-number.spec';
import maxLength from './fn/max-length.spec';
import minLength from './fn/min-length.spec';
import all from './fn/all.spec';
import any from './fn/any.spec';
import required from './fn/required.spec';
import arrayValidator from './array-validator.spec';
import objectValidator from './object-validator.spec';

describe('Validation', () => {
    isDate();
    isInteger();
    isNumber();
    maxLength();
    minLength();
    all();
    any();
    required();
    arrayValidator();
    objectValidator();
});
