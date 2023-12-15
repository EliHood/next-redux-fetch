import { configureStore } from "@reduxjs/toolkit";
import { memoize } from "lodash";
import { ApiMappedType, NewStoreReturnType, OldOptions } from "./types";

/**
 *
 * @param newOptions
 * @returns
 */
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
