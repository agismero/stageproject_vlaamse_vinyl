import {
  IonPage,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonSpinner,
} from "@ionic/react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../theme/style.css";

const Singles = (props) => {
  const [singles, setSingles] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const {
          data: { records },
        } = await axios(
          `https://www.vlaamsevinyl.be/api.php/records/single_artiest_combo?filter=artiest_id,eq,${props.match.params.id}`
        );
        setSingles(records);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);

  const singleId = singles.map((result) => result.single_id);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const {
          data: { records },
        } = await axios(
          `https://www.vlaamsevinyl.be/api.php/records/single/${singleId}`
        );
        setDetails(records);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);

  console.log(singles);

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
            {details.map((result) => (
              <IonItem detail>{result.titel}</IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Singles;
