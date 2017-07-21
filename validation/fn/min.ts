import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function min(len: number, message: string|Function = 'To short'): Validator {
    return (_, value?: any) => {
        if (!value) return invalid(value, message);

        if (typeof(value) === 'string' || Array.isArray(value)) {
             return value.length >= len ? valid() : invalid(value, message);
        }

        if (typeof(value) === 'number') {
             return value >= len ? valid() : invalid(value, message);
        }

        return invalid(value, message);
    };
}
