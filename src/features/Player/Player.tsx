import { WebSocketWrapper } from './wrappers/WebSocketWrapper.tsx'
import PlayerWrapper from './wrappers/PlayerWrapper.tsx'
import React, { useEffect } from 'react'

const u = new URLSearchParams(window.location.search)
const token = u.get('token') ?? ''

function Player() {
  useEffect(() => {
    const old = document.body.style.backgroundColor
    document.body.style.backgroundColor = 'transparent'
    return () => {
      document.body.style.backgroundColor = old
    }
  }, [])
  return (
    <WebSocketWrapper token={token}>
      <PlayerWrapper />
    </WebSocketWrapper>
  )
}

const MemorizedPlayer = React.memo(Player)
export default MemorizedPlayer
