import { createSelector } from 'reselect';

import { StoreState } from '../util/types';

export const getClockLastUpdate = (state: StoreState) => state.ui.lastUpdate;
export const getClockLight = (state: StoreState) => state.ui.light;
export const getCount= (state: StoreState) => state.ui.count;

export const getCurrentRoutePath = (state: StoreState) => state.router.location.pathname;
export const getRouterLocationSearch = (state: StoreState) => state.router.location.search;

export const getTickerCount = createSelector(
    getCount,
    getClockLastUpdate => {
        return getCount.toString()
    },
);



