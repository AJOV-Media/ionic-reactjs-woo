import React, { Component } from 'react';
import {
  IonButtons,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLoading,
  IonButton,
  IonIcon,
  IonInput,
  IonToast,
  IonGrid,
  withIonLifeCycle,
  IonItem,
  IonLabel,
  IonSearchbar
} from '@ionic/react';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import ProductItems from '../../components/ProductItems/ProductItems';
import Modal from '../../components/UI/Modal/Modal';
import { addCircle } from 'ionicons/icons';

import './Products.css';
import ReviewItems from '../../components/ReviewItems/ReviewItems';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  searchKey: string;
  searchValue: string;
}

interface State {
  error: boolean;
  loading: boolean;
  isDetailView: boolean;
  productDetail: any;
  productItems: any;
  cartItems: any;
  currentCartQty: number;
  currentPage: number;
  showToast: boolean;
  scrollHeight: number;
  hasMoreProduct: boolean;
  searchString: string;
}

class Products extends Component<Props, State> {
  WooCommerce: any;
  scrollableContent: React.RefObject<HTMLIonContentElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      isDetailView: false,
      productDetail: '',
      productItems: [],
      cartItems: [],
      currentCartQty: 1,
      currentPage: 1,
      showToast: false,
      scrollHeight: 0,
      hasMoreProduct: true,
      searchString: ''
    };

    this.WooCommerce = new WooCommerceRestApi({
      url: process.env.REACT_APP_WOO_URL,
      consumerKey: process.env.REACT_APP_WOO_CONSUMER_KEY,
      consumerSecret: process.env.REACT_APP_WOO_CONSUMER_SECRET,
      version: process.env.REACT_APP_WOO_VERSION,
      verifySsl: process.env.REACT_APP_WOO_VERIFY_SSL,
      queryStringAuth: process.env.REACT_APP_WOO_QUERY_STRING_AUTH
    });

    this.scrollableContent = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchKey !== this.props.searchKey ||
      prevProps.searchValue !== this.props.searchValue
    ) {
      this.setState({
        productItems: []
      });
      this.loadTheProducts();
    }

    let scrollableContent = this!.scrollableContent!.current!.offsetHeight - 10;

    if (prevState.scrollHeight !== scrollableContent) {
      this.setState({
        scrollHeight: scrollableContent
      });
    }
  }

  ionViewDidEnter() {
    this.loadTheProducts();
  }

  loadTheProducts = () => {
    const { searchKey, searchValue } = this.props;
    const { currentPage, searchString } = this.state;

    let params = { page: currentPage };

    if (searchKey) {
      Object.assign(params, { [searchKey]: searchValue });
    }

    if (searchString) {
      Object.assign(params, { search: searchString });
    }

    this.WooCommerce.get('products', params)
      .then((response) => {
        if (response.data.length) {
          Object.keys(response.data).forEach((key) => {
            this.setState({
              productItems: [...this.state.productItems, response.data[key]],
              currentPage: currentPage + 1,
              hasMoreProduct: true
            });
          });
        } else {
          this.setState({ hasMoreProduct: false, loading: false });
        }
      })
      .catch((error) => {
        console.log('Error Data:', error);
        this.setState({ error: true });
      })
      .finally(() => {});
  };

  detailCancelHandler = () => {
    this.setState({ isDetailView: false });
  };

  addToCart = (productId) => {
    const { currentCartQty } = this.state;
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem('wooReactCart');
    let cartObjects = JSON.parse(retrieveCartObjects || '[]');

    this.setState({ showToast: true });

    if (cartObjects.length > 0) {
      let updateCartObject = {};
      let updatedCartObjects = JSON.parse('[]');
      let alreadyAdded = false;
      for (var i = 0; i < cartObjects.length; i++) {
        if (cartObjects[i].product_id === productId) {
          //if product id is already on the cart
          alreadyAdded = true;
          updateCartObject = {
            product_id: cartObjects[i].product_id,
            howMany: currentCartQty
          };
          this.setState({ currentCartQty: 1 }); //Default to 1 again for input
        } else {
          updateCartObject = {
            product_id: cartObjects[i].product_id,
            howMany: cartObjects[i].howMany
          };
        }
        updatedCartObjects.push(updateCartObject);
      }
      if (!alreadyAdded) {
        updateCartObject = {
          product_id: productId,
          howMany: currentCartQty
        };
        this.setState({ currentCartQty: 1 }); //Default to 1 again for input
        updatedCartObjects.push(updateCartObject);
        alreadyAdded = false;
      }
      localStorage.setItem('wooReactCart', JSON.stringify(updatedCartObjects));
    } else {
      //only if cart is all empty
      let addCartObject = { product_id: productId, howMany: 1 };
      cartObjects.push(addCartObject);
      localStorage.setItem('wooReactCart', JSON.stringify(cartObjects));
    }

    retrieveCartObjects = localStorage.getItem('wooReactCart');
  };

  inputCart = (qty) => this.setState({ currentCartQty: qty });

  showToast = (message) => {
    const { showToast } = this.state;
    return (
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => this.setState({ showToast: false })}
        message={message}
        position="middle"
        duration={2000}
      />
    );
  };

  detailHandler = (id) => {
    let currentProductCartCount = 1; //should be 1
    let detailContent = <div> No Details </div>;
    let currentRating = <div> No ratings </div>;
    let buttonAddCart = 'Add to Cart';
    this.setState({ loading: true });

    const retrieveCartObjects = localStorage.getItem('wooReactCart');
    let cartObjects = JSON.parse(retrieveCartObjects || '[]');

    if (cartObjects.length > 0) {
      for (var i = 0; i < cartObjects.length; i++) {
        if (cartObjects[i].product_id === id) {
          currentProductCartCount = cartObjects[i].howMany;
          buttonAddCart = 'Update Cart';
        }
      }
    }

    //Get Ratings
    this.WooCommerce.get('products/reviews/?product=' + id, { id: id }).then(
      (response) => {
        if (response.data.length > 0) {
          currentRating = this.displayProductReview(response.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.WooCommerce.get('products/' + id, { id: id })
      .then((response) => {
        detailContent = (
          <IonCard>
            <img
              alt={response.data.images[0].name}
              src={response.data.images[0].src}
              style={{ width: '200px' }}
            />
            <IonCardHeader>
              <IonCardSubtitle>
                <strong>Category:</strong>
                {response.data.categories[0].name}
              </IonCardSubtitle>
              <IonCardTitle>
                {response.data.name}
                <IonInput
                  type="number"
                  className="addCartInput"
                  placeholder="How many?"
                  value={currentProductCartCount}
                  onIonChange={(e) =>
                    this.inputCart((e.target as HTMLInputElement).value)
                  }
                ></IonInput>
                <IonButton
                  className="addCartButton"
                  onClick={() => this.addToCart(id)}
                >
                  {buttonAddCart} <IonIcon icon={addCircle}></IonIcon>
                </IonButton>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>{currentRating}</IonGrid>
            </IonCardContent>
            <IonCardContent>
              <div
                dangerouslySetInnerHTML={{ __html: response.data.description }}
              ></div>
            </IonCardContent>
          </IonCard>
        );
        this.setState({ productDetail: detailContent });
      })
      .catch((error) => {
        console.log('Error Data:', error.response.data);
      })
      .finally(() => {
        this.setState({ isDetailView: true });
        this.setState({ loading: false });
      });
  };

  searchTheString = (value) => {
    this.setState({ searchString: value });
    this.loadTheProducts();
  };

  displayProductReview = (reviews) =>
    reviews.length > 0 &&
    reviews.map((review) => (
      <ReviewItems
        date_created={review.date_created}
        id={review.id}
        status={review.status}
        reviewer={review.reviewer}
        reviewer_email={review.reviewer_email}
        rating={review.rating}
        review={review.review}
      />
    ));

  displayProducts = (productLists) =>
    productLists.length > 0 &&
    productLists.map((product) => (
      <ProductItems
        key={product.id}
        name={product.name}
        shortDescription={product.short_description}
        price_html={product.price_html}
        mainImage={product.images[0]}
        clicked={() => this.detailHandler(product.id)}
      />
    ));

  render() {
    const {
      error,
      loading,
      productItems,
      isDetailView,
      productDetail,
      scrollHeight,
      hasMoreProduct
    } = this.state; //Deconstruct

    let content = (
      <div
        id="scrollableDiv"
        style={{
          height: scrollHeight,
          overflow: 'auto'
        }}
      >
        <InfiniteScroll
          dataLength={this.state.productItems.length}
          next={this.loadTheProducts}
          hasMore={hasMoreProduct}
          scrollableTarget="scrollableDiv"
          loader={
            <IonLoading
              cssClass="woo-loader"
              isOpen={loading}
              spinner={'dots'}
              message={'Please wait...'}
            />
          }
          endMessage={
            <IonItem>
              <IonLabel>No More Products.</IonLabel>
            </IonItem>
          }
        >
          {this.displayProducts(productItems)}
        </InfiniteScroll>
      </div>
    );

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Products </IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              onIonChange={(e) => this.searchTheString(e.detail.value)}
              debounce={2000}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent ref={this.scrollableContent}>
          {this.showToast('Added to Cart')}
          <Modal show={isDetailView} modalClosed={this.detailCancelHandler}>
            {productDetail}
          </Modal>
          {content}
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Products);
