import React, { Component } from 'react';
import { authenticationService } from '../../_services/authentication.service';
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
  IonLoading,
  IonRow,
  IonCol,
  IonToast
} from '@ionic/react';
import { lockOpen } from 'ionicons/icons';

interface Props {}

interface State {
  loading: boolean;
  username: string;
  password: string;
  showToast: boolean;
  toastMessage: string;
  toastColor: string;
}

type StateKeys = keyof State;

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      showToast: false,
      toastMessage: '',
      toastColor: ''
    };
  }

  inputUserField = (key: StateKeys, newValue) =>
    this.setState((prevState) => ({
      ...prevState,
      [key]: newValue
    }));

  loginUser = () => {
    const { username, password } = this.state;

    authenticationService.login(username, password).then(
      (user) => {
        console.log('user');
      },
      (error) => {
        this.setState({
          showToast: true,
          toastMessage: 'Error with request ' + error,
          toastColor: 'danger'
        });
      }
    );
  };

  render() {
    const {
      loading,
      username,
      password,
      showToast,
      toastMessage,
      toastColor
    } = this.state;

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

    let toastShow = showToast ? (
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => this.setState({ showToast: false })}
        message={toastMessage}
        color={toastColor}
        duration={3000}
        position="top"
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
          {toastShow}
          <IonCard>
            <IonRow>
              <IonCol col-4></IonCol>
              <IonCol col-4>
                <img
                  alt="Woo API"
                  src={process.env.PUBLIC_URL + '/assets/api-logo.png'}
                />
              </IonCol>
              <IonCol col-4></IonCol>
            </IonRow>
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
              <IonButton
                expand="full"
                color="primary"
                onClick={() => this.loginUser()}
              >
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
