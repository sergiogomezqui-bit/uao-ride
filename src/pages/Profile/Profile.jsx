import { useState } from 'react'
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import { camera as cameraIcon } from 'ionicons/icons'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { useAuth } from '../../context/AuthContext'
import { initials } from '../../helpers'
import styles from './Profile.module.scss'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user.name)
  const [toast, setToast] = useState('')

  // Sensor: camara. La foto se guarda reducida en el perfil de Firestore
  const takePhoto = async () => {
    let photo
    try {
      photo = await Camera.getPhoto({
        quality: 50,
        width: 256,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      })
    } catch {
      return // el usuario cancelo
    }
    try {
      await updateUser({ photo: photo.dataUrl })
      setToast('Foto actualizada')
    } catch (err) {
      console.error(err)
      setToast('No se pudo guardar la foto. Revisa las reglas de Firestore.')
    }
  }

  const saveName = async () => {
    if (!name.trim()) return
    try {
      await updateUser({ name: name.trim() })
      setToast('Perfil guardado')
    } catch (err) {
      console.error(err)
      setToast('No se pudo guardar. Revisa las reglas de Firestore.')
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mi perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className={styles.photoBox}>
          <IonAvatar className={styles.avatar} onClick={takePhoto}>
            {user.photo ? <img src={user.photo} alt={user.name} /> : <span>{initials(user.name)}</span>}
          </IonAvatar>
          <IonButton fill="clear" size="small" onClick={takePhoto}>
            <IonIcon icon={cameraIcon} slot="start" />
            Cambiar foto
          </IonButton>
        </div>

        <div className={styles.form}>
          <IonInput label="Nombre" labelPlacement="floating" fill="outline" value={name} onIonInput={(e) => setName(e.detail.value)} />
          <IonInput label="Correo" labelPlacement="floating" fill="outline" value={user.email} readonly />
          <IonInput label="Rol" labelPlacement="floating" fill="outline" value={user.role === 'admin' ? 'Administrador' : 'Usuario'} readonly />
          <IonButton expand="block" onClick={saveName}>
            Guardar cambios
          </IonButton>
        </div>

        <IonToast isOpen={!!toast} message={toast} duration={2000} onDidDismiss={() => setToast('')} />
      </IonContent>
    </IonPage>
  )
}
