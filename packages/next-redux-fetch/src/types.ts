import { ConfigureStoreOptions } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/dist/configureStore";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";

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

export type NewReturnType<T, Action> = ReduxReturnType<T> & {
  thunkActions: ApiMappedType<Action>;
};

export type OlderOptions<T, Action> = ReduxOptions<T> & {
  thunkActions: ApiMappedType<Action>;
};
