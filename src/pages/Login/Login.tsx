import React, { Component } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonLoading
} from '@ionic/react';
import { lockOpen } from 'ionicons/icons';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

interface Props {}

interface State {
  loading: boolean;
  username: string;
  password: string;
}

type StateKeys = keyof State;

class Login extends Component<Props, State> {
  WooCommerce: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: ''
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

  inputUserField = (key: StateKeys, newValue) =>
    this.setState((prevState) => ({
      ...prevState,
      [key]: newValue
    }));

  render() {
    const { loading, username, password } = this.state;

    let loader = loading ? (
      <IonLoading
        cssClass="woo-loader"
        isOpen={loading}
        spinner={'dots'}
        message={'Creating your account, Please wait...'}
      />
    ) : (
      ''
    );

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Login </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loader}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Login</IonCardTitle>
              <IonCardSubtitle>WooCommerce Login Page</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel position="floating">Username </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Your Email"
                    value={username}
                    onIonChange={(e) =>
                      this.inputUserField(
                        'username',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password </IonLabel>
                  <IonInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onIonChange={(e) =>
                      this.inputUserField(
                        'password',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand="full" color="primary">
                LOGIN
                <IonIcon slot="end" icon={lockOpen} />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default Login;
