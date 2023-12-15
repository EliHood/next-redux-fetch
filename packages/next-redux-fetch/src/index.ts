import {
  Action,
  ConfigureStoreOptions,
  StoreEnhancer,
  Tuple,
  UnknownAction,
  configureStore,
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
import { memoize } from "lodash";

type ApiMappedType<T> = {
  // eslint-disable-next-line no-unused-vars
  [field in keyof T]: AsyncThunk<any, void, AsyncThunkConfig>;
};

type Enhancers = ReadonlyArray<StoreEnhancer>;

type MainNewStore<
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

type OldOptions<T> = Omit<
  MainNewStore<T>,
  "dispatch" | "getState" | "subscribe" | "replaceReducer"
>;

type NewStoreReturnType<T> = Pick<
  MainNewStore<T>,
  "dispatch" | "getState" | "subscribe" | "replaceReducer" | "thunkActions"
> & { [Symbol.observable] };

export function createReduxFetch<T>(
  newOptions: OldOptions<T>,
): NewStoreReturnType<T> {
  const store = configureStore;
  const thunkActions = newOptions?.thunkActions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newFuncObj = Object.keys(thunkActions).reduce(
    (acc, fn): ApiMappedType<T> => {
      const memo = memoize?.(thunkActions?.[fn]);
      return { ...acc, [fn]: memo } as ApiMappedType<T>;
    },
    {},
  ) as ApiMappedType<T>;

  function oldOptions() {
    delete newOptions.thunkActions;
    return newOptions;
  }

  const mergeOptions: NewStoreReturnType<T> = {
    ...store(oldOptions()),
    thunkActions: { ...newFuncObj },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newStore: NewStoreReturnType<T> = {
    ...mergeOptions,
  };

  return newStore;
}
