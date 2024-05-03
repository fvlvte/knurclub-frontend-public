import { OAuthHandler } from './components/OAuthHandler'
import PolakWidget from './components/PolakWidget'
import { Home } from './components/Home'
import { useNavigation } from './hooks/useNavigation'
import { PersistentStore } from './util/PersistentStore'
import { HomeUser } from './components/HomeUser'
import Player from './components/player/Player.tsx'
import { AuthContext } from './contexts/AuthContext.ts'
import { RouterContext } from './contexts/RouterContext.ts'
import { useCallback, useEffect, useState } from 'react'
import { Config } from './Config.ts'
import {
  Features,
  TwitchHelixScopeHelper,
} from './util/TwitchHelixScopeHelper.ts'
import { Settings } from './components/Settings.tsx'
import { ColorThemeContextProvider } from './contexts/ColorThemeContext.tsx'

const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
  const scopes: Features[] = [Features.SONG_REQUEST, Features.SOUND_ALERTS]
  return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${TwitchHelixScopeHelper.getHelixScopesForFeature(
    scopes
  ).join('+')}`
}

export const App = () => {
  const { path, doNavigation, queryString } = useNavigation()

  const [token, setToken] = useState<string | null>(
    PersistentStore.getKey('token')
  )

  useEffect(() => {}, [path])

  const doLogin = () => {
    window.location.href = makeRedirectUrl(
      Config.getTwitchAppClientID(),
      Config.getTwitchOAuthRedirectUrl()
    )
  }

  const doLogout = () => {
    PersistentStore.removeKey('token')
    setToken(null)
    doNavigation('/')
  }

  const doConsumeSession = (session: string) => {
    setToken(session)
    PersistentStore.setKey('token', session)
    doNavigation('/')
  }

  const returnCurrentRoute = useCallback(() => {
    switch (path) {
      case '/v1/widget':
        return <PolakWidget />
      case '/oauth-flow':
        return <OAuthHandler />
      case '/settings':
        return (
          <Home>
            <Settings />
          </Home>
        )
      case '/new/player':
      case '/sr/widget':
        return <Player />
      default:
        return token ? <HomeUser /> : <Home />
    }
  }, [path, token])

  return (
    <ColorThemeContextProvider>
      <RouterContext.Provider
        value={{ navigate: doNavigation, currentPath: path, queryString }}
      >
        <AuthContext.Provider
          value={{
            consumeSession: doConsumeSession,
            isLoggedIn: token !== null,
            login: doLogin,
            logout: doLogout,
          }}
        >
          {returnCurrentRoute()}
        </AuthContext.Provider>
      </RouterContext.Provider>
    </ColorThemeContextProvider>
  )
}
