import React, { useContext } from 'react'
import BackendSongContext from '../context/BackendSongContext.ts'
import Marquee from 'react-fast-marquee'

const Title = () => {
  const song = useContext(BackendSongContext)

  const title = song?.title

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
      <Marquee>{title}</Marquee>
    </p>
  )
}

const MemorizedTitle = React.memo(Title)
export default MemorizedTitle
