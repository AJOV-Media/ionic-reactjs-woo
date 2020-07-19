import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLoading,
  IonFooter
} from '@ionic/react';
import React, { Component } from 'react';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import ProductItems from '../../components/ProductItems/ProductItems';

interface Props {}

interface State {
  error: boolean;
  loading: boolean;
  productItems: any;
  totalPrice: number;
}

class Cart extends Component<Props, State> {
  WooCommerce: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      productItems: [],
      totalPrice: 0.0
    };

    this.WooCommerce = new WooCommerceRestApi({
      url: 'https://woocommerce.local:8091/',
      consumerKey: 'ck_e69ffab389c5ab9957b0f3e67a0398047f9d62d9',
      consumerSecret: 'cs_30d030a4f3d6a1e132a9b0bdb8fc35f0b81171c7',
      version: 'wc/v3',
      verifySsl: true,
      queryStringAuth: true
    });
  }

  componentDidMount() {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem('wooReactCart');
    let cartObjects = JSON.parse(retrieveCartObjects || '[]');

    if (cartObjects.length > 0) {
      for (var i = 0; i < cartObjects.length; i++) {
        let howMany = cartObjects[i].howMany;
        this.WooCommerce.get('products/' + cartObjects[i].product_id)
          .then((response) => {
            response.data.qty = howMany;
            this.subTotalInc(
              Number(response.data.price),
              this.state.totalPrice
            );

            this.setState({
              productItems: [...this.state.productItems, response.data]
            });
          })
          .catch((error) => {
            console.log('Error Data:', error);
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      }
    }
  }

  subTotalInc = (price, subTotal) => {
    this.setState({
      totalPrice: subTotal + price
    });
  };

  displayProducts = (productLists) =>
    productLists.length > 0 &&
    productLists.map((product) => (
      <ProductItems
        key={product.id}
        name={product.name}
        shortDescription={product.short_description}
        price_html={product.price_html}
        mainImage={product.images[0]}
        qty={product.qty}
      />
    ));

  render() {
    const { error, loading, productItems, totalPrice } = this.state;
    let productContent;
    if (error) {
      productContent = (
        <div className="container">
          <p> No product</p>
        </div>
      );
    } else if (productItems) {
      productContent = this.displayProducts(productItems);
    }

    let content = loading ? (
      <IonLoading
        cssClass="woo-loader"
        isOpen={loading}
        spinner={'dots'}
        message={'Please wait...'}
      />
    ) : (
      <IonList>{productContent} </IonList>
    );
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Cart</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>{content}</IonContent>

        <IonFooter>
          <IonToolbar>
            <IonTitle size="small" slot="end">
              <strong> Total: </strong>
              {totalPrice.toFixed(2)}
            </IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }
}

export default Cart;
