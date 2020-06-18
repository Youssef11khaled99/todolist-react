import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { uuid } from 'uuidv4';

const LOCAL_STORAGE_KEY = 'todoaApp.todos'

function App() {
  const [todos, setTodos] = useState([{id: 1, name: 'Todo 1', completed: false}, {id: 2, name: 'Todo 2', completed: true }]);
  const todoNameRef = useRef();
  
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos( prevTodos => {
      return [...prevTodos, {id: uuid(), name: name, completed: false}]
    })
    todoNameRef.current.value = null;
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList toggleTodo = {toggleTodo} todos = { todos }/>
      <input ref = {todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add to Todo</button>
      <button onClick={handleClearTodos}>Clear completed Todos</button>
      <div>{todos.filter( todo => !todo.completed).length} left to do</div>


    </>
  )
}

export default App;
