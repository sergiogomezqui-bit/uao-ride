import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubProfile = () => {}

    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      unsubProfile()
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }
      // El perfil (rol, foto) vive en Firestore y se escucha en tiempo real
      const fromAuth = (profile = {}) => ({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: profile.name || firebaseUser.displayName || firebaseUser.email,
        role: profile.role || 'user',
        photo: profile.photo || null,
      })

      unsubProfile = onSnapshot(
        doc(db, 'users', firebaseUser.uid),
        (snap) => {
          setUser(fromAuth(snap.data()))
          setLoading(false)
          // Auto-reparacion: si el perfil no existe (registro interrumpido), se crea
          if (!snap.exists() && !snap.metadata.fromCache) {
            setDoc(snap.ref, {
              name: firebaseUser.displayName || firebaseUser.email,
              email: firebaseUser.email,
              role: 'user',
              photo: null,
              createdAt: serverTimestamp(),
            }).catch((err) => console.error('No se pudo crear el perfil:', err))
          }
        },
        (err) => {
          // Aunque Firestore falle, la sesion de Auth sigue siendo valida
          console.error('Error leyendo el perfil:', err)
          setUser(fromAuth())
          setLoading(false)
        }
      )
    })

    return () => {
      unsubProfile()
      unsubAuth()
    }
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const register = async ({ name, email, password }) => {
    const { user: created } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(created, { displayName: name })
    await setDoc(doc(db, 'users', created.uid), {
      name,
      email,
      role: 'user',
      photo: null,
      createdAt: serverTimestamp(),
    })
  }

  const logout = () => signOut(auth)

  // merge: crea el documento si no existia y nunca pisa el rol
  const updateUser = async (data) => {
    await setDoc(doc(db, 'users', auth.currentUser.uid), data, { merge: true })
    if (data.name) await updateProfile(auth.currentUser, { displayName: data.name })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
