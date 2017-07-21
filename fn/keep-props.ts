import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';

export function keepProps<T>(reducer: ActionReducer<T>): ActionReducer<T> {
    return (oldState: T, action: Action) => {
        const state = reducer(oldState, action);
        if (state === oldState) return state;

        const oldProps = Object.getOwnPropertyNames(oldState);
        const props = Object.getOwnPropertyNames(state);
        for (let p of oldProps) {
            if (!props.includes(p)) state[p] = oldState[p];
        }

        return state;
    };
}

export const jealousCombineReducers = compose(keepProps, combineReducers);
