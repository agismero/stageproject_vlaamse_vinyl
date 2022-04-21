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
  IonImg,
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

const getArtiest = async (artiestId) =>
  await (
    await fetch(
      `https://www.vlaamsevinyl.be/api.php/records/artiest?filter=artiest_id,eq,${artiestId}`
    )
  ).json();

const Detail = (props) => {
  const [details, setDetails] = useState([]);
  const [artiest, setArtiest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(false);
        setError(false);
        const dataDetail = await getDetails(props.match.params.id);
        const dataArtiest = await getArtiest(props.match.params.id);
        setLoading(false);
        setDetails(dataDetail);
        setArtiest(dataArtiest.records);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);

  function compare(a, b) {
    if (a.titel < b.titel) {
      return -1;
    }
    if (a.titel > b.titel) {
      return 1;
    }
    return 0;
  }

  const sorted = details.sort(compare);

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
          {details.length > 0 &&
            details.map((detail) => {
              const slicedUrl = detail.foto.slice(0, -4);
              return (
                <IonCard key={detail.single_id}>
                  <IonImg
                    height="100px"
                    src={`http://www.vlaamsevinyl.be/afbeeldingen/hoezen/${artiest.map(
                      (result) => {
                        const name = detail.naam;
                        const nameUrl = name.replace(/ /g, "-");
                        return nameUrl;
                      }
                    )}/${slicedUrl}/${detail.titel}.jpg`}
                    alt={artiest.map((detail) => detail.naam)}
                  />
                  <div>
                    <p>{detail.titel}</p>
                    <p>{detail.bkant}</p>
                    <p>{detail.jaartal}</p>
                  </div>
                </IonCard>
              );
            })}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Detail;
