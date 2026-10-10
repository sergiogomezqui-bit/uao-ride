import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import { logOutOutline, moon } from 'ionicons/icons'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { initials } from '../../helpers'
import styles from './Menu.module.scss'

export default function Menu({ contentId, items }) {
  const { user, logout } = useAuth()
  const { dark, toggleDark } = useTheme()

  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>UAO Ride</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.profile}>
          <IonAvatar className={styles.avatar}>
            {user?.photo ? <img src={user.photo} alt={user.name} /> : <span>{initials(user?.name)}</span>}
          </IonAvatar>
          <strong>{user?.name}</strong>
          <small>{user?.role === 'admin' ? 'Administrador' : user?.email}</small>
        </div>

        <IonList lines="none">
          {items.map((item) => (
            <IonMenuToggle key={item.path} autoHide={false}>
              <IonItem routerLink={item.path} routerDirection="root" detail={false}>
                <IonIcon icon={item.icon} slot="start" />
                <IonLabel>{item.label}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
          <IonItem>
            <IonIcon icon={moon} slot="start" />
            <IonToggle checked={dark} onIonChange={toggleDark}>
              Modo oscuro
            </IonToggle>
          </IonItem>
          <IonItem button detail={false} onClick={logout}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}
