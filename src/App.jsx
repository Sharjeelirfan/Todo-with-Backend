import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const TodoList = () => {
  const BASE_URL = "https://todo-api-lyart.vercel.app";

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getTodo = async () => {
    const res = await axios(`${BASE_URL}/todos`);
    const todosFromServer = res?.data?.data;
    console.log(todosFromServer);
    setTodos(todosFromServer);
  };
  useEffect(() => {
    getTodo();
        const interval = setInterval(getTodo, 2000);
        return () => clearInterval(interval);

  }, []);

  // console.log(inputValue);

  const addTodo = async () => {
    if (inputValue.trim() !== "") {
      try {
        await axios.post(`${BASE_URL}/add-todo`, {
          todo: inputValue,
        });
        getTodo();
        setInputValue("");
      } catch (e) {
        console.error(e);
      }
    } else alert("Please enter the value");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl overflow-y-scroll max-h-[500px] shadow-xl w-96">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700">
          📝 To-Do List
        </h1>

        {/* Input Section */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* List Section */}
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
            >
              <span className="text-gray-800 font-medium">
                {index + 1}. {todo.todo}
              </span>
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition">
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
      </div>
    </div>
  );
};

export default TodoList;
