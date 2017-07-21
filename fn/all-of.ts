import { ActionReducer } from '@ngrx/store';

export function allOf<T>(reducers: ActionReducer<T>[]): ActionReducer<T> {
    return (state, action) => {
        return reducers.reduce((prevState, reducer) => reducer(prevState, action), state);
    };
}
