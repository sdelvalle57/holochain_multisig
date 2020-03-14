import { getType } from 'typesafe-actions';

import { UIState } from '../../util/types';
import * as actions from '../actions';
import { RootAction } from '../reducers';


const initialUIState: UIState = {
    lastUpdate: 0,
    light: false,
    count: 0
};

export function ui(state: UIState = initialUIState, action: RootAction): UIState {
    switch (action.type) {

        case getType(actions.setTickClock):
            return {
                ...state, 
                lastUpdate: action.payload.lastUpdate, 
                light: action.payload.light,
                count: state.count + 1
            }
      
        default:
            return  state 
        ;
    }
}
