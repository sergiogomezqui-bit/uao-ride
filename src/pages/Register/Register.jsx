import { useState } from 'react'
import { IonButton, IonContent, IonIcon, IonInput, IonLoading, IonPage, IonText, IonToast } from '@ionic/react'
import { personAdd } from 'ionicons/icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authErrorMessage } from '../../helpers'
import styles from './Register.module.scss'

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm({ ...form, [field]: e.detail.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    setBusy(true)
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password })
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
          <IonIcon icon={personAdd} className={styles.logo} />
          <h1>Crear cuenta</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <IonInput label="Nombre completo" labelPlacement="floating" fill="outline" value={form.name} onIonInput={set('name')} required />
          <IonInput label="Correo" labelPlacement="floating" fill="outline" type="email" value={form.email} onIonInput={set('email')} required />
          <IonInput label="Contraseña" labelPlacement="floating" fill="outline" type="password" value={form.password} onIonInput={set('password')} required />
          <IonInput label="Confirmar contraseña" labelPlacement="floating" fill="outline" type="password" value={form.confirm} onIonInput={set('confirm')} required />
          <IonButton expand="block" type="submit" disabled={busy}>
            Registrarme
          </IonButton>
          <IonText className={styles.alt}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </IonText>
        </form>

        <IonLoading isOpen={busy} message="Creando cuenta..." />
        <IonToast isOpen={!!error} message={error} duration={3000} color="danger" onDidDismiss={() => setError('')} />
      </IonContent>
    </IonPage>
  )
}
