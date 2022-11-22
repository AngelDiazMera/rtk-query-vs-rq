import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getTodos } from "../../../services/todos";
import { setTotalCount, setTotalDone } from "../../Features/Todos/todosSlice";
import { RootState } from "../../store";

export const getTodosThunk = () => async (dispatch: ThunkDispatch<RootState, null, AnyAction>) => {
    const response = await getTodos();

    // You can dispatch any Redux actions from here
    if (Array.isArray(response)) {
      const doneTodos = response.filter((todo) => todo.done);

      dispatch(setTotalCount(response.length));
      dispatch(setTotalDone(doneTodos.length));
    }
    return response;
  }