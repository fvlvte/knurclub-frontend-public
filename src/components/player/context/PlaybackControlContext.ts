import { createContext } from 'react'
import { PlaybackControl } from '../types/WSShared.ts'

const PlaybackControlContext = createContext<PlaybackControl | null>(null)
export default PlaybackControlContext
