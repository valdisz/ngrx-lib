export interface ValidationState {
    valid: boolean;
    message?: string;
    items?: NamedValidationState | ValidationState[];
}

export interface NamedValidationState {
    [prop: string]: ValidationState;
}

export type ValidationTarget = any | any[] | any[][];

export interface Validator {
    (state: ValidationState, value: any, target?: ValidationTarget): ValidationState;
}

export interface NamedValidators {
    [prop: string]: Validator;
}
