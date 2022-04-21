import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Artiesten from "./components/Artiesten";
import Singles from "./components/Singles";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Detail from "./components/Detail";
import Tabs from "./components/Tabs";
import {
  discOutline,
  ellipse,
  homeOutline,
  logInOutline,
  personOutline,
  searchOutline,
  square,
  triangle,
} from "ionicons/icons";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Artiesten">
          <Artiesten />
        </Route>
        <Route exact path="/">
          <Redirect to="/Artiesten" />
        </Route>
        <Route path="/singles/:id" component={Singles} />
        <Route exact path="/Singles">
          <Singles />
        </Route>
        <Route path="/detail/:id" component={Detail} />
        <Route path="/tabs" component={Tabs} />
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Tabs />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  /*
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/pages/singles/:id" component={Singles} />
        <Route path="/pages/detail/:id" component={Detail} />
      </IonRouterOutlet>
      <IonTabs>
        <Route exact path="/SingleList">
          <SingleList />
        </Route>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/artists">
            <Artists />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/collection">
            <Collection />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar color="secondary" slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
          </IonTabButton>
          <IonTabButton tab="artists" href="/artists">
            <IonIcon icon={personOutline} />
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchOutline} />
          </IonTabButton>
          <IonTabButton tab="collection" href="/collection">
            <IonIcon icon={discOutline} />
          </IonTabButton>
          <IonTabButton tab="login" href="/login">
            <IonIcon icon={logInOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
   */
);

export default App;
