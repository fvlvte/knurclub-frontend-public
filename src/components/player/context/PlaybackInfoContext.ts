import { createContext } from 'react'
import { PlaybackInfo } from '../UOKIK.ts'

const PlaybackInfoContext = createContext<PlaybackInfo | null>(null)
export default PlaybackInfoContext
