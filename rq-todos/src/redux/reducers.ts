import { combineReducers } from "redux";

import todos from "./Features/Todos/todosSlice";

// Pass all child reducers into this to create a combination of all reducers
const createRootReducer = () =>
  combineReducers({
    todos,
  });

export default createRootReducer;
