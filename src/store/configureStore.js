import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import reducer from "./projects";
import reducer from "./reducer";
import logger from "./middleware/logger";
// import func from "./middleware/func";
import errorCatch from "./middleware/errorCatch";
import api from "./middleware/api";

// getDefaultMiddleware returns an array of middlewares provided by redux toolkit like Thunk

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger({ destination: "Console" }),
      errorCatch,
      api,
    ],
  });
}
