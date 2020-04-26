import React, { useRef, useState, useEffect, useContext } from 'react'
import { TodoListContext } from '../contexts/TodoListContext'

function TodoForm () {
  const { addTodo, editTodo, selectedTodo } = useContext(TodoListContext)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    if (selectedTodo) {
      setDescription(selectedTodo.description)
      setName(selectedTodo.name)
      inputRef.current.focus() // when selecting todo focus TodoForm input
    } else {
      setDescription('')
    }
  }, [selectedTodo])

  const handleSubmit = e => {
    e.preventDefault()
    if (!description || !name) { return }
    if (!selectedTodo) {
      addTodo({ description, name })
    } else {
      editTodo({
        description,
        name,
        toDoId: selectedTodo.id
      })
    }
    setDescription('')
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type='text'
        className='input'
        data-testid='name-input'
        value={name}
        placeholder='Enter task name'
        onChange={e => setName(e.target.value)}
      />

      <input
        type='text'
        className='input'
        data-testid='todo-input'
        value={description}
        placeholder='Enter task description...'
        ref={inputRef}
        onChange={e => setDescription(e.target.value)}
      />
      <div
        onClick={handleSubmit}
        data-testid='todo-submit'
        className='btn submit'
      >
        {selectedTodo ? 'Update Task' : 'Add New Task'}
      </div>
    </form>
  )
}

export default TodoForm
