import {
  IonPage,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
} from "@ionic/react";

const Detail = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="singles" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Test</p>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Detail;
