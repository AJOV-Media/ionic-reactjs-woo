import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { Component } from "react";

interface Props {

}

interface State {
 
}


class Contact extends Component <Props, State> {
    render() {
        return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonMenuButton />
                  </IonButtons>
                  <IonTitle>Contact us</IonTitle>
                </IonToolbar>
              </IonHeader>
        
              <IonContent>
                <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large">Contact us</IonTitle>
                  </IonToolbar>
                </IonHeader>
                
              </IonContent>
            </IonPage>
          );
    }
}

export default Contact;