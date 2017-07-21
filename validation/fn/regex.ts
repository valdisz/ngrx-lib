import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function regex(pattern: RegExp, message: string|Function = 'Must match pattern'): Validator {
    return (_, value?: any) => {
        let input: string = '';
        if (typeof(value) === 'string') input = value;

        if (pattern.test(input))
            return valid();
        else
            return invalid(value, message);
    };
}
