import { useContext } from 'react'
import { ColorThemeContext } from '../contexts/ColorThemeContext'

export function useColorTheme() {
  const value = useContext(ColorThemeContext)

  if (!value)
    throw new Error(
      'mordo prubujesz użyć `useColorTheme` spoza providera. pozdro poćwicz'
    )

  return value
}
