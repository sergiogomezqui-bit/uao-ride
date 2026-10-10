import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'

// TODO (Integrante 3): reemplazar este placeholder. Ver docs/TAREAS_INTEGRANTE_3.md
export default function AdminUsers() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Pendiente: gestión de usuarios (Integrante 3)</IonContent>
    </IonPage>
  )
}
