import React, { useContext } from 'react'
import { TodoListContext } from '../contexts/TodoListContext'
import Todo from './Todo'

function TodoList () {
  const { todos } = useContext(TodoListContext)

  return (
    <ul
      className='todo-list'
      data-testid='todo-list'
    >
      {todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
        />
      ))}
    </ul>
  )
}

export default TodoList
