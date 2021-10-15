/* --- Middleware to dipatch a function from action, because by default Redux expect 
       an action to be plain object with a key "type" 
   --- We dispatch a function from action to perform async work like calling an API. 
   --- We don't have to create this middleware from scratch we have already has a middleware,
       which is "Thunk". In Redux Toolkit we get "Thunk" otherwise we have to manually install "thunk"   
*/

const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch, getState);
    } else {
      next(action);
    }
  };

export default func;
