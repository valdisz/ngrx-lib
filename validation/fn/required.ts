import { isEmptyImpl } from './opt';
import { Validator } from '../validator';
import { valid, invalid } from '../lib';

export function required(message: string|Function = 'Required'): Validator {
    return (_, value?: any) => isEmptyImpl(value) ? invalid(value, message) : valid();
}
