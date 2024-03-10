import { createContext } from 'react'
import { AudioState } from '../AudioController.tsx'

const AudioState = createContext<AudioState | null>(null)
export default AudioState
