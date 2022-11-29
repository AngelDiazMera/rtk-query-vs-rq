import React, { useRef } from "react";
import {
  useQuery,
  useMutation,
  QueryClientProvider,
  QueryClient,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store, useCustomDispatch, useCustomSelector } from "./redux/store";
import { getTodosThunk } from "./redux/ThunkActions/Todos/getTodos";

import { deleteTodo, updateTodos, addTodo } from "./services/todos";

const queryClient = new QueryClient();

function TodoApp() {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  const dispatch = useCustomDispatch();

  const { data: todos, refetch } = useQuery({
    queryKey: "todos",
    queryFn: async () => await dispatch(getTodosThunk()),
    initialData: [],
  });

  const updateMutation = useMutation(updateTodos, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const createMutation = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const textRef = useRef<HTMLInputElement>(null);

  const { totalCount, totalDone, doneRatio } = useCustomSelector((state) => ({
    totalCount: state.todos.totalCount,
    totalDone: state.todos.totalDone,
    doneRatio: state.todos.doneRatio,
  }));

  return (
    <div className="App">
      <span>Total renders since last update: {renderCount.current}</span>
      <div className="todo-metrics">
        <span>Total count: {totalCount}</span>
        <span>Total done: {totalDone}</span>
        <span>Done ratio: {`${doneRatio.toFixed(2)}%`}</span>
      </div>

      <button
        onClick={() => {
          renderCount.current = 0;
          refetch();
        }}
      >
        Reload
      </button>

      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  renderCount.current = 0;
                  updateMutation.mutate({ ...todo, done: !todo.done });
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => {
                renderCount.current = 0;
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
            renderCount.current = 0;
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
