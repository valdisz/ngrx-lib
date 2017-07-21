import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function whitelist(allowed: any[], message: string|Function = 'Not in list of allowed values'): Validator {
    return (_, value?: any) => {
        if (allowed.indexOf(value) >= 0) return valid();

        return invalid(value, message);
    };
}
