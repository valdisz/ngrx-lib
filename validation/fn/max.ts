import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function max(len: number, message: string|Function = 'To long'): Validator {
    return (_, value?: any) => {
        if (typeof(value) === 'undefined' || value === null) return valid();

        if (typeof(value) === 'string' || Array.isArray(value)) {
             return value.length <= len ? valid() : invalid(value, message);
        }

        if (typeof(value) === 'number') {
             return value <= len ? valid() : invalid(value, message);
        }

        return invalid(value, message);
    };
}
