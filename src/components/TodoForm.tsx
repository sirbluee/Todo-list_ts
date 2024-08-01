import React, { useState, useEffect, useRef } from "react";

interface TodoFormProps {
  addTodo: (text: string) => void;
  editTodo: (id: number, text: string) => void;
  todoBeingEdited: { id: number | null; text: string };
}

const TodoForm: React.FC<TodoFormProps> = ({
  addTodo,
  editTodo,
  todoBeingEdited,
}) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoBeingEdited.id !== null) {
      setText(todoBeingEdited.text);
    } else {
      setText("");
    }
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
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
      setText("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter a new task"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded"
      >
        {todoBeingEdited.id !== null ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TodoForm;
