import React, { useContext } from 'react'
import { TodoListContext } from '../contexts/TodoListContext'

function HistoryPlayer () {
  const { recording, playing, recordActions, playActions, clearActions } = useContext(TodoListContext)
  return (
    <div className='recording-controller'>
      <div className='recording-controller__dialog'>
        {recording ? '🔴 Now Recording' : <span>&nbsp;</span>}
      </div>
      <div className='recording-controller__controls'>
        <div className='btn' onClick={() => recordActions()}>
          {recording ? 'Stop Recording' : 'Record'}
        </div>
        <div className='btn' onClick={() => playActions()}>{playing ? 'Playing' : 'Play Recording'}</div>
        <div className='btn' onClick={() => clearActions()}>Clear Recording</div>
      </div>
    </div>
  )
}

export default HistoryPlayer
