import { Validator, ValidationState } from '../validator';
import { valid } from '../lib';

export function any(...validators: Validator[]): Validator {
    return (state?, value?: any, target?: any) => {
        let result: ValidationState;

        for (let validator of validators) {
            result = validator(state, value, target);
            if (result.valid) return result;
        }

        return result;
    };
}
