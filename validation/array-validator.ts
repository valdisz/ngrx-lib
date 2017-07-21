import { Validator, ValidationTarget, ValidationState } from './validator';
import { valid } from './lib';

export function arrayValidator(validator: Validator): Validator {
    return (state: ValidationState, items: any[], target?: ValidationTarget) => {
        if (state) {
            state = Object.assign({}, state);
            state.items = state.items && Array.isArray(state.items) ? [...state.items] : [];
        }
        else
            state = { valid: true, items: [] };

        items = items || [];

        let targetItem, targetChain;
        if (target) {
            if (Array.isArray(target) && target.length > 0) {
                targetItem = target[0];
                targetChain = target.slice(1);
            }
            else
                targetItem = target;
        }

        const isTargetItem = Array.isArray(targetItem)
            ? (item) => targetItem.indexOf(item) >= 0
            : (item) => item === targetItem;

        let isValid = true;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemState = state.items[i];

            let result;
            if (targetItem && !isTargetItem(item)) {
                if (itemState) result = itemState;
            }
            else
                result = (<any>validator)(itemState, item, targetChain);

            if (result) {
                isValid = isValid && result.valid;
                if (state.items[i])
                    state.items[i] = result;
                else
                    (<any[]>state.items).push(result);
            }
        }

        state.valid = isValid;
        return state;
    };
}
