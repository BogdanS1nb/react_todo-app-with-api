/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  isLoading: boolean;
  onDelete: () => void;
  onToggle: (completed: boolean) => void;
  onRename: (title: string) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  isLoading,
  onDelete,
  onToggle,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = editTitle.trim();

    setIsEditing(false);

    if (!trimmed) {
      onDelete();

      return;
    }

    if (trimmed !== todo.title) {
      onRename(trimmed);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>

      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(!todo.completed)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={editRef}
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleSubmit}
            className="todo__title-field"
            data-cy="TodoTitleField"
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={onDelete}
          disabled={isLoading}
        >
          ×
        </button>
      )}
    </div>
  );
};
