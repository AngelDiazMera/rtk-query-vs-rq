import { combineReducers } from "redux";

import { todoApi } from "./Features/Todos/todosApiSlice";
import todos from "./Features/Todos/todosSlice";

// Pass all child reducers into this to create a combination of all reducers
const createRootReducer = () =>
  combineReducers({
    // Add the generated reducer as a specific top-level slice
    [todoApi.reducerPath]: todoApi.reducer,
    todos,
  });

export default createRootReducer;
