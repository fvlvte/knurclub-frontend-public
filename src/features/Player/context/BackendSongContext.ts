import { createContext } from 'react'
import { BackendSong } from '../types/WSShared.ts'

const BackendSongContext = createContext<BackendSong | null>(null)
export default BackendSongContext
