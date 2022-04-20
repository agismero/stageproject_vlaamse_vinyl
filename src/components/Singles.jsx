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

const Singles = (props) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getSingles(props.match.params.id);
        setLoading(false);
        setDetails(data);
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
  console.log(sorted);
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
            {sorted.map((result) => (
              <IonItem
                key={result.single_id}
                routerLink={`/detail/${result.single_id}`}
                detail
              >
                {result.titel}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Singles;
