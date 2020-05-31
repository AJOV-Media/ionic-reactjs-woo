import React, { Component } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonThumbnail, IonLabel } from '@ionic/react';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import ProductItems from "../../components/ProductItems/ProductItems";

interface Props {

}

interface State {
  error: boolean,
  productItems: any
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

     Object.keys(response.data).forEach((key) => {
        //return response.data[key];
       // console.log(key, response.data[key]);
       // productKeys.push(response.data[key]);
        this.setState({
          productItems: [...this.state.productItems,  response.data[key]]
        });
     }); 


    })
    .catch((error) => {
        console.log("Error Data:", error);
        this.setState({ error: true});

    })
    .finally(() => {
       
        
    });
  }

   displayProducts = productLists => (
        productLists.length > 0 && productLists.map(product => (
          <ProductItems 
             key={product.id} 
             name={product.name} />
        ))
    )

    render () {

      const { error, 
              productItems
       } = this.state; //Deconstruct

       let productContent;

       if(error) {
          productContent =  <div className="container">
                               <p> No product</p>
                            </div>
       }  else if (productItems) {
        
       }

        return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Products</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>

              { this.displayProducts(productItems) } 
                
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