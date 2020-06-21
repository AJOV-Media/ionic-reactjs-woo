import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { Component } from "react";

interface Props {

}

interface State {
 
}


class About extends Component <Props, State> {
    render() {
        return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonMenuButton />
                  </IonButtons>
                  <IonTitle>About us</IonTitle>
                </IonToolbar>
              </IonHeader>
        
              <IonContent>
                <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large">About us</IonTitle>
                  </IonToolbar>
                </IonHeader>
                
              </IonContent>
            </IonPage>
          );
    }

}

export default About;