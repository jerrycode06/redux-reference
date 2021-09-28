import reducer from "./reducer";

function createStore(reducer) {
  let state;
  let listeners = [];

  function disptach(action) {
    state = reducer(state, action);

    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function getState() {
    return state;
  }

  return {
    getState,
    disptach,
    subscribe,
  };
}

export default createStore(reducer);
