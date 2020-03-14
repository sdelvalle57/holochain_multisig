import { RouterState } from 'connected-react-router';
import { ThemeProperties, ThemeModalStyle } from '../themes/commons';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ExtraArgument } from '../store/index';

export interface UIState {
    readonly lastUpdate: number,
    readonly light: boolean,
    readonly count: number,
}

export interface StoreState {
    readonly router: RouterState;
    readonly ui: UIState;
}


export type Step =
    | UIState
    | StoreState


export enum OrderSide {
    Sell,
    Buy,
}

export interface UIOrder extends UIState {
    
}

export enum NotificationKind {
    CancelOrder = 'CancelOrder',
    Market = 'Market',
    Limit = 'Limit',
    OrderFilled = 'OrderFilled',
}

export interface ConfigFile {
    theme?: PartialTheme;
    general?: GeneralConfig;
}

export interface PartialTheme {
    componentsTheme?: Partial<ThemeProperties>;
    modalTheme?: Partial<ThemeModalStyle>;
}

export interface GeneralConfig {
    title?: string;
    icon?: string;
}

export type ThunkCreator<R = Promise<any>> = ActionCreator<ThunkAction<R, StoreState, ExtraArgument, AnyAction>>;
