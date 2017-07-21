import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function isDate(message: string|Function = 'Must be date'): Validator {
    return (_, value?: any) => {
        if (!value) return invalid(value, message);

        if (value instanceof Date) {
            return valid();
        }

        if (typeof(value) === 'string') {
            return Date.parse(value) ? valid() : invalid(value, message);
        }

        return invalid(value, message);
    };
}
