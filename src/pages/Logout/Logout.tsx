import React, { Component } from 'react';
import { authenticationService } from '../../_services/authentication.service';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent
} from '@ionic/react';

interface Props {}

interface State {}

class Logout extends Component<Props, State> {
  componentWillMount() {
    authenticationService.logout();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Logout</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div style={{ padding: '20px' }}>You are now logout...</div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Logout;
