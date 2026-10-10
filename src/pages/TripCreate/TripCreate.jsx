import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

// TODO (Integrante 2): reemplazar este placeholder. Ver docs/TAREAS_INTEGRANTE_2.md
export default function TripCreate() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home" />
          </IonButtons>
          <IonTitle>Publicar viaje</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Pendiente: publicar viaje con mapa (Integrante 2)</IonContent>
    </IonPage>
  )
}
