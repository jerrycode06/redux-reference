import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed", store.getState());
  // This is where we do UI changes when state gets updated like if you are using Vanilla JS so we will do DOM stuff here or if you are using react so you will re-render your UI here.
});

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(projectAdded({ name: "Project 1" }));

// store.dispatch(bugResolved(1));

// unsubscribe();
// store.dispatch(bugRemoved(1));

console.log(store.getState());
console.log(getUnresolvedBugs(store.getState()));

// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());
// console.log(x === y);

// import store from "./customStore";
// import { bugAdded, bugRemoved } from "./actionCreator";

// store.subscribe(() => {
//   console.log("Store Changed");
// });

// store.disptach(bugAdded("Bug 1"));
// store.disptach(bugAdded("Bug 2"));
// store.disptach(bugRemoved(1));
// console.log(store.getState());
