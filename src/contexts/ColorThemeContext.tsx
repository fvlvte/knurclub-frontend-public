import { createContext, useEffect, useState } from 'react'
import { PersistentStore } from '../util/PersistentStore'

const THEMES = ['dark', 'light'] as const
const DEFAULT_THEME = 'light'

type ColorTheme = (typeof THEMES)[number]

const THEME_STORAGE_KEY = 'colorTheme'

type ColorThemeContextType = {
  colorTheme: ColorTheme
  toggleColorTheme: () => void
}

export const ColorThemeContext = createContext<ColorThemeContextType | null>(
  null
)

export const ColorThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const persistedTheme = PersistentStore.getKey(THEME_STORAGE_KEY)
    if (THEMES.includes(persistedTheme as ColorTheme)) {
      return persistedTheme as ColorTheme
    }
    return DEFAULT_THEME
  })

  const toggleColorTheme = () => {
    const newTheme = colorTheme === 'dark' ? 'light' : 'dark'
    PersistentStore.setKey(THEME_STORAGE_KEY, newTheme)
    setColorTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.className = colorTheme
  }, [colorTheme])

  const contextValue = { colorTheme, toggleColorTheme }

  return (
    <ColorThemeContext.Provider value={contextValue}>
      {children}
    </ColorThemeContext.Provider>
  )
}
