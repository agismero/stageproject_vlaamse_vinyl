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
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import { useState, useEffect } from "react";
import axios from "axios";
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

const Api = () => {
  // const [singles, setSingles] = useState([]);
  const [search, setSearch] = useState("");
  const [artiesten, setArtiesten] = useState([]);
  const [singles, setSingles] = useState([]);
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
        const dataSingles = await getSingles(
          records.map((result) => result.artiest_id)
        );
        setArtiesten(records);
        setSingles(dataSingles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })([]);
  }, [artiesten]);

  function compareArt(a, b) {
    if (a.naam < b.naam) {
      return -1;
    }
    if (a.naam > b.naam) {
      return 1;
    }
    return 0;
  }

  function compareSing(a, b) {
    if (a.titel < b.titel) {
      return -1;
    }
    if (a.titel > b.titel) {
      return 1;
    }
    return 0;
  }
  const sortedArt = artiesten.sort(compareArt);
  const sortedSing = singles.sort(compareSing);
  const filteredArt = sortedArt.filter((artiest) =>
    artiest.naam.toLowerCase().includes(search.toLowerCase())
  );
  const filteredSing = sortedSing.filter((single) =>
    single.titel.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <>
        {loading && (
          <div className="loading">
            <IonSpinner name="crescent" color="primary" />
            <p className="loadingtText">Loading...</p>
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
              {search === "" &&
                filteredArt.map((artiest) => {
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
              {search.length > 0 && (
                <>
                  <IonItemGroup>
                    <IonItemDivider>
                      <IonTitle>Artiesten</IonTitle>
                    </IonItemDivider>
                    {filteredArt.map((artiest) => {
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
                  </IonItemGroup>
                  <IonItemGroup className="zoekSingles">
                    <IonItemDivider>
                      <IonTitle>Singles</IonTitle>
                    </IonItemDivider>
                    {filteredSing.map((result) => {
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
                              src={`http://www.vlaamsevinyl.be/afbeeldingen/hoezen/${artiesten.map(
                                (result) => {
                                  const name = result.naam;
                                  const nameUrl = name.replace(/ /g, "-");
                                  return nameUrl;
                                }
                              )}/${slicedUrl}/${result.titel}.jpg`}
                              alt={artiesten.map((result) => result.naam)}
                            />
                          </IonThumbnail>
                          <IonLabel>{result.titel}</IonLabel>
                        </IonItem>
                      );
                    })}
                  </IonItemGroup>
                </>
              )}
            </IonList>
          </IonContent>
        </IonPage>
      </>
    </>
  );
};

export default Api;
