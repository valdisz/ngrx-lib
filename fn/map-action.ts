import { Action, ActionReducer } from '@ngrx/store';

export interface ActionMap<T> {
    (state: T, action: Action): Action;
}

export function mapAction<T>(reducer: ActionReducer<T>, mapper: ActionMap<T>): ActionReducer<T> {
    return (state, action) => {
        const newAction = mapper(state, action);
        return reducer(state, newAction);
    };
}
