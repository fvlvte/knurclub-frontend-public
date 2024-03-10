import { createContext } from 'react'
import { Song } from '../UOKIK.ts'

const SongContext = createContext<Song | null>(null)
export default SongContext
