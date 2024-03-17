import { OAuthHandler } from './components/OAuthHandler'
import PolakWidget from './components/PolakWidget'
import { Home } from './components/Home'
import { useNavigation } from './hooks/useNavigation'
import { V2WidgetWrapper } from './components/V2WidgetWrapper'
import { PersistentStore } from './util/PersistentStore'
import { HomeUser } from './components/HomeUser'
import Player from './components/player/Player.tsx'

const baseRegExp =
  /^https?:\/\/[a-zA-Z-0-9.]+:?[0-9]*([/A-Za-z0-9-_]+)\??(\S*)$/i

export const App = () => {
  const [path] = useNavigation()

  // Divine intervention.
  if (path.length > 2137)
    return <p>KURWO KASZTANIE REDOSERZE POGRZEB MI W SERZE</p>

  const token = PersistentStore.getKey('token')

  const matches = path.match(baseRegExp)
  if (!matches) return token ? <HomeUser /> : <Home />

  const [, route] = matches

  switch (route) {
    case '/v1/widget':
      return <PolakWidget />
    case '/oauth-flow':
      return <OAuthHandler />
    case '/v2/widget':
      return <V2WidgetWrapper />
    case '/new/player':
      return <Player />
    default:
      return token ? <HomeUser /> : <Home />
  }
}
