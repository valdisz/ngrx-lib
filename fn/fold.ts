import { ActionReducer } from '@ngrx/store';

export function fold<T>(reducers: ActionReducer<T>[]): ActionReducer<T> {
    return (state, action) => {
        for (let reducer of reducers) {
            const newState = reducer(state, action);
            if (newState !== state) return newState;
        }

        return state;
    };
}
