import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'

export const TodoListContext = createContext()

const TodoListContextProvider = props => {
  const initalHistory = JSON.parse(localStorage.getItem('toDoHistory')) || [] // Check for history

  const [todos, setTodos] = useState([])
  const [history, setHistory] = useState(initalHistory)
  const [recording, setRecording] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)

  useEffect(() => { // Play recorded changes
    if (!playing) { return }

    setRecording(false)
    history.forEach((toDo, i) => {
      setTimeout(() => {
        setTodos(toDo)
        if (Object.is(history.length - 1, i)) {
          setPlaying(false)
        }
      }, 1000 * (i + 1))
    })
  }, [playing])

  useEffect(() => { // Record history of changes to todos
    if (!recording) { return }

    const newHistory = JSON.parse(JSON.stringify(history)) // make a deep clone
    newHistory.push(todos)
    localStorage.setItem('toDoHistory', JSON.stringify(newHistory))
    setHistory(newHistory)
  }, [todos])

  // Add toDo
  const addTodo = ({ description, name }) => {
    const newTodos = [...todos, {
      id: uuid(),
      description,
      name,
      createdAt: Date.now()
    }]
    setTodos(newTodos)
  }

  // Remove toDo
  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  // Select toDo
  const selectTodo = index => {
    setSelectedTodo(todos[index])
  }

  // Edit toDo
  const editTodo = ({ name, description, toDoId }) => {
    const newTodos = JSON.parse(JSON.stringify(todos)) // make a deep clone
    const index = newTodos.findIndex(({ id }) => id === toDoId)

    if (index < 0) { // check if selected todo has been deleted
      setSelectedTodo(null)
      return
    }

    newTodos[index].name = name
    newTodos[index].description = description
    setTodos(newTodos)
    setSelectedTodo(null)
  }

  // Clear Recording
  const clearActions = () => {
    setHistory([])
  }

  // Toggle Recording
  const recordActions = () => {
    if (!recording) {
      setHistory([])
    }
    setRecording(!recording)
  }

  // Play Recorded actions
  const playActions = () => {
    if (playing || !history.length) { return }
    setTodos([])
    setPlaying(true)
  }

  return (
    <TodoListContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        selectTodo,
        selectedTodo,
        editTodo,
        recordActions,
        recording,
        playing,
        playActions,
        clearActions
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  )
}

export default TodoListContextProvider
