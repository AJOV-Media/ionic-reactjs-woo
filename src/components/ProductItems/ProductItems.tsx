import React, { Component } from "react";
import ProductListing from "../../interfaces/ProductListing.interface";
import { IonList, IonThumbnail, IonLabel } from "@ionic/react";


class ProductItems extends Component <ProductListing> {
    render () {
        return (
           <IonList>
               <IonThumbnail item-left></IonThumbnail>
               <IonLabel>
                 Test name
              </IonLabel>
          </IonList>
        )
    }
}

export default ProductItems