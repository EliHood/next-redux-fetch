## Next Redux Fetch

- Integrate Redux dispatch api actions into your existing Next JS project.

### Dev in Progress (still in beta, not ready for prod).

### To use

- `yarn add next-redux-fetch`

### Current flow might change

#### 1) Declare thunk functions

```typescript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await res.json();
    return data;
  },
);

export const fetchContent1 = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data;
  },
);
```

#### 2) import in `createReduxFetch`

```typescript
import { fetchContent } from "./thunkActions";
import { createReduxFetch } from "@mfe/next-redux-fetch";

export const store = createReduxFetch(
  { reducer: {} },
  {
    thunkActions: { fetchContent },
  },
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
....
```

#### 3) Declare `getData` callback as followed:

```typescript
import { store } from "../../../redux/store/store";
import Bootstrap from "./bootstrap";

async function getData() {
  const res = await store.dispatch(store.thunkActions.fetchContent());
  return res;
}

export default async function Page() {
  const data = await getData();
  return <Bootstrap data={data} />;
}
```

### Result

---

![Alt text](image.png)
