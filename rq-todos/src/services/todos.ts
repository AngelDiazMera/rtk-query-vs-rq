import axios from "axios";
import type { AxiosError } from "axios";
import type { Todo } from "../interfaces";

const TODOS_BASE_URL = "http://localhost:4000/";

const TODOS_URLS = {
  base: () => `${TODOS_BASE_URL}todos`,
  byId: (id: number | string) => `${TODOS_BASE_URL}todos/${id}`,
};

export const getTodos = async () => {
  const url = TODOS_URLS.base();
  try {
    const result = await axios.get<Todo[]>(url);
    return result.data
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    throw err.message;
  }
};

export const addTodo = async (todoText: string) => {
  const url = TODOS_URLS.base();
  try {
    const result = await axios.post<Todo>(url, { text: todoText });
    return result.data
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    throw err.message;
  }
};

export const updateTodos = async (todo: Todo) => {
  const url = TODOS_URLS.byId(todo.id);
  try {
    const result = await axios.put<Todo>(url, todo);
    return result.data
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    throw err.message;
  }
};

export const deleteTodo = async (id: number) => {
  const url = TODOS_URLS.byId(id);
  try {
    const result = await axios.delete(url);
    return result.data
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    throw err.message;
  }
};
