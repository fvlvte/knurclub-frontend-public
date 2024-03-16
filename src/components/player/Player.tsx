import { WebSocketWrapper } from './WebSocketWrapper.tsx'
import PlayerWrapper from './PlayerWrapper.tsx'

const u = new URLSearchParams(window.location.search)
const token = u.get('token') ?? ''
export function Player() {
  return (
    <WebSocketWrapper token={token}>
      <PlayerWrapper />
    </WebSocketWrapper>
  )
}
