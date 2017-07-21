import { ActionReducer } from '@ngrx/store';
import { Validator, ValidationState } from './validator';
import { Predicate } from '../predicate';
import { changedProps } from '../../utils';

export interface ValidateArgs<T> {
    reducer: ActionReducer<T>,
    validator: Validator,
    predicate?: Predicate<T>
}

export interface WithValidation {
    valid?: ValidationState;
}

export function validate<T>({ reducer, validator, predicate }: ValidateArgs<T>): ActionReducer<T & WithValidation> {
    return (state, action) => {
        let newState: T & WithValidation = reducer(state, action);
        if (newState === state) return state;

        if (predicate && !predicate(newState, action)) return newState;

        const changed = changedProps(newState, state);
        newState.valid = validator(newState.valid, newState, changed);

        return newState;
    };
}
