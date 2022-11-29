import React, { useCallback, useRef } from "react";

import {
  useGetAllQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useAddTodoMutation,
} from "./redux/Features/Todos/todosApiSlice";
import type { Todo } from "./interfaces";
import { Provider } from "react-redux";
import { store, useCustomSelector } from "./redux/store";

function TodoApp() {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  const { data: todos, refetch } = useGetAllQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const { totalCount, totalDone, doneRatio } = useCustomSelector((state) => ({
    totalCount: state.todos.totalCount,
    totalDone: state.todos.totalDone,
    doneRatio: state.todos.doneRatio,
  }));

  const textRef = useRef<HTMLInputElement>(null);
  const onAdd = useCallback(() => {
    addTodo(textRef.current!.value ?? "");
    textRef.current!.value = "";
  }, [addTodo]);

  const onToggle = useCallback(
    (todo: Todo) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);

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
                  onToggle(todo);
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => {
                renderCount.current = 0;
                onDelete(todo);
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
            onAdd();
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
      <TodoApp />
    </Provider>
  );
}

export default App;
