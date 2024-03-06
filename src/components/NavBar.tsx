import React from 'react'
import { RxExit } from 'react-icons/rx'
import { LuMoon } from 'react-icons/lu'
import { LuSettings } from 'react-icons/lu'

import { Logo } from './Logo'
import './NavBar.css'

export const NavBar: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        background: '#FCE7F3',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFF',
          width: '1200px',
          height: '104px',
          borderRadius: '24px',
          marginTop: '20px',
          fontFamily: 'Inter, sans-serif',
          color: '#500724',
        }}
      >
        <Logo style={{ marginLeft: '24px' }} size="80px" />
        <div style={{ marginRight: '24px', display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '32px',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            <LuSettings size="24px" style={{ marginRight: '9px' }} />
            Ustawienia
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '32px',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            <RxExit
              size="14px"
              style={{ marginRight: '9px', color: '#9D174D' }}
            />
            Wyloguj się
          </div>
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
        </div>
      </div>
    </div>
  )
}
