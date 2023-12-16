import {
  ConfigureStoreOptions,
  EnhancedStore,
  AsyncThunk,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
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

export type OlderOptions<T, Action> = ReduxOptions<T> & {
  thunkActions: ApiMappedType<Action>;
};

export type MappedConfigureStore<T> = {
  [field in keyof ConfigureStoreOptions<T>]: ConfigureStoreOptions[field];
};

export type NewReturnType<T, Action> = Omit<ReduxReturnType<T>, "dispatch"> & {
  thunkActions: ApiMappedType<Action>;
  dispatch: ThunkDispatch<any, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
};
