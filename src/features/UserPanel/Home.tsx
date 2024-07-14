import { NavBar } from './NavBar.tsx'

import './Home.css'
import Footer from './Footer.tsx'
import { Logo } from './Logo.tsx'
import { ReactNode, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext.ts'

type HomeProps = {
  children?: ReactNode
}
export const Home = ({ children }: HomeProps) => {
  const authContext = useContext(AuthContext)

  const login = authContext?.login ?? (() => {})

  // TODO: napraw to kiedś bo to troche paentologia
  useEffect(() => {
    document.body.style.background = 'var(--bg-primary)'
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NavBar />
      <div className={'HomeContainer'}>
        {children && children}
        {!children && (
          <>
            <Logo
              style={{ display: 'block', paddingTop: '4rem', margin: 'auto' }}
              size={'20rem'}
            />
            <p className={'HomeSloganHeader'}>WITAJ W KNUR CLUB</p>
            <p className={'HomeSloganHeader HomeSloganSub'}>
              OPEN SOURCE ZESTAW STREAMERSKI
            </p>
            <p className={'HomeSloganHeader HomeSloganSub'}>
              TYLKO DLA PRAWDZIWYCH SIGM
            </p>
            <button
              className={'LoginButton'}
              onClick={() => {
                login()
              }}
            >
              ZALOGUJ
            </button>
          </>
        )}
        <Footer />
      </div>
    </div>
  )
}
