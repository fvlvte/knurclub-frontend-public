import React, { useState } from 'react'

const ContainerStyle: React.CSSProperties = {
  display: 'flex',
  padding: '32px',
  flexDirection: 'column',
  alignItems: 'center',
}

const GuideStyle: React.CSSProperties = {
  borderRadius: '12px',
  background: '#fff',
  width: '614px',
  gap: '32px',
  height: '510px',
}

const HeaderStyle: React.CSSProperties = {
  color: 'var(--text, #500724)',
  textAlign: 'center',

  paddingTop: '32px',
  paddingBottom: '32px',

  /* h4 */
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '28px',
  letterSpacing: '-0.1px',
}

const VideoContainerStyle: React.CSSProperties = {
  width: '550px',
  height: '274px',
  marginBottom: '32px',
  borderRadius: '8px',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const TooltipStyle: React.CSSProperties = {
  display: 'flex',
  width: '550px',
  padding: '16px 24px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  borderRadius: '8px',
  border: '1px solid var(--accent-foreground, #9D174D)',
  background: '#F3D8E7',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const TooltipTextStyle: React.CSSProperties = {
  color: '#500724',
  flex: '1 0 0',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '28px',
}

type SRGuideProps = {
  onCopyLink: () => void
}

export function SRGuide({ onCopyLink }: SRGuideProps) {
  const [showControls, setShowControls] = useState(false)
  return (
    <div style={ContainerStyle}>
      <div style={GuideStyle}>
        <h4 style={HeaderStyle}>Instalacja Song Requesta</h4>
        <div onClick={() => setShowControls(true)} style={VideoContainerStyle}>
          <video
            onEnded={() => setShowControls(false)}
            style={{ width: '100%', height: '100%' }}
            controls={showControls}
            src={
              'https://s3-figma-videos-production-sig.figma.com/video/1346230505111397410/TEAM/626c/535b/-1b41-4086-bbfd-fad9626e4476?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aoI16v~kTQx5Ja-r8lP02IftG5aKo4Fa51EDUt1AZELXmuc8k47cfeGCAU71aJqQYe06szjo4loGYsdpvzCzlVUgCfdFlIAHX04Kp2frZyCf8QPDp7lztZR~DN2itkIgZd4SqsKY91ds-e~WNTSOjsCbxe5ekNxepZtr4CFOshG5CCGyInd3FjRzHUWN42VdXL68u715YoFSU5s-6h4npFXiJuuEV2lvJtxYwDXuFFzyqFpHDEkHE9e6l-90xqcifCLPlPwUANWxGnKx-a8qn2y0orqTu9Mm-YSC1WquejMcnwOWTgGHWnn-x0ng4xB9n71JMqVcd1ZE37Aebkz0-Q__'
            }
          />
        </div>
        <div style={TooltipStyle}>
          <p style={TooltipTextStyle}>Pamiętaj, żeby zaznaczyć opcję</p>
          <p style={TooltipTextStyle}>
            <b>Control audio via OBS/Shutdown/Refresh do OBS</b>
          </p>
        </div>
        <button
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '64px',
            marginBottom: '64px',
          }}
          className={'LoginButton'}
          onClick={onCopyLink}
        >
          SKOPIUJ LINK DO OBS
        </button>
      </div>
    </div>
  )
}
