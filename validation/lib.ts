import { ValidationState } from './validator';

export function getMessage(value: any, message: string|Function): string {
    return typeof(message) === 'string' ? message : message(value);
}

export function valid(): ValidationState {
    return { valid: true };
}

export function invalid(value: any, message: string|Function): ValidationState {
    return { valid: false, message: getMessage(value, message) };
}
