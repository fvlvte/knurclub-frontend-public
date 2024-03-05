type InfoProps = {
  requesterName: string
  pointsBalance: number
  pointsDelta: number
}
function Info({ requesterName, pointsBalance, pointsDelta }: InfoProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'calc(0.75rem + (100vw - 800px) / 100)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'calc(0.75rem + (100vw - 800px) / 100)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(0.25rem + (100vw - 800px) / 100)',
          }}
        >
          <div
            style={{
              width: 'calc(2.975rem + (100vw - 800px) / 100)',
              height: 'calc(2.75rem + (100vw - 800px) / 100)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 49"
              fill="none"
            >
              <path
                d="M24.0006 26.6667C29.5234 26.6667 34.0006 22.1895 34.0006 16.6667C34.0006 11.1438 29.5234 6.66667 24.0006 6.66667C18.4777 6.66667 14.0006 11.1438 14.0006 16.6667C14.0006 22.1895 18.4777 26.6667 24.0006 26.6667Z"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.0006 42.6664C40.0006 38.4229 38.3149 34.3533 35.3143 31.3527C32.3137 28.3521 28.244 26.6664 24.0006 26.6664C19.7571 26.6664 15.6874 28.3521 12.6869 31.3527C9.68627 34.3533 8.00056 38.4229 8.00056 42.6664"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p
            style={{
              color: 'var(--base-white, #FFF)',
              fontFamily: 'Inter',
              fontSize: 'calc(1.5rem + (100vw - 800px) / 100)',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
            }}
          >
            {requesterName}
          </p>

          <PointsBalance balance={pointsBalance} />
          <PointsDelta delta={pointsDelta} />
        </div>
      </div>
    </div>
  )
}

type PointsBalanceProps = {
  balance: number
}

function PointsBalance({ balance }: PointsBalanceProps) {
  const balanceStyles = {
    display: 'flex',
    padding:
      'calc(0.5rem + (100vw - 800px) / 100) calc(0.75rem + (100vw - 800px) / 100)',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'calc(0.625rem + (100vw - 800px) / 100)',
    borderRadius: 'calc(1.5rem + (100vw - 800px) / 100)',
    border:
      balance < 0
        ? '1px solid var(--red-500, #EF4444)'
        : '1px solid var(--red-500, #22C55E)',
    background: 'rgba(127, 29, 29, 0.10)',
  }

  return (
    <div style={balanceStyles}>
      <p
        style={{
          color: 'var(--base-white, #FFF)',
          fontFamily: 'Inter',
          fontSize: 'calc(1.5rem + (100vw - 800px) / 100)',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }}
      >
        {balance}
      </p>
    </div>
  )
}

type PointsDeltaProps = {
  delta: number
}

function PointsDelta({ delta }: PointsDeltaProps) {
  const deltaStyles = {
    color: 'var(--base-white, #FFF)',
    fontFamily: 'Inter',
    fontSize: 'calc(1.5rem + (100vw - 800px) / 100)',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  }

  return (
    <p style={deltaStyles}>
      {delta < 0 ? '-' : '+'}
      {delta}
    </p>
  )
}

export { Info }
