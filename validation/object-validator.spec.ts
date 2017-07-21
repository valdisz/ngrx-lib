import 'jasmine';
import { objectValidator } from './object-validator';
import { ValidationState, NamedValidationState } from './validator';

export default function() {
    const contains = jasmine.objectContaining;
    const valid = contains({ valid: true });
    const invalid = contains({ valid: false });
    const successValidator = () => ({ valid: true });

    describe('objectValidator', () => {
        const obj = {
            foo: 1,
            bar: 2,
            baz: 3
        };
        let called, objValidator;

        const callbackValidator = (_, value) => {
            called.push(value);
            return { valid: true};
        };

        beforeEach(() => {
            called = [];
            objValidator = {
                foo: callbackValidator,
                bar: callbackValidator,
                baz: callbackValidator
            };
        });

        it('called for each property with validator', () => {
            objectValidator(objValidator)(null, obj);
            expect(called).toEqual([ 1, 2, 3]);

            delete objValidator.foo;
            called = [];

            objectValidator(objValidator)(null, obj);
            expect(called).toEqual([ 2, 3]);
        });

        it('called only for targetProp when it is defined', () => {
            objectValidator(objValidator)(null, obj, 'bar');
            expect(called).toEqual([ 2 ]);
        });

        it('called only for targetProp when it is defined as array', () => {
            objectValidator(objValidator)(null, obj, [ 'bar' ]);
            expect(called).toEqual([ 2 ]);
        });

        it('populates validation state for each item', () => {
            const result = objectValidator(objValidator)(null, obj);

            expect(result.items['foo']).toEqual(valid);
            expect(result.items['bar']).toEqual(valid);
            expect(result.items['baz']).toEqual(valid);
        });

        it('will merge validation state if it is provided by prop name', () => {
            const state: ValidationState = {
                items: {
                    foobar: {
                        valid: false
                    }
                },
                valid: false
            };

            const result = objectValidator(objValidator)(state, obj);

            expect(result.items['foo']).toEqual(valid);
            expect(result.items['bar']).toEqual(valid);
            expect(result.items['baz']).toEqual(valid);
            expect(result.items['foobar']).toEqual(invalid);
        });

        it('will add result item to validation state when it does not cotains result for each prop', () => {
            const state: ValidationState = {
                items: {
                    foo: {
                        valid: false
                    }
                },
                valid: false
            };

            const result = objectValidator(objValidator)(state, obj);

            expect(result.items['foo']).toEqual(valid);
            expect(result.items['bar']).toEqual(valid);
            expect(result.items['baz']).toEqual(valid);
        });
    });
}
