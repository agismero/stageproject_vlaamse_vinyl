import { IonContent, IonPage,IonList, IonItem, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';

const List:React.FC = () => {
  return (
    <div>
      <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                        <IonTitle>List</IonTitle>
                        </IonButtons>
                    </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                 <IonItem href="/PikachuFam" detail>
                     PikachuFam
                 </IonItem>
                 <IonItem href="/Mario" detail>
                     Mario
                 </IonItem>
                 <IonItem href="DonkeyKong" detail>
                     Donkey Kong
                 </IonItem>
                </IonList>
             </IonContent>
        </IonPage>
    </div>
  )
}

export default List