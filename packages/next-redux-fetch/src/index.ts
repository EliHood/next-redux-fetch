import { configureStore } from "@reduxjs/toolkit";
import { memoize } from "lodash";
import {
  ApiMappedType,
  MappedConfigureStore,
  NewReturnType,
  OlderOptions,
} from "./types";

/**
 *
 * @param newOptions
 * @returns
 */

export function createReduxFetch<T, A>(
  store: MappedConfigureStore<typeof configureStore>,
  newOptions?: Pick<OlderOptions<T, A>, "thunkActions">,
): NewReturnType<T, A> {
  const copyStore = configureStore;
  const thunkActions = newOptions?.thunkActions;

  if (!thunkActions) {
    return;
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
