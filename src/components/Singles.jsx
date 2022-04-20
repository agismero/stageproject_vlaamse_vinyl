import {
  IonPage,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonSpinner,
  IonThumbnail,
  IonImg,
  IonLabel,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "../theme/style.css";

const getSingles = async (artiestId) =>
  Promise.all(
    (
      await (
        await fetch(
          `https://www.vlaamsevinyl.be/api.php/records/single_artiest_combo?filter=artiest_id,eq,${artiestId}`
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

const Singles = (props) => {
  const [singles, setSingles] = useState([]);
  const [artiest, setArtiest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const dataSingle = await getSingles(props.match.params.id);
        const dataArtiest = await getArtiest(props.match.params.id);
        setLoading(false);
        setSingles(dataSingle);
        setArtiest(dataArtiest.records);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);
  // console.log(artiest);

  function compare(a, b) {
    if (a.titel < b.titel) {
      return -1;
    }
    if (a.titel > b.titel) {
      return 1;
    }
    return 0;
  }

  const sorted = singles.sort(compare);
  // console.log(sorted);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="artiesten" />
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
          <IonList>
            {sorted.map((result) => {
              const slicedUrl = result.foto.slice(0, -4);
              return (
                <IonItem
                  key={result.single_id}
                  routerLink={`/detail/${result.single_id}`}
                  detail
                >
                  <IonThumbnail slot="start">
                    <IonImg
                      height="100px"
                      src={`http://www.vlaamsevinyl.be/afbeeldingen/hoezen/${artiest.map(
                        (result) => {
                          const name = result.naam;
                          const nameUrl = name.replace(/ /g, "-");
                          return nameUrl;
                        }
                      )}/${slicedUrl}/${result.titel}.jpg`}
                      alt={artiest.map((result) => result.naam)}
                    />
                  </IonThumbnail>
                  <IonLabel>{result.titel}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Singles;
