// Funciones generales reutilizables en toda la app

export const UAO_CENTER = { lat: 3.3535, lng: -76.5236 } // Campus UAO, Cali

export function formatDate(value) {
  if (!value) return ''
  const date = value?.toDate ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(value) {
  if (!value) return ''
  const date = value?.toDate ? value.toDate() : new Date(value)
  return date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
}

export function formatPrice(value) {
  return Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  })
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

// Distancia en km entre dos coordenadas (formula de Haversine)
export function distanceKm(a, b) {
  const rad = (deg) => (deg * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

export function authErrorMessage(error) {
  const messages = {
    'auth/invalid-credential': 'Correo o contraseña incorrectos',
    'auth/user-not-found': 'No existe una cuenta con ese correo',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/email-already-in-use': 'Ese correo ya está registrado',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/invalid-email': 'El correo no es válido',
    'auth/too-many-requests': 'Demasiados intentos, intenta más tarde',
    'auth/network-request-failed': 'Sin conexión a internet',
  }
  return messages[error?.code] || 'Ocurrió un error, intenta de nuevo'
}
