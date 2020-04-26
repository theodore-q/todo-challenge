import React, { useContext } from 'react'
import { TodoListContext } from '../contexts/TodoListContext'
import prettyDate from '../utils/dateFormatter'

function Todo ({ todo, index }) {
  const { selectTodo, removeTodo } = useContext(TodoListContext)

  return (
    <li className='todo'>
      <div className='todo-content'>
        <div className='todo-content__name'>
          {todo.name}
        </div>
        <div className='todo-content__value'>
          {todo.description}
        </div>
        <div className='todo-content__created-at'>
          Created At:{prettyDate(todo.createdAt)}
        </div>
      </div>
      <div className='todo__controls'>
        <div className='btn' onClick={() => selectTodo(index)}>Update</div>
        <div className='btn' onClick={() => removeTodo(index)}>x</div>
      </div>
    </li>
  )
}

export default Todo
