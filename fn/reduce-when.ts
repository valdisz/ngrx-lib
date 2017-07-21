import { ActionReducer } from '@ngrx/store';
import { Predicate } from '../predicate';
import { isFunction } from '../../utils';

export function reduceWhen<T>(predicate: string | Predicate<T>, reducer: ActionReducer<T>): ActionReducer<T> {
    let actionTest;
    if (isFunction(predicate))
        actionTest = <Predicate<T>>predicate;
    else {
        if (typeof predicate === 'string')
            actionTest = (_, { type }) => type === predicate;
        else
            throw new Error('predicate must be string or function');
    }

    return function(...args) {
        if (!actionTest.apply(this, args)) return args[0];

        const newState = reducer.apply(this, args);
        return newState;
    };
}
