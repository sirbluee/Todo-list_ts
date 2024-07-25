import "./App.css";

import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoBeingEdited, setTodoBeingEdited] = useState<{
    id: number | null;
    text: string;
  }>({ id: null, text: "" });

  // add todo
  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  // mark completed
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // detele todo list
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // edit todo list
  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setTodoBeingEdited({ id: null, text: "" });
  };

  const handleEdit = (id: number, text: string) => {
    setTodoBeingEdited({ id, text });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-200">
      <div className="container bg-white rounded-sm shadow-lg mx-auto p-6 w-[800px] h-[600px] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <TodoForm
          addTodo={addTodo}
          editTodo={editTodo}
          todoBeingEdited={todoBeingEdited}
        />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
