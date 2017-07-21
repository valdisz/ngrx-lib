import { Validator } from '../validator';
import { valid, invalid } from '../lib';

const ident = '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
const text = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+";

const namePattern = new RegExp(`^${text}(?:\.${text})*$`).compile();
const domainPattern = new RegExp(`^${ident}(?:\.${ident})*$`).compile();

function rfc5332(value: string) {
    const parts = value.split('@');
    if (parts.length != 2) return;

    const [ name, domain ] = parts;

    return namePattern.test(name) && domainPattern.test(domain);
}

export function email(message: string|Function = 'Must be valid email'): Validator {
    return (_, value?: any) => {
        if (!value) return invalid(value, message);

        if (typeof(value) !== 'string') return invalid(value, message);

        return rfc5332(value) ? valid() : invalid(value, message);
    };
}
