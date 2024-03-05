import { MOCK_DATA } from './UOKIK.ts'
import Title from './Title.tsx'
import { Info } from './Info.tsx'
import Subtitle from './Subtitle.tsx'
import Progress from './Progress.tsx'

function Container() {
  const DATA = MOCK_DATA

  return (
    <div
      style={{
        display: 'flex',
        width: 'calc(100vw - (1.5rem + (100vw - 800px) / 100) - 2px)',
        minHeight: '266px',
        minWidth: '800px',
        height: 'calc(100vw / 3)',
        paddingRight: 'calc(1.5rem + (100vw - 800px) / 100)',
        alignItems: 'flex-end',
        gap: 'calc(3rem + (100vw - 800px) / 100)',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.47) 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'calc(100vw / 3)',
          height: 'calc(100vw / 3)',
          minHeight: '266px',
          minWidth: '266px',
          flexDirection: 'column',
          flexShrink: '0',
          borderRadius: 'calc(1.5rem + (100vw - 800px) / 100)',
          background: `lightgray 50% / cover no-repeat url(${DATA.playerIconSource})`,
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          height: 'calc((100vw / 3)*0.75)',
          padding: 'calc(2rem + (100vw - 800px) / 100) 0rem',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flex: '1 0 0',
        }}
      >
        <Title title={DATA.title} />
        <Subtitle content={DATA.subtitle} />
        <Info
          requesterName={DATA.user.name}
          pointsBalance={DATA.user.reputation}
          pointsDelta={0} // TODO: DODAC DANE
        />
        <Progress />
      </div>
    </div>
  )
}
export { Container }
