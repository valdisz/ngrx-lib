import { Action, ActionReducer } from '@ngrx/store';

export interface PostReducePredicate<T> {
    (oldState: T, action: Action, newState: T): boolean;
}

export interface PostReduceArgs<T> {
    reducer: ActionReducer<T>,
    postReducer: ActionReducer<T>,
    predicate?: PostReducePredicate<T>
}

/**
 * Execute `postReducer` after initial `reducer` on state if `predicate` returns `true`.
 *
 * @template T State type.
 * @param {PostReduceArgs<T>} Object with settings for post reduce operation.
 * @returns {ActionReducer<T>} New redcuer.
 */
export function postReduce<T>({reducer, predicate, postReducer}: PostReduceArgs<T>): ActionReducer<T> {
    return (oldState, action) => {
        const newState = reducer(oldState, action);

        if (oldState === newState) return newState;
        if (!predicate || predicate(oldState, action, newState)) return postReducer(newState, action);

        return newState;
    };
}
