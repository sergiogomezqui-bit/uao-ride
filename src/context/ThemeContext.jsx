import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useLocalStorage('uao-ride:dark', false)

  useEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', dark)
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggleDark: () => setDark((v) => !v) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
