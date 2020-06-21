import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, triangle, shirt } from 'ionicons/icons';

import Menu from './components/UI/Menu/Menu';
import Products from './pages/Products/Products';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
        <IonTabs>
            <IonRouterOutlet >
              <Route path="/products" component={Products} exact={true} />
              <Route path="/about" component={About} exact={true} />
              <Route path="/contact" component={Contact} exact={true} />
              
              <Route path="/" render={() => <Redirect to="/about" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
            <IonTabButton tab="products" href="/products">
                <IonIcon icon={shirt} />
                <IonLabel>Products</IonLabel>
              </IonTabButton>
              <IonTabButton tab="about" href="/about">
                <IonIcon icon={triangle} />
                <IonLabel>About</IonLabel>
              </IonTabButton>
              <IonTabButton tab="contact" href="/contact">
                <IonIcon icon={ellipse} />
                <IonLabel>Contact</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
          </IonRouterOutlet> 
      </IonSplitPane>  
    </IonReactRouter>
  </IonApp>
);

export default App;
