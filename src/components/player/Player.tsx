import { WebSocketWrapper } from './wrappers/WebSocketWrapper.tsx'
import PlayerWrapper from './wrappers/PlayerWrapper.tsx'
import React from 'react'

const u = new URLSearchParams(window.location.search)
const token = u.get('token') ?? ''
function Player() {
  return (
    <WebSocketWrapper token={token}>
      <PlayerWrapper />
    </WebSocketWrapper>
  )
}

const MemorizedPlayer = React.memo(Player)
export default MemorizedPlayer
