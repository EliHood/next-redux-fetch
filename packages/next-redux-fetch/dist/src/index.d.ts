import { Action, ConfigureStoreOptions, StoreEnhancer, Tuple, UnknownAction } from "@reduxjs/toolkit";
import { EnhancedStore, Middlewares } from "@reduxjs/toolkit/dist/configureStore";
import { AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { ExtractDispatchExtensions } from "@reduxjs/toolkit/dist/tsHelpers";
type ApiMappedType<T> = {
    [field in keyof T]: AsyncThunk<any, void, AsyncThunkConfig>;
};
type Enhancers = ReadonlyArray<StoreEnhancer>;
type MainNewStore<T, S = any, A extends Action = UnknownAction, M extends Tuple<Middlewares<S>> = Tuple<[ThunkMiddlewareFor<S>]>, E extends Tuple<Enhancers> = Tuple<[
    StoreEnhancer<{
        dispatch: ExtractDispatchExtensions<M>;
    }>,
    StoreEnhancer
]>, P = S> = {
    thunkActions: ApiMappedType<T>;
} & ConfigureStoreOptions<S, A, M, E, P> & Pick<EnhancedStore<S, A, E>, "dispatch" | "getState" | "replaceReducer" | "subscribe">;
type OldOptions<T> = Omit<MainNewStore<T>, "dispatch" | "getState" | "subscribe" | "replaceReducer">;
type NewStoreReturnType<T> = Pick<MainNewStore<T>, "dispatch" | "getState" | "subscribe" | "replaceReducer" | "thunkActions"> & {
    [Symbol.observable]: any;
};
export declare function createReduxFetch<T>(newOptions: OldOptions<T>): NewStoreReturnType<T>;
export {};
