import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
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
      unsubProfile = onSnapshot(
        doc(db, 'users', firebaseUser.uid),
        (snap) => {
          const profile = snap.data() || {}
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: profile.name || firebaseUser.displayName || firebaseUser.email,
            role: profile.role || 'user',
            photo: profile.photo || null,
          })
          setLoading(false)
        },
        () => setLoading(false)
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

  const updateUser = (data) => updateDoc(doc(db, 'users', auth.currentUser.uid), data)

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
