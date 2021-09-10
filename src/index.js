import store from "./store";
import { bugAdded, bugRemoved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed", store.getState());
  // This is where we do UI changes when state gets updated like if you are using Vanilla JS so we will do DOM stuff here or if you are using react so you will re-render your UI here.
});

store.dispatch(bugAdded("Bug 1"));

unsubscribe();

store.dispatch(bugRemoved(1));

console.log(store.getState());
