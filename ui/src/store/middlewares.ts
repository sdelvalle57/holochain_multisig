import { Dispatch, Middleware, MiddlewareAPI } from 'redux';


export const localStorageMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (next: Dispatch) => (
    action: any,
) => {
    const result = next(action);
    switch (action.type) {
        default:
            return result;
    }
};
