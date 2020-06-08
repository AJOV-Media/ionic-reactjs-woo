import React, { Component } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import ProductItems from "../../components/ProductItems/ProductItems";
import { Spinner } from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";

interface Props {

}

interface State {
  error: boolean,
  loading: boolean,
  isDetailView: boolean,
  productItems: any
}



class Products extends Component <Props, State> {

  WooCommerce: any;

  constructor(props: Props){
    super(props);
    this.state = {
        error: false,
        loading: true,
        isDetailView: false,
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
      this.setState({ loading: false });
    });
  }

  detailCancelHandler = () => {
    this.setState({isDetailView: false});
  }

  detailHandler = () => {
    this.setState({isDetailView: true});
  }

   displayProducts = productLists => (
        productLists.length > 0 && productLists.map(product => (
          <ProductItems 
             key={product.id} 
             name={product.name}
             shortDescription={product.short_description}
             price_html={product.price_html}
             mainImage={product.images[0]}
             clicked={this.detailHandler}
              />
        ))
    )

    render () {

      const { error, 
              loading,
              productItems,
              isDetailView
       } = this.state; //Deconstruct

       let productContent;

       if(error) {
          productContent =  <div className="container">
                               <p> No product</p>
                            </div>
       }  else if (productItems) {
          productContent =  this.displayProducts(productItems) 
       }

       let content = loading ? <Spinner message = "Loading..." />  :  <IonList>{ productContent } </IonList>

        return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Products</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                  <Modal show={isDetailView} modalClosed={this.detailCancelHandler}>
                    <h1> -Product Details- </h1>
                  </Modal>
                { content }
              </IonContent>
            </IonPage>
          );
    }
    

}

export default Products;