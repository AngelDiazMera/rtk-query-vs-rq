import React, { useRef } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./hooks/api";
import { store, useCustomSelector } from "./redux/store";

const queryClient = new QueryClient();

function TodoApp() {
  const { data: todos, refetch } = useGetTodosQuery();
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();
  const createMutation = useCreateTodoMutation();

  const textRef = useRef<HTMLInputElement>(null);

  const { totalCount, totalDone, doneRatio } = useCustomSelector((state) => ({
    totalCount: state.todos.totalCount,
    totalDone: state.todos.totalDone,
    doneRatio: state.todos.doneRatio,
  }));

  return (
    <div className="App">
      <div className="todo-metrics">
        <span>Total count: {totalCount}</span>
        <span>Total done: {totalDone}</span>
        <span>Done ratio: {`${doneRatio.toFixed(2)}%`}</span>
      </div>

      <button onClick={() => refetch()}>Reload</button>

      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  updateMutation.mutate({ ...todo, done: !todo.done });
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => {
                deleteMutation.mutate(todo.id);
              }}
            >
              Delete
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button
          onClick={() => {
            createMutation.mutate(textRef.current!.value ?? "");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoApp />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
