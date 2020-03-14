import { createAction } from 'typesafe-actions';

import { ThunkCreator } from '../../util/types';

export const setTickClock = createAction('ui/CLOCK_tick', resolve => {
    return ({ lastUpdate, light }: { lastUpdate: number; light: boolean }) => resolve({ lastUpdate, light });
})

export const startClock: ThunkCreator = () => {
    return async dispatch => {
        return setInterval(() => {
            // Dispatch `TICK` every 1 second
            dispatch(setTickClock({lastUpdate: Date.now(), light: true}))
          }, 1000)
    }

}
