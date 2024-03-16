import { createContext } from 'react'
import { PlaybackInfo } from '../types/Common.ts'

const PlaybackInfoContext = createContext<PlaybackInfo | null>(null)
export default PlaybackInfoContext
