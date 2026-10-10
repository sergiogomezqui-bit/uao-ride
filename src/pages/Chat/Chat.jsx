import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useParams } from 'react-router-dom'

// TODO (Integrante 3): reemplazar este placeholder. Ver docs/TAREAS_INTEGRANTE_3.md
export default function Chat() {
  const { id } = useParams()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/app/trips/${id}`} />
          </IonButtons>
          <IonTitle>Chat del viaje</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Pendiente: chat en tiempo real (Integrante 3)</IonContent>
    </IonPage>
  )
}
