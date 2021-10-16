import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
  loadBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from "./store/api";

const store = configureStore();

console.log(loadBugs());

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(loadBugs());
}, 2000);

//Approach 2
// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugsReceived",
//   })
// );

// Approach 1
// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });

// store.dispatch((dispatch, getState) => {
//   // Call an API here
//   // When the promise is resolved => dispatch()
//   // If the promise is rejected => dispatch()
//   dispatch({ type: "bugReceived", bugs: [1, 2, 3] });
//   console.log(getState());
// });

// store.dispatch({
//   type: "error",
//   payload: { message: "OOPS!! An error occured" },
// });

// const unsubscribe = store.subscribe(() => {
//   console.log("Store Changed", store.getState());
//   // This is where we do UI changes when state gets updated like if you are using Vanilla JS so we will do DOM stuff here or if you are using react so you will re-render your UI here.
// });

// store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugAssignedToUser({ userId: 1, bugId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(projectAdded({ name: "Project 1" }));

// store.dispatch(bugResolved(1));

// unsubscribe();
// store.dispatch(bugRemoved(1));

// console.log(store.getState());
// console.log(getUnresolvedBugs(store.getState()));

// const bugsByUser = getBugsByUser(2)(store.getState());
// console.log(bugsByUser);

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
