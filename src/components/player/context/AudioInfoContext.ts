import { createContext } from 'react'
import { AudioState } from '../components/Audio.tsx'

const AudioState = createContext<AudioState | null>(null)
export default AudioState
