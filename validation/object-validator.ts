import { Validator, ValidationTarget, NamedValidators, ValidationState } from './validator';
import { valid } from './lib';

export function objectValidator(validators: NamedValidators): Validator {
    return (state?: ValidationState, obj?: any, target?: ValidationTarget) => {
        if (state) {
            state = Object.assign({}, state);
            state.items = state.items ? Object.assign({}, state.items) : {};
        }
        else
            state = { valid: true, items: {} };

        let targetProp, targetChain;
        if (target) {
            if (Array.isArray(target) && target.length > 0) {
                targetProp = target[0];
                targetChain = target.slice(1);
            }
            else
                targetProp = target;
        }

        const isTargetProp = Array.isArray(targetProp)
            ? (prop) => targetProp.indexOf(prop) >= 0
            : (prop) => prop === targetProp;

        let isValid = true;
        for (let prop of Object.keys(validators)) {
            const value = obj[prop];
            const propState = state.items[prop];
            const validator = validators[prop];

            const result: ValidationState = (<any>validator)(propState, value, targetChain);
            isValid = isValid && result.valid;

            if (!targetProp || isTargetProp(prop)) state.items[prop] = result;
        }

        state.valid = isValid;
        return state;
    };
}
