import { QueryClient, useMutation, useQuery } from "react-query";
import { useCustomDispatch } from "../redux/store";
import { getTodosThunk } from "../redux/ThunkActions/Todos/getTodos";
import { addTodo, deleteTodo, updateTodos } from "../services/todos";

const queryClient = new QueryClient();

const invalidateTodoQuery = () => queryClient.invalidateQueries("todos");

const commonMutationOptions = {
  onSuccess: invalidateTodoQuery,
};

export const useGetTodosQuery = () => {
  const dispatch = useCustomDispatch();

  return useQuery({
    queryKey: "todos",
    queryFn: async () => await dispatch(getTodosThunk()),
    initialData: [],
  });
};

export const useUpdateTodoMutation = () => {
  return useMutation(updateTodos, commonMutationOptions);
};

export const useDeleteTodoMutation = () => {
  return useMutation(deleteTodo, commonMutationOptions);
};

export const useCreateTodoMutation = () => {
  return useMutation(addTodo, commonMutationOptions);
};
