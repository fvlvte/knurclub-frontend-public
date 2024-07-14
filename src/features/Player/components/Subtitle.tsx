import React, { useContext } from 'react'
import BackendSongContext from '../context/BackendSongContext.ts'
import Marquee from 'react-fast-marquee'

const Subtitle = () => {
  const song = useContext(BackendSongContext)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'calc(0.5rem + (100vw - 800px) / 100)',
      }}
    >
      <p
        style={{
          color: 'rgba(255, 255, 255, 0.65)',
          fontFamily: 'Inter',
          fontSize: 'calc(2rem + (100vw - 800px) / 100)',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        <Marquee>{song?.subtitle}</Marquee>
      </p>
    </div>
  )
}

const MemorizedSubtitle = React.memo(Subtitle)
export default MemorizedSubtitle
