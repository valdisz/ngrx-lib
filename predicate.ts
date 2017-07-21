import { Action } from '@ngrx/store';

export interface Predicate<T> {
    (state: T, action: Action): boolean;
}
