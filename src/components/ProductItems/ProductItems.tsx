import React, { Component } from "react";
import ProductListing from "../../interfaces/ProductListing.interface";
import { IonList, IonThumbnail, IonLabel } from "@ionic/react";


class ProductItems extends Component <ProductListing> {
    
    render () {
        const { name } = this.props;
        return (
           <IonList>
               <IonThumbnail item-left></IonThumbnail>
               <IonLabel>
                   {name}
              </IonLabel>
          </IonList>
        )
    }
}

export default ProductItems