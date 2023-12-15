/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { memoize } from "lodash";
import { ApiMappedType, NewReturnType, OlderOptions } from "./types";

/**
 *
 * @param newOptions
 * @returns
 */

export function createReduxFetch<T, A>(
  newOptions: OlderOptions<T, A>,
): NewReturnType<T, A> {
  const store = configureStore;
  const thunkActions = newOptions?.thunkActions;

  const newFuncObj = Object.keys(thunkActions).reduce(
    (acc, fn): ApiMappedType<A> => {
      const memo = memoize?.(thunkActions?.[fn]);
      return { ...acc, [fn]: memo } as ApiMappedType<A>;
    },
    {},
  ) as ApiMappedType<A>;

  function oldOptions(): Omit<OlderOptions<T, A>, "thunkActions"> {
    delete newOptions.thunkActions;
    return newOptions;
  }

  const mergeOptions: NewReturnType<T, A> = {
    ...store(oldOptions()),
    thunkActions: { ...newFuncObj },
  };

  const newStore: NewReturnType<T, A> = {
    ...mergeOptions,
  };

  return newStore;
}
