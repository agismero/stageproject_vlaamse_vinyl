import { IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonContent, IonList, IonItem } from "@ionic/react";


const PikachuFam = () => {
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
        <h1>Pikachu</h1>
        <p>Pikachu (ピカチュウ, Pikachuu) is an Electric-type Pokémon which was introduced in Generation I. Pikachu is renowned for being the most well-known and recognizable Pokémon. Over the years, Pikachu has become so popular that it serves as the Pokémon franchise mascot. It is the Version Mascot and Starter Pokémon for the game Pokémon Yellow and its remake, Pokémon: Let's Go, Pikachu!. It is also well known from the anime, where Ash Ketchum, the protagonist, owns a Pikachu. </p>
        <IonList>
          <IonItem href="/PikachuFam/Pichu" detail>
            Pichu
          </IonItem>
          <IonItem href="/PikachuFam/Raichu" detail>
            Raichu
          </IonItem>
         </IonList>
        </IonContent>
    </IonPage>
  )
}

export default PikachuFam