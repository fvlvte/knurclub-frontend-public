import { useEffect, useState } from 'react'

declare global {
  interface Window {
    navigation?: {
      addEventListener: (event: string, callback: () => void) => void
      removeEventListener: (event: string, callback: () => void) => void
    }
  }
}

const u = new URLSearchParams(window.location.search)
const INITIAL_TOKEN = u.get('token') ?? ''

export function useToken() {
  const [token, setToken] = useState(INITIAL_TOKEN)

  useEffect(() => {
    const onNavigation = () => {
      const u = new URLSearchParams(window.location.search)
      setToken(u.get('token') ?? '')
    }

    if (window.navigation && window.navigation.addEventListener) {
      window.navigation.addEventListener('navigate', onNavigation)
    } else {
      window.addEventListener('navigate', onNavigation)
    }

    return () => {
      if (window.navigation && window.navigation.removeEventListener) {
        window.navigation.removeEventListener('navigate', onNavigation)
      } else {
        window.removeEventListener('navigate', onNavigation)
      }
    }
  }, [])

  return token
}
