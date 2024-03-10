import { useContext } from 'react'
import SongContext from './context/SongContext.ts'

const Title = () => {
  const song = useContext(SongContext)

  const title =
    (song?.title || '').length > 20
      ? `${(song?.title || '').substring(0, 20)}...`
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
