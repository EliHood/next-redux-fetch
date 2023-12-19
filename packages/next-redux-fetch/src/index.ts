import { configureStore } from "@reduxjs/toolkit";
import { memoize } from "lodash";
import {
  ApiMappedType,
  HasThunkActions,
  MappedConfigureStore,
  NewReturnType,
} from "./types";

/**
 *
 * @param newOptions
 * @returns
 */
export function createReduxFetch<T, Action>(
  // eslint-disable-next-line no-unused-vars
  store: MappedConfigureStore<typeof configureStore>,
  // eslint-disable-next-line no-unused-vars
  newOptions?: HasThunkActions<Action>,
): NewReturnType<T> & HasThunkActions<Action>;

export function createReduxFetch<A>(
  store: MappedConfigureStore<typeof configureStore>,
  newOptions?: { thunkActions: ApiMappedType<A> },
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

  const mergeOptions = {
    ...copyStore(store),
    thunkActions: { ...newFuncObj },
  };

  const newStore = {
    ...mergeOptions,
  };

  return newStore;
}
