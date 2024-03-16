import { createContext } from 'react'
import { BackendSong } from '../hooks/useBackendSong.ts'

const BackendSongContext = createContext<BackendSong | null>(null)
export default BackendSongContext
