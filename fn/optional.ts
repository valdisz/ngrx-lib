import { ActionReducer } from '@ngrx/store';

export function optional<T>(reducer: ActionReducer<T>): ActionReducer<T> {
    return (state, action) => {
        return state ? reducer(state, action) : state;
    }
}
