import { createContext } from 'react'
import { BackendSong } from '../hooks/useBackendSong.ts'

const SongContext = createContext<BackendSong | null>(null)
export default SongContext
