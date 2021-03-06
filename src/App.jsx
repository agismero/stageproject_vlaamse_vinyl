import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Artiesten from "./components/Artiesten";
import Singles from "./components/Singles";

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
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
