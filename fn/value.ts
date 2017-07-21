import { ActionReducer } from '@ngrx/store';
import { Predicate } from '../predicate';
import { reduceWhen } from './reduce-when';
import { identity } from '../../utils';

export function value<T>(preicate: string | Predicate<T>, getter: ((any) => any) = identity): ActionReducer<T> {
    return reduceWhen<T>(preicate, (_, { payload }) => getter(payload));
}
