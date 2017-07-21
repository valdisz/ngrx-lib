import { createSelector } from 'reselect';
import { PagedCollectionState } from './reducer';
import { CollectionItems } from '../collection';

export const getIds = (state: PagedCollectionState<any>) => state.ids;
export const getItems = (state: PagedCollectionState<any>) => state.index;
export const getSelectedId = (state: PagedCollectionState<any>) => state.selectedId;
export const getSelectedPageNo = (state: PagedCollectionState<any>) => state.selectedPageNo;
export const getPageSize = (state: PagedCollectionState<any>) => state.pageSize;
export const getItemsCount = (state: PagedCollectionState<any>) => state.count;

export function createGetSelected<T>() {
    return createSelector<PagedCollectionState<T>, CollectionItems<T>, string | null, T>(
        getItems,
        getSelectedId,
        (items, selectedId) => selectedId ? items[selectedId] : null
    );
}

export function createGetAll<T>() {
    return createSelector<PagedCollectionState<T>, CollectionItems<T>, string[], T[]>(
        getItems,
        getIds,
        (items, ids) => ids.map(id => items[id])
    );
}
