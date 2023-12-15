import { store } from "../../../redux/store/store";
import Bootstrap from "./bootstrap";

async function getData() {
  const res = await store.dispatch(store.thunkActions.fetchContent());
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  return res;
}

export default async function Page() {
  const data = await getData();
  console.log("data", data?.payload);
  return <Bootstrap data={data} />;
}
