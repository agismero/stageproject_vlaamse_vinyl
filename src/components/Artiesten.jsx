import {
  IonItem,
  IonBadge,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonHeader,
  IonToolbar,
  IonPage,
  IonButtons,
  IonTitle,
  IonContent,
  IonList,
  IonSpinner,
} from "@ionic/react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../theme/style.css";

const Api = () => {
  // const [singles, setSingles] = useState([]);
  const [artiesten, setArtiesten] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const urlArtiesten = `https://www.vlaamsevinyl.be/api.php/records/artiest?include=artiest_id,naam,aantal_singles,foto`;
  // const urlSingles = `https://www.vlaamsevinyl.be/api.php/records/single/21`;

  // const getArtiesten = axios.get(urlArtiesten);
  // const getSingles = axios.get(urlSingles);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        // axios.all([getArtiesten, getSingles]).then(
        //   axios.spread((...allData) => {
        //     const allDataArtiesten = allData[0];
        //     const allDataSingles = allData[1];

        //     setArtiesten(allDataArtiesten.data.records);
        //     setSingles(allDataSingles.data);
        //   })
        // );
        const {
          data: { records },
        } = await axios(
          `https://www.vlaamsevinyl.be/api.php/records/artiest?include=artiest_id,naam,aantal_singles,foto`
        );
        setArtiesten(records);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);

  return (
    <>
      <div>
        {loading && (
          <div className="loading">
            <IonSpinner name="crescent" color="primary" />
            <p>Loading...</p>
          </div>
        )}
        {error && <p>error</p>}
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonTitle>Artiesten</IonTitle>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {artiesten.length > 0 &&
                artiesten.map((result) => {
                  const file = result.foto;
                  const fileUrl = file.substring(0, file.length - 4);
                  const fullName = result.naam;
                  const firstName = fullName.split(" ").slice(0, -1).join(" ");
                  const lastName = fullName.split(" ").slice(-1).join(" ");
                  return (
                    <IonItem
                      key={result.artiest_id}
                      routerLink={`/singles/${result.artiest_id}`}
                      detail
                    >
                      <IonThumbnail slot="start">
                        <IonImg
                          height="100px"
                          src={`https://www.vlaamsevinyl.be/afbeeldingen/artiesten/${fileUrl}/${firstName}-${lastName}.jpg`}
                          alt={result.naam}
                        />
                      </IonThumbnail>
                      <IonLabel>{result.naam}</IonLabel>
                      <IonBadge slot="end">
                        {result.aantal_singles} singles
                      </IonBadge>
                    </IonItem>
                  );
                })}
            </IonList>
          </IonContent>
        </IonPage>
      </div>
    </>
  );
};

export default Api;
