import { createApi } from "@reduxjs/toolkit/query/react";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodos,
} from "../../../services/todos";
import { extendedAxiosBaseQuery } from "../../../utils/baseQueries";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import type { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import type { Todo } from "../../../interfaces";
import { setTotalCount, setTotalDone } from "./todosSlice";

type ApiResponse<ReturnType> = MaybePromise<
  QueryReturnValue<ReturnType, FetchBaseQueryError, unknown>
>;

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: extendedAxiosBaseQuery(),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<Todo[], void>({
      queryFn: async (_args, { dispatch }, _extraOptions, baseQuery) => {
        const response = await baseQuery(getTodos);

        // You can dispatch any Redux actions from here
        if (Array.isArray(response.data)) {
          const doneTodos = response.data.filter((todo) => todo.done);

          dispatch(setTotalCount(response.data.length));
          dispatch(setTotalDone(doneTodos.length));
        }

        return response as ApiResponse<Todo[]>;
      },
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),

    addTodo: builder.mutation<string, string>({
      queryFn: async (todoText, _api, _extraOptions, baseQuery) => {
        const response = (await baseQuery(() =>
          addTodo(todoText)
        )) as ApiResponse<string>;

        return response;
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      queryFn: async (todo, _api, _extraOptions, baseQuery) => {
        const response = (await baseQuery(() =>
          updateTodos(todo)
        )) as ApiResponse<Todo>;

        return response;
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    deleteTodo: builder.mutation<Todo, Todo>({
      queryFn: async (todo, _api, _extraOptions, baseQuery) => {
        const response = (await baseQuery(() =>
          deleteTodo(todo.id)
        )) as ApiResponse<Todo>;

        return response;
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllQuery,
  useUpdateTodoMutation,
} = todoApi;
