import { default as axios } from 'axios'
import { Config } from '../Config'
import { useEffect } from 'react'
import { V2SR } from './V2SR'

export const V2WidgetWrapper: React.FC = () => {
  const u = new URLSearchParams(window.location.search)
  const token = u.get('token')

  const backendUrl = Config.getNewBackendURL()

  // Keep alive handler.
  useEffect(() => {
    const interval = window.setInterval(() => {
      axios
        .get(`${backendUrl}/core/keep-alive`, {
          headers: { 'X-Knur-Key': token },
        })
        .then((d) => {
          console.log(d.data)
        })
        .catch((e) => console.error(e))
    }, 1000)
    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <>
      {!token && <h2>GOWNO NIE MA TOKENA AOK</h2>}
      {token && <V2SR token={token} />}
    </>
  )
}
