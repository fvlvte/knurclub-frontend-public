import { OAuthHandler } from './features/UserPanel/OAuthHandler.tsx'
import PolakWidget from './features/Widget/PolakWidget.tsx'
import { Home } from './features/UserPanel/Home.tsx'
import { useNavigation } from './hooks/useNavigation.tsx'
import { PersistentStore } from './util/PersistentStore.ts'
import { HomeUser } from './features/UserPanel/HomeUser.tsx'
import Player from './features/Player/screens/Player.tsx'
import { AuthContext } from './contexts/AuthContext.ts'
import { RouterContext } from './contexts/RouterContext.ts'
import { useCallback, useEffect, useState } from 'react'
import { Config } from './util/Config.ts'
import {
  Features,
  TwitchHelixScopeHelper,
} from './util/TwitchHelixScopeHelper.ts'
import { Settings } from './features/UserPanel/Settings.tsx'
import { ColorThemeContextProvider } from './contexts/ColorThemeContext.tsx'
import { Wulkanizator } from './features/Wulkanizator/Wulkanizator.tsx'
import TournamentView from './features/Widget/TournamentView.tsx'

const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
  const scopes: Features[] = [Features.ALL]
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
      case '/wulkanizator':
        return <Wulkanizator />
      case '/knurniej':
        return <TournamentView />
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
