import { configureStore } from "@reduxjs/toolkit";
import { memoize } from "lodash";
import {
  ApiMappedType,
  MappedConfigureStore,
  NewReturnType,
  ThunkActions,
} from "./types";

/**
 *
 * @param newOptions
 * @returns
 */
export function createReduxFetch<T, A>(
  store: MappedConfigureStore<typeof configureStore>,
  newOptions?: ThunkActions<A>,
): NewReturnType<T, A>;

export function createReduxFetch<T, A>(
  store: MappedConfigureStore<typeof configureStore>,
  newOptions?: ThunkActions<A>,
): ReturnType<typeof configureStore> {
  const copyStore = configureStore;
  const thunkActions = newOptions?.thunkActions;

  if (!thunkActions) {
    return { ...copyStore(store) };
  }

  const newFuncObj = Object.keys(thunkActions).reduce(
    (acc, fn): ApiMappedType<A> => {
      const memo = memoize?.(thunkActions?.[fn]);
      return { ...acc, [fn]: memo } as ApiMappedType<A>;
    },
    {},
  ) as ApiMappedType<A>;

  const mergeOptions: NewReturnType<T, A> = {
    ...copyStore(store),
    thunkActions: { ...newFuncObj },
  };

  const newStore: NewReturnType<T, A> = {
    ...mergeOptions,
  };

  return newStore;
}
