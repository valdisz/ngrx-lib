import { createSelector } from 'reselect';
import { CollectionState, CollectionItems } from './reducer';

export const getIds = (state: CollectionState<any>) => state.ids;
export const getItems = (state: CollectionState<any>) => state.index;
export const getSelectedId = (state: CollectionState<any>) => state.selectedId;

export function createGetSelected<T>() {
    return createSelector<CollectionState<T>, CollectionItems<T>, string | null, T>(
        getItems,
        getSelectedId,
        (items, selectedId) => selectedId ? items[selectedId] : null
    );
}

export function createGetAll<T>() {
    return createSelector<CollectionState<T>, CollectionItems<T>, string[], T[]>(
        getItems,
        getIds,
        (items, ids) => ids.map(id => items[id])
    );
}
