import store from "./customStore";
import { bugAdded, bugRemoved } from "./actionCreator";

store.subscribe(() => {
  console.log("Store Changed");
});

store.disptach(bugAdded("Bug 1"));
store.disptach(bugAdded("Bug 2"));
store.disptach(bugRemoved(1));
console.log(store.getState());

// import store from "./store";
// import { bugAdded, bugRemoved, bugResolved } from "./actionCreator";

// const unsubscribe = store.subscribe(() => {
//   console.log("Store Changed", store.getState());
//   // This is where we do UI changes when state gets updated like if you are using Vanilla JS so we will do DOM stuff here or if you are using react so you will re-render your UI here.
// });

// store.dispatch(bugAdded("Bug 1"));
// store.dispatch(bugAdded("Bug 2"));

// store.dispatch(bugResolved(1));

// unsubscribe();
// store.dispatch(bugRemoved(1));

// console.log(store.getState());
