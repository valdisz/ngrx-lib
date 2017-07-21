import { Validator, ValidationState } from '../validator';
import { valid } from '../lib';

export function all(...validators: Validator[]): Validator {
    return (state?, value?: any, target?: any) => {
        for (let validator of validators) {
            const result = validator(state, value, target);
            if (!result.valid) return result;
        }

        return valid();
    };
}
