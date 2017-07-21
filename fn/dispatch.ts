import { Action, Dispatcher } from '@ngrx/store';
import { ActionFactory } from './action';
import { isFunction } from '../../utils';

export interface ConfiguredDispatcher {
    (payload?: any): void;
}

export function dispatch(dispatcher$: Dispatcher, callbackOrAction?: ActionFactory | Action): ConfiguredDispatcher {
    return (payload?) => {
        let action: Action;

        if (payload) action = payload;

        if (callbackOrAction)
            action = isFunction(callbackOrAction)
                ? (<ActionFactory>callbackOrAction)(payload)
                : <Action>callbackOrAction;

        if (!action) throw new Error('Cannot dispatch null or undefined values');

        dispatcher$.dispatch(action);
    }
}
