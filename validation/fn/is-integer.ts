import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function isInteger(message: string|Function = 'Must be whole number'): Validator {
    return (_, value?: any) => {
        if (!value) return invalid(value, message);

        if (typeof(value) === 'number') {
            if (Number.isNaN(value)) return invalid(value, message);
            if (!Number.isInteger(value)) return invalid(value, message);

            return valid();
        }

        if (typeof(value) === 'string') {
            const result = parseFloat(value);

            if (Number.isNaN(result)) return invalid(value, message);
            if (!Number.isInteger(result)) return invalid(value, message);

            return valid();
        }

        return invalid(value, message);
    };
}
