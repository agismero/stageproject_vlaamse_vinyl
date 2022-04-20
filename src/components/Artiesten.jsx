import {
  IonItem,
  IonBadge,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonList,
  IonSpinner,
  IonSearchbar,
} from "@ionic/react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../theme/style.css";

const Api = () => {
  // const [singles, setSingles] = useState([]);
  const [search, setSearch] = useState("");
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
          `https://www.vlaamsevinyl.be/api.php/records/artiest?include=artiest_id,naam,aantal_singles,foto
          `
        );
        setArtiesten(records);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, []);

  function compare(a, b) {
    if (a.naam < b.naam) {
      return -1;
    }
    if (a.naam > b.naam) {
      return 1;
    }
    return 0;
  }

  const sorted = artiesten.sort(compare);

  const filtered = sorted.filter((artiest) =>
    artiest.naam.toLowerCase().includes(search)
  );

  return (
    <>
      <>
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
              <IonTitle>Artiesten</IonTitle>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <IonSearchbar
                  placeholder="Zoek artiest, single, jaar"
                  value={search}
                  slot="icon-only"
                  icon={search}
                  clearInput
                  onIonChange={(e) => setSearch(e.target.value)}
                />
                {/* <IonButton color="primary" fill="solid">
                  Zoeken
                </IonButton> */}
              </form>
            </IonToolbar>
            {console.log(search)}
          </IonHeader>
          <IonContent>
            <IonList>
              {filtered.map((artiest) => {
                const file = artiest.foto;
                const fileUrl = file.split(".")[0];

                const name = artiest.naam;
                const nameUrl = name.replace(/ /g, "-");
                const nameUrlFinal = nameUrl.replace("-/-", "-");
                return (
                  <IonItem
                    key={artiest.artiest_id}
                    routerLink={`/singles/${artiest.artiest_id}`}
                    detail
                  >
                    <IonThumbnail slot="start">
                      <IonImg
                        height="100px"
                        src={`https://www.vlaamsevinyl.be/afbeeldingen/artiesten/${fileUrl}/${nameUrlFinal}.jpg`}
                        alt={artiest.naam}
                      />
                    </IonThumbnail>
                    <IonLabel>{artiest.naam}</IonLabel>
                    <IonBadge slot="end">
                      {artiest.aantal_singles} singles
                    </IonBadge>
                  </IonItem>
                );
              })}
            </IonList>
          </IonContent>
        </IonPage>
      </>
    </>
  );
};

export default Api;
