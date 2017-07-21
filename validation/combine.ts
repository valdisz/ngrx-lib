import { Validator, ValidationTarget, ValidationState } from './validator';

/**
 * Combine validation results from muliple props.
 * @param validator
 * @param target
 * @param source
 */
export function combine(validator: Validator, target: string, source: string[]): Validator {
    return (state?: ValidationState, obj?: any, target?: ValidationTarget) => {
        const newState = validator(state, obj, target);

        let valid;
        let message;
        let items;

        const props = [target, ...source];
        for (let prop of props) {
            const propState: ValidationState = newState[prop];

            if (!newState[prop]) continue;

            valid = propState.valid && (valid || true);

            if (propState.message) message = message || propState.message;
            if (propState.items) items = {...(items || {}), ...propState.items};
        }

        if (items || message || valid) {
            const newPropState = <ValidationState>{
                valid: valid
            };

            if (message) newPropState.message = message;
            if (items) newPropState.items = items;

            newState[target] = newPropState
        }

        return newState;
    };
}
