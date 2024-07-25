import React, { useState, useEffect } from 'react';

interface TodoFormProps {
  addTodo: (text: string) => void;
  editTodo: (id: number, text: string) => void;
  todoBeingEdited: { id: number | null; text: string };
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, editTodo, todoBeingEdited }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (todoBeingEdited.id !== null) {
      setText(todoBeingEdited.text);
    } else {
      setText('');
    }
  }, [todoBeingEdited]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (todoBeingEdited.id !== null) {
        editTodo(todoBeingEdited.id, text);
      } else {
        addTodo(text);
      }
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter a new task"
      />
      <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded">
        {todoBeingEdited.id !== null ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;
