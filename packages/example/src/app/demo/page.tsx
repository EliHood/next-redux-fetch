import { store } from "../../../redux/store/store";
import Bootstrap from "./bootstrap";

async function getData() {
  const res = await store.dispatch(store.thunkActions.fetchContent());

  return res;
}

export default async function Page() {
  const data = await getData();
  console.log("data", data?.payload);
  return <Bootstrap data={data} />;
}
