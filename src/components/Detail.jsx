import {
  IonPage,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonTitle,
  IonSpinner,
  IonCard,
} from "@ionic/react";
import { heartOutline, starOutline } from "ionicons/icons";
import { useState, useEffect, useContext } from "react";

const getDetails = async (singleId) =>
  Promise.all(
    (
      await (
        await fetch(
          `https://www.vlaamsevinyl.be/api.php/records/single_artiest_combo?filter=single_id,eq,${singleId}`
        )
      ).json()
    ).records.map(async ({ single_id }) =>
      (
        await fetch(
          `https://www.vlaamsevinyl.be/api.php/records/single/${single_id}`
        )
      ).json()
    )
  );

const Detail = (props) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(false);
        setError(false);
        const data = await getDetails(props.match.params.id);
        //console.log(data);
        setDetails(data);
        //console.log(data);
        //setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonTitle>{}</IonTitle>
              <IonBackButton defaultHref="singles" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loading && (
            <div className="loading">
              <IonSpinner name="crescent" color="primary" />
              <p>Loading...</p>
            </div>
          )}
          {error && <p>Error...</p>}
          <IonCard>
            {details.length > 0 &&
              details.map((detail) => {
                return (
                  <IonCard key={detail.single_id}>
                    <img
                      height="350px"
                      src={`https://www.vlaamsevinyl.be/afbeeldingen/artiesten/artists/wt_140/will-tura.jpg`}
                    />
                    <div>
                      <p>{detail.titel}</p>
                      <p>{detail.bkant}</p>
                      <p>{detail.jaartal}</p>
                    </div>
                    <div className="buttons"></div>
                  </IonCard>
                );
              })}
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Detail;
