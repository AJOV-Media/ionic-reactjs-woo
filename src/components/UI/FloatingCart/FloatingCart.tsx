import React, { Component } from 'react';
import './FloatingCart.css';
import { IonFab, IonIcon, IonFabButton, IonBadge } from '@ionic/react';
import { cartSharp } from 'ionicons/icons';

type Props = {};

type State = {};

class FloatingCart extends Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <IonFab vertical="center" horizontal="end" slot="fixed">
          <IonBadge color="danger" className="cartCount">
            66
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
