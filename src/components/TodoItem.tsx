import React from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  handleEdit: (id: number, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, handleEdit }) => {
  return (
    <li className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center">
        <input
          id={`checkbox-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span
          onClick={() => toggleTodo(todo.id)}
          className={`ml-2 cursor-pointer ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.task}
        </span>
      </div>
      <div className=" flex gap-2">
        <button
          onClick={() => handleEdit(todo.id, todo.task)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
