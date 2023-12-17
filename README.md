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
import { createReduxFetch } from "next-redux-fetch";

export const store = createReduxFetch(
  { reducer: {}  }, // add in the basic configure store props.
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

#### 3) Declare your client side component in a bootstrap file, or whatever name you prefer.

```typescript
"use client";

import dynamic from "next/dynamic";
import React from "react";

const Demo = dynamic(() => import("../../components/demo"), {
  ssr: false,
});

export default function Bootstrap({ data }: { data: Record<string, any> }) {
  return <Demo data={data} />;
}

```

#### 4) Declare `getData` callback as followed:

```typescript
import { store } from "../../../redux/store/store";
import Bootstrap from "./bootstrap";

async function getData() {
  const res = await store.dispatch(store.thunkActions.fetchContent());
  return res;
}

export default async function Page() {
  const data = await getData(); //  destructure data prop on the component your using it on e.g data?.payload.
  return <Bootstrap data={data} />;
}
```

### Result

---

![Alt text](image.png)
