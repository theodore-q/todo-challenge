import React from 'react'
import './App.scss'

import TodoForm from './js/components/TodoForm'
import HistoryPlayer from './js/components/HistoryPlayer'
import TodoList from './js/components/TodoList'
import TodoListContextProvider from './js/contexts/TodoListContext'

function App () {
  return (
    <TodoListContextProvider>
      <div className='app'>
        <h1>To-Do List Challenge</h1>
        <HistoryPlayer />
        <TodoForm />
        <TodoList />
      </div>
    </TodoListContextProvider>
  )
}

export default App
