import { useState } from 'react'
import { IonButton, IonContent, IonIcon, IonInput, IonLoading, IonPage, IonText, IonToast } from '@ionic/react'
import { carSport } from 'ionicons/icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authErrorMessage } from '../../helpers'
import styles from './Login.module.scss'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.hero}>
          <IonIcon icon={carSport} className={styles.logo} />
          <h1>UAO Ride</h1>
          <p>Comparte tu viaje a la universidad</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <IonInput
            label="Correo"
            labelPlacement="floating"
            fill="outline"
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value)}
            required
          />
          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            fill="outline"
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value)}
            required
          />
          <IonButton expand="block" type="submit" disabled={busy}>
            Iniciar sesión
          </IonButton>
          <IonText className={styles.alt}>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </IonText>
        </form>

        <IonLoading isOpen={busy} message="Ingresando..." />
        <IonToast isOpen={!!error} message={error} duration={3000} color="danger" onDidDismiss={() => setError('')} />
      </IonContent>
    </IonPage>
  )
}
