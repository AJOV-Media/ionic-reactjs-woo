import React, { Component } from 'react';
import './FloatingCart.css';
import { IonFab, IonIcon, IonFabButton, IonBadge } from '@ionic/react';
import { cartSharp } from 'ionicons/icons';

type Props = {};

type State = {
  cartCount: number;
};

class FloatingCart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cartCount: 0
    };
  }

  componentDidMount() {
    this.setCartCount();
  }
  setCartCount = () => {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem('wooReactCart');
    let cartObjects = JSON.parse(retrieveCartObjects || '[]');

    if (cartObjects.length > 0) {
      this.setState({ cartCount: cartObjects.length });
    }
  };

  render() {
    const { cartCount } = this.state;
    return (
      <React.Fragment>
        <IonFab vertical="center" horizontal="end" slot="fixed">
          <IonBadge color="danger" className="cartCount">
            {cartCount}
          </IonBadge>
          <IonFabButton>
            <IonIcon icon={cartSharp} />
          </IonFabButton>
        </IonFab>
      </React.Fragment>
    );
  }
}

export default FloatingCart;
