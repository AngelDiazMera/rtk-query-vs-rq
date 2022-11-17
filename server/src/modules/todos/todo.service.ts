import { Todo } from './todos.dto';

let todos: Todo[] = [
    'NestJS',
    'GraphQL',
    'Apollo',
    'TypeScript',
    'React',
    'Redux',
    'React Query',
    'Angular',
    'Vue',
    'D3',
    'Svelte',
    'SolidJS',
    'NextJS',
    'AWS',
  ].map((text, index) => ({
    id: index + 1,
    text: `Learn ${text}`,
    active: true,
    done: false,
  }));

export class TodoService {
  findAll(): Todo[] {
    return todos.filter(({ active }) => active);
  }

  findOneById(id: number): Todo {
    return todos.find((todo) => todo.id === id);
  }

  create(text: string): Todo {
    const todo = {
      id: todos.length + 1,
      text,
      active: true,
      done: false,
    };
    todos.push(todo);
    return todo;
  }

  updateOneById(id: number, data: Todo): Todo {
    todos = todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo));

    return data;
  }

  deleteOneById(id: number): number {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, active: false } : todo,
    );
    return id;
  }
}
