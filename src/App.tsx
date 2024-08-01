import "./App.css";
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoBeingEdited, setTodoBeingEdited] = useState<{
    id: number | null;
    text: string;
  }>({ id: null, text: "" });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        const tasksWithCompletion = data.map(
          (task: Omit<Todo, "completed">) => ({
            ...task,
            completed: task.completed ?? false,
          })
        );
        setTodos(tasksWithCompletion);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (task: string) => {
    const newTodo: Omit<Todo, "id"> = { task, completed: false };
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle todo completed status
  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      try {
        const updatedTodo = { ...todo, completed: !todo.completed };
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        });
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit todo
  const editTodo = async (id: number, newTask: string) => {
    try {
      const updatedTodo = { task: newTask };
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error("Failed to edit task");
      }
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task: newTask } : todo
        )
      );
      setTodoBeingEdited({ id: null, text: "" });
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Set the todo being edited
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
