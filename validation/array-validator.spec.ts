import 'jasmine';
import { arrayValidator } from './array-validator';
import { ValidationState } from './validator';

export default function() {
    const contains = jasmine.objectContaining;
    const valid = contains(<ValidationState>{ valid: true });
    const invalid = contains(<ValidationState>{ valid: false });
    const successValidator = () => (<ValidationState>{ valid: true });

    describe('arrayValidator', () => {
        const items = [1, 2, 3];
        let called = [];

        const callbackValidator = (_, item) => {
            called.push(item);
            return <ValidationState>{ valid: true};
        };

        beforeEach(() => called = []);

        it('called for each item in array', () => {
            arrayValidator(callbackValidator)(null, items);
            expect(called).toEqual(items);
        });

        it('called only for targetItem when it is defined', () => {
            arrayValidator(callbackValidator)(null, items, 2);
            expect(called).toEqual([ 2 ]);
        });

        it('called only for targetItem when it is defined as array', () => {
            arrayValidator(callbackValidator)(null, items, [ 2 ]);
            expect(called).toEqual([ 2 ]);
        });

        it('populates validation state for each item', () => {
            const result = arrayValidator(successValidator)(null, items);
            expect((<ValidationState[]>result.items).length).toBe(3);
        });

        it('will merge validation state if it is provided by index', () => {
            const inv: ValidationState = { valid: false };
            const state: ValidationState = { items: [ inv, inv, inv, inv ], valid: false };
            const result = arrayValidator(successValidator)(state, items);

            expect(<ValidationState[]>(result.items)).toEqual(contains([ valid, valid, valid, invalid ]));
        });

        it('will add result item to validation state when it is shortert than items list', () => {
            const inv: ValidationState = { valid: false };
            const state: ValidationState = { items: [ inv, inv ], valid: false };
            const result = arrayValidator(successValidator)(state, items);

            expect(<ValidationState[]>(result.items)).toEqual(contains([ valid, valid, valid ]));
        });
    });
}
