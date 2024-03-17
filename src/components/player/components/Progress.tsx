import React, { useContext, useEffect, useState } from 'react'
import BackendSongContext from '../context/BackendSongContext.ts'
import AudioInfoContext from '../context/AudioInfoContext.ts'

const Progress = () => {
  const song = useContext(BackendSongContext)
  const audioInfo = useContext(AudioInfoContext)
  const [progressWidth, setProgressWidth] = useState(0)

  const calculateProgressBarWidth = () => {
    const currTime: number = audioInfo?.time.current ?? 0
    const maxTime: number = audioInfo?.time.duration ?? 0
    setProgressWidth((currTime / maxTime) * 100)
  }

  useEffect(() => {
    calculateProgressBarWidth()
  }, [audioInfo])

  const secToTime = (secIn: number) => {
    secIn = Math.round(secIn)
    const h: number = Math.floor(secIn / 3600)
    secIn -= Math.floor(h * 3600)
    const m: number = Math.floor(secIn / 60)
    secIn -= Math.floor(m * 60)
    const s: number = secIn
    const hString: string = h > 9 ? `${h}` : `0${h}`
    const mString: string = m > 9 ? `${m}` : `0${m}`
    const sString: string = s > 9 ? `${s}` : `0${s}`
    let timeString: string = ''
    timeString += h > 0 ? `${hString}:` : ''
    timeString += `${mString}:`
    timeString += `${sString}`

    return timeString
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: 'calc(0.5rem + (100vw - 800px) / 100)',
    alignSelf: 'stretch',
  }

  const timestampStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  }

  const timestampParagraphStyle = {
    color: 'var(--base-white, #FFF)',
    fontFamily: 'Inter',
    fontSize: 'calc(1.5rem + (100vw - 800px) / 100)',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  }

  const progressBarContainerStyle = {
    display: 'flex',
    height: 'calc(0.3125rem + (100vw - 800px) / 100)',
    width: '100%',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 'calc(0.25rem + (100vw - 800px) / 100)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }

  if (!song) {
    return null
  }

  return (
    <div className={'player-progress'} style={containerStyle}>
      <div className={'player-progress-timestamp'} style={timestampStyle}>
        <span style={timestampParagraphStyle}>
          {secToTime(audioInfo?.time.current ?? 0)}
        </span>
        <span style={timestampParagraphStyle}>
          {secToTime(audioInfo?.time.duration ?? 0)}
        </span>
      </div>
      <div
        className={'player-progress-bar-container'}
        style={progressBarContainerStyle}
      >
        <span
          className={'player-progress-bar-progress'}
          style={{
            height: 'calc(0.3125rem + (100vw - 800px) / 100)',
            backgroundColor: 'var(--base-white, #FFF)',
            width: `${progressWidth}%`,
          }}
        ></span>
      </div>
    </div>
  )
}

const MemorizedProgress = React.memo(Progress)
export default MemorizedProgress
