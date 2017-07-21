export interface Comparer<T> {
    (a: T, b: T): number;
}

export interface EqualityComparer<T> {
    (a: T, b: T): boolean;
}

export interface IdSelector<T> {
    (value: T): string;
}

export function equalityComparer<T>(a: T, b: T): boolean {
    return a === b;
}

export function selectByName(field: string): IdSelector<any> {
    return (value: any) => value[field];
}

export function uplift<T>(value: string | T, uplifter: (field: string) => T): T {
    return value && typeof value === 'string'
        ? uplifter(value)
        : <T>value;
}
