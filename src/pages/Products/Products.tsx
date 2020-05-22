import React, { Component } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

class Products extends Component {
    

    render () {

        return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Products</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large">Product</IonTitle>
                  </IonToolbar>
                </IonHeader>
                
              </IonContent>
            </IonPage>
          );
    }
    

}

export default Products;