import { Action } from '@ngrx/store';
import { isFunction } from '../../utils';

export interface ActionFactory {
    (payload?: any): Action;
}

export function action(type: string, defaultPayload?: Function | any): ActionFactory {
    return (payload?) => {
        if (payload == null && defaultPayload != null) {
            payload = isFunction(defaultPayload) ? defaultPayload() : defaultPayload;
        }

        return { type, payload };
    };
}
