import { useEffect, useState } from 'react'

// Memoria local persistente (localStorage) con la misma API que useState
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [key, value])

  return [value, setValue]
}
