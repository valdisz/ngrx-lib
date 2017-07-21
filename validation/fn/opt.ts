import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export interface IsEmptyPredicate<T> {
    (value: T): boolean;
}

export function isEmptyImpl(value: any): boolean {
    const type = typeof(value);

    if (type === 'undefined') return true;
    if (value === null) return true;
    if (type === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;

    return false;
}

export function opt<T>(validator: Validator, isEmpty?: IsEmptyPredicate<T>): Validator {
    isEmpty = isEmpty || isEmptyImpl;

    return (state, value, target) => {
        if (isEmpty(value)) return valid();
        return validator(state, value, target);
    };
}
