import React, { Component } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonThumbnail, IonLabel } from '@ionic/react';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import ProductItems from "../../components/ProductItems/ProductItems";

interface Props {

}

interface State {
  error: boolean,
  productItems: []
}



class Products extends Component <Props, State> {

  WooCommerce: any;

  constructor(props: Props){
    super(props);
    this.state = {
        error: false,
        productItems: []
    }

    this.WooCommerce = new WooCommerceRestApi({
      url: 'http://woocommerce.local:8090/',
      consumerKey:  'ck_e69ffab389c5ab9957b0f3e67a0398047f9d62d9',
      consumerSecret:  'cs_30d030a4f3d6a1e132a9b0bdb8fc35f0b81171c7',
      version: "wc/v3",
      verifySsl: false,
      queryStringAuth: true  
    }); 
  
  }
    
  componentDidMount() {
    this.WooCommerce.get('products', {'page': 1 })
    .then( (response) => {

        console.log(response.data);
    

    })
    .catch((error) => {
        console.log("Error Data:", error.response.data);
        this.setState({ error: true});

    })
    .finally(() => {
       
        
    });
  }

    render () {

      const { error, 
              productItems
       } = this.state; //Deconstruct

        return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Products</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>

              {productItems.map(pproduct => {
                  return (
                          
                      <ProductItems  />

                  )
               })}
                
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