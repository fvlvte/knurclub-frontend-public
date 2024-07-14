import { default as axios } from 'axios'
import { Config } from '../../util/Config.ts'
import { useContext, useEffect } from 'react'
import { Home } from './Home.tsx'

import './OAuthHandler.css'
import { AuthContext } from '../../contexts/AuthContext.ts'
import { RouterContext } from '../../contexts/RouterContext.ts'

const getCodeFromURL = () => {
  const u = new URLSearchParams(window.location.search)
  return u.get('code')
}

export const OAuthHandler = () => {
  const { consumeSession, isLoggedIn } = useContext(AuthContext)
  const { navigate } = useContext(RouterContext)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
      return
    }
    const code = getCodeFromURL()
    if (code) {
      const backendUrl = Config.getBackendEndpoint()
      axios
        .get(
          `${backendUrl}/auth/login/twitch?authCode=${code}&redirectUrl=${encodeURIComponent(
            Config.getTwitchOAuthRedirectUrl()
          )}`
        )
        .then((d) => {
          consumeSession(d.data.token)
        })
        .catch(() => {
          navigate('/?error=true')
        })
    } else {
      navigate('/?error=true')
    }
  }, [])

  return (
    <Home>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginTop: '10rem' }} className="lds-heart">
          <div></div>
        </div>
      </div>
    </Home>
  )
}
