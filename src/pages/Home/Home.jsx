import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'

// TODO (Integrante 2): reemplazar este placeholder. Ver docs/TAREAS_INTEGRANTE_2.md
export default function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Viajes disponibles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Pendiente: listado de viajes (Integrante 2)</IonContent>
    </IonPage>
  )
}
