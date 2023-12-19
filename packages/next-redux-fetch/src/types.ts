import {
  ConfigureStoreOptions,
  EnhancedStore,
  AsyncThunk,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export type ApiMappedType<T> = {
  // eslint-disable-next-line no-unused-vars
  [field in keyof T]: AsyncThunk<any, void, AsyncThunkConfig>;
};

export type ReduxOptions<T> = {
  [field in keyof ConfigureStoreOptions<T>]: ConfigureStoreOptions[field];
};

export type ReduxReturnType<T> = {
  [newfield in keyof EnhancedStore<T>]: EnhancedStore[newfield];
};

export type ThunkActions<Action> = { thunkActions: ApiMappedType<Action> };

export type NewReduxOptions<T, Action> = ReduxOptions<T> & ThunkActions<Action>;

export type MappedConfigureStore<T> = {
  [field in keyof ConfigureStoreOptions<T>]: ConfigureStoreOptions[field];
};

export type NewDispatchType = {
  dispatch: ThunkDispatch<any, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
};

export type NewReturnType<T> = Omit<ReduxReturnType<T>, "dispatch"> &
  NewDispatchType;

export type HasThunkActions<T> = T extends { thunkActions: infer A }
  ? A extends {
      [K in keyof A]: A[K] extends AsyncThunk<any, void, AsyncThunkConfig>
        ? A[K]
        : never;
    }
    ? T
    : never
  : ReturnType<typeof configureStore>;
