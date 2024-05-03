import { RxExit, RxLockClosed } from 'react-icons/rx'
import { LuMoon, LuSettings } from 'react-icons/lu'

import { Logo } from './Logo'
import './NavBar.css'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.ts'
import { RouterContext } from '../contexts/RouterContext.ts'
import { useColorTheme } from '../hooks/useColorTheme.ts'

export const NavBar = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext)
  const { navigate } = useContext(RouterContext)
  const { colorTheme, toggleColorTheme } = useColorTheme()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)',
          width: '1200px',
          height: '104px',
          borderRadius: '24px',
          marginTop: '20px',
          fontFamily: 'Inter, sans-serif',
          color: 'var(--text-primary)',
        }}
      >
        <Logo style={{ marginLeft: '24px' }} size="80px" />
        {isLoggedIn && (
          <div style={{ marginRight: '24px', display: 'flex' }}>
            <div
              onClick={() => navigate('/settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '32px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <LuSettings size="24px" style={{ marginRight: '9px' }} />
              Ustawienia
            </div>
            <div
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '32px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              <RxExit
                size="14px"
                style={{
                  marginRight: '9px',
                  color:
                    colorTheme === 'light' ? '#9D174D' : 'var(--text-primary)',
                }}
              />
              Wyloguj się
            </div>
            <div
              onClick={toggleColorTheme}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '32px',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              <LuMoon size="18px" />
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div style={{ marginRight: '24px', display: 'flex' }}>
            <div
              onClick={login}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '32px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <RxLockClosed
                size="14px"
                style={{ marginRight: '9px', color: '#9D174D' }}
              />
              Zaloguj się
            </div>
            {1 !== 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '32px',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                <LuMoon size="18px" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
