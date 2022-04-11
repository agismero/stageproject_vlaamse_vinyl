import { IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonContent } from "@ionic/react";


const DonkeyKong = () => {
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
        <h1>Donkey Kong</h1>
        <p>Donkey Kong (also known as DK or D. Kong,) is the primary & titular protagonist of the franchise, Cranky Kong's grandson and Donkey Kong Jr.'s son.

        His goal is protect his Banana Hoard, defend the Donkey Kong Island and help his friends. He is always accompanied by his nephew Diddy Kong on his adventures, but of course he is replaced by his sidekicks as the main protagonist when he is in trouble.</p>
        </IonContent>
    </IonPage>
  )
}

export default DonkeyKong

