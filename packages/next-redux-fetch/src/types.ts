import {
  Action,
  ConfigureStoreOptions,
  StoreEnhancer,
  Tuple,
  UnknownAction,
} from "@reduxjs/toolkit";
import {
  EnhancedStore,
  Middlewares,
} from "@reduxjs/toolkit/dist/configureStore";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { ExtractDispatchExtensions } from "@reduxjs/toolkit/dist/tsHelpers";

export type ApiMappedType<T> = {
  // eslint-disable-next-line no-unused-vars
  [field in keyof T]: AsyncThunk<any, void, AsyncThunkConfig>;
};

export type Enhancers = ReadonlyArray<StoreEnhancer>;

export type MainNewStore<
  T,
  S = any,
  A extends Action = UnknownAction,
  M extends Tuple<Middlewares<S>> = Tuple<[ThunkMiddlewareFor<S>]>,
  E extends Tuple<Enhancers> = Tuple<
    [
      StoreEnhancer<{
        dispatch: ExtractDispatchExtensions<M>;
      }>,
      StoreEnhancer,
    ]
  >,
  P = S,
> = { thunkActions: ApiMappedType<T> } & ConfigureStoreOptions<S, A, M, E, P> &
  Pick<
    EnhancedStore<S, A, E>,
    "dispatch" | "getState" | "replaceReducer" | "subscribe"
  >;

export type OldOptions<T> = Omit<
  MainNewStore<T>,
  "dispatch" | "getState" | "subscribe" | "replaceReducer"
>;

export type NewStoreReturnType<T> = Pick<
  MainNewStore<T>,
  "dispatch" | "getState" | "subscribe" | "replaceReducer" | "thunkActions"
> & { [Symbol.observable] };
