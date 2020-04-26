import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// renders something
test('renders page', () => {
  const { getByText } = render(<App />)
  const title = getByText(/To-Do List Challenge/i)
  expect(title)
})

// renders something
test('updates input', async () => {
  const { getByTestId } = render(<App />)
  const todoInputElement = getByTestId('todo-input')
  await userEvent.type(todoInputElement, 'Test Todo')
  expect(todoInputElement.value).toBe('Test Todo')
})

test('adds a new todo item', async () => {
  const { getByTestId } = render(<App />)
  const todoInputElement = getByTestId('todo-input')
  const nameInputElement = getByTestId('name-input')
  const todoList = getByTestId('todo-list')
  
  await userEvent.type(nameInputElement, 'Test Name')
  const submitButton = getByTestId('todo-submit')

  await userEvent.type(todoInputElement, 'Test Todo')
  fireEvent.click(submitButton)

  expect(todoList.children.length).toBe(1)
})

test('Removes todo item', async () => {
  const { getByText, getByTestId } = render(<App />)
  const todoInputElement = getByTestId('todo-input')
  const nameInputElement = getByTestId('name-input')
  const todoList = getByTestId('todo-list')
  const submitButton = getByTestId('todo-submit')

  await userEvent.type(nameInputElement, 'Test Name')
  await userEvent.type(todoInputElement, 'Test Todo')
  fireEvent.click(submitButton)

  const deleteBtn = getByText('x')
  fireEvent.click(deleteBtn)

  expect(todoList.children.length).toBe(0)
})

test('adds and updates item', async () => {
  const { getByText, getByTestId } = render(<App />)
  const todoInputElement = getByTestId('todo-input')
  const nameInputElement = getByTestId('name-input')
  const todoList = getByTestId('todo-list')
  const submitButton = getByTestId('todo-submit')

  await userEvent.type(nameInputElement, 'Test Name')
  await userEvent.type(todoInputElement, 'Test Todo')
  fireEvent.click(submitButton)

  const updateBtn = getByText('Update')
  fireEvent.click(updateBtn)

  await userEvent.type(todoInputElement, ' Updated Todo')
  fireEvent.click(submitButton)

  expect(todoList.children.length).toBe(1)
  expect(screen.getByText('Test Todo Updated Todo'))
})

test('records adds todo updates and replays', async () => {
  const { getByText, getByTestId } = render(<App />)
  const todoInputElement = getByTestId('todo-input')
  const nameInputElement = getByTestId('name-input')
  const todoList = getByTestId('todo-list')
  const submitButton = getByTestId('todo-submit')
  const recordBtn = getByText('Record')
  const playBtn = getByText('Play Recording')
  fireEvent.click(recordBtn)

  await userEvent.type(nameInputElement, 'Test Name')
  await userEvent.type(todoInputElement, 'Test Todo')
  fireEvent.click(submitButton)

  const updateBtn = getByText('Update')
  fireEvent.click(updateBtn)

  await userEvent.type(todoInputElement, ' Updated Todo')
  fireEvent.click(submitButton)

  expect(todoList.children.length).toBe(1)
  expect(screen.getByText('Test Todo Updated Todo'))
  fireEvent.click(recordBtn)
  fireEvent.click(playBtn)

  expect(todoList.children.length).toBe(0)
  const firstStep = await waitFor(() => screen.getByText('Test Todo'), { timeout: 1500 })
  expect(firstStep)

  const secondStep = await waitFor(() => screen.getByText('Test Todo Updated Todo'), { timeout: 1500 })
  expect(secondStep)
})
