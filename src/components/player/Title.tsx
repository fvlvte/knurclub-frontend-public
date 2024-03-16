import { useContext } from 'react'
import BackendSongContext from './context/BackendSongContext.ts'

const Title = () => {
  const song = useContext(BackendSongContext)

  const title =
    (song?.title || '').length > 15
      ? `${(song?.title || '').substring(0, 15)}...`
      : song?.title || ''

  return (
    <p
      style={{
        alignSelf: 'stretch',
        color: 'var(--base-white, #FFF)',
        fontFamily: 'Inter',
        fontSize: 'calc(4rem + (100vw - 800px) / 100)',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
      }}
    >
      {title}
    </p>
  )
}
export default Title
