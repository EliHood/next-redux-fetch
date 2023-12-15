import { fetchContent } from "./thunkActions";
import { createReduxFetch } from "../../../next-redux-fetch";

export const store = createReduxFetch({
  reducer: {},
  thunkActions: {
    fetchContent,
  },
});

// store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
