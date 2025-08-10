import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  isLoading: boolean;
  deletingIds: number[];
  updatingIds: number[];
  onDelete: (todoId: number) => void;
  onRename: (id: number, title: string) => void;
  onToggle: (id: number, completed: boolean) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  deletingIds,
  onDelete,
  isLoading,
  onToggle,
  onRename,
  updatingIds,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isLoading={
          isLoading ||
          deletingIds.includes(todo.id) ||
          updatingIds.includes(todo.id)
        }
        onDelete={() => onDelete(todo.id)}
        onToggle={completed => onToggle(todo.id, completed)}
        onRename={title => onRename(todo.id, title)}
      />
    ))}
  </section>
);
