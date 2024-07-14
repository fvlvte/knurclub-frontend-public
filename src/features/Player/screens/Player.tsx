import { WebSocketWrapper } from '../wrappers/WebSocketWrapper.tsx'
import PlayerWrapper from '../wrappers/PlayerWrapper.tsx'
import React from 'react'

function Player() {
  return (
    <WebSocketWrapper>
      <PlayerWrapper />
    </WebSocketWrapper>
  )
}

const MemorizedPlayer = React.memo(Player)
export default MemorizedPlayer
