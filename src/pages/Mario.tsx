import { IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonButton, IonImg } from "@ionic/react";


const Mario = () => {
  return (
    <IonPage>
       <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="list"/>
                </IonButtons>
            </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard>
  <IonImg src="/assets/myImg.png"></IonImg>
  <IonCardContent>
    <IonCardHeader>
      <IonCardSubtitle>Mario Fam</IonCardSubtitle>
      <IonCardTitle>Mario</IonCardTitle>
    </IonCardHeader>
    <p>Mario (マリオ Mario?) (originally called Mr. Video and Jumpman and also called Super Mario or Mario Mario) is a  mustached Italian plumber who lives in the Mushroom Kingdom. Mario also sometimes rules his own land, Mario Land. As confirmed in DiC Cartoons Mario and his brother, Luigi used to live in Brooklyn as plumbers. He had a hat marked with an M. The hat of Wario is also similar, but the M is reversed to W.
    </p>
    <IonItem>
        <IonButton fill="solid">Action</IonButton>
    </IonItem>
  </IonCardContent>
</IonCard>
        </IonContent>
    </IonPage>
  )
}

export default Mario

