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
  IonItemDivider,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox
} from '@ionic/react';
import { paperPlane } from 'ionicons/icons';
import UserFields from '../../interfaces/UserFields.interface';

interface Props {}

interface State {
  userFields: UserFields;
}

type UserfieldKeys = keyof State['userFields'];

class Signup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userFields: {
        email: ''
      }
    };
  }

  inputUserField = (key: UserfieldKeys, newValue) =>
    this.setState((prevState) => ({
      userFields: {
        ...prevState.userFields,
        [key]: newValue
      }
    }));

  //Testing only state
  checkState = () => {
    const { userFields } = this.state;
    console.log(userFields);
  };

  render() {
    const { userFields } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Signup </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Signup</IonCardTitle>
              <IonCardSubtitle>WooCommerce Signup</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItemDivider color="tertiary">
                  <IonLabel>Personal Details </IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonLabel position="floating">First Name </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Your First Name"
                    value={userFields.first_name}
                    onIonChange={(e) =>
                      this.inputUserField(
                        'first_name',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Last Name </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Your Last Name"
                    value={userFields.last_name}
                    onIonChange={(e) =>
                      this.inputUserField(
                        'last_name',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Email </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Your Email address"
                    value={userFields.email}
                    onIonChange={(e) =>
                      this.inputUserField(
                        'email',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Username </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Username you prefer"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password </IonLabel>
                  <IonInput
                    type="password"
                    placeholder="Password"
                    value={userFields.password}
                    onIonChange={(e) =>
                      this.inputUserField(
                        'password',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Confirm Password </IonLabel>
                  <IonInput
                    type="password"
                    placeholder="Confirm Password"
                  ></IonInput>
                </IonItem>
                <IonItemDivider color="tertiary">
                  <IonLabel>Billing information </IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonLabel position="floating">Billing Address 1</IonLabel>
                  <IonTextarea
                    maxlength={100}
                    placeholder="Your Billing Address 1"
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Billing Address 2</IonLabel>
                  <IonTextarea
                    maxlength={100}
                    placeholder="Your Billing Address 2"
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Country</IonLabel>
                  <IonSelect>
                    <IonSelectOption value="PH">Philippines</IonSelectOption>
                    <IonSelectOption value="JP">Japan</IonSelectOption>
                    <IonSelectOption value="US">United States</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">State</IonLabel>
                  <IonSelect>
                    <IonSelectOption value="AL">Alabama</IonSelectOption>
                    <IonSelectOption value="AR">Arkansas</IonSelectOption>
                    <IonSelectOption value="">And so on</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">City </IonLabel>
                  <IonInput type="text" placeholder="your City"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Postal Code </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your Postal Code"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Phone </IonLabel>
                  <IonInput type="text" placeholder="your Phone"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel> Same as Billing address? </IonLabel>
                  <IonCheckbox></IonCheckbox>
                </IonItem>
                <IonItemDivider color="tertiary">
                  <IonLabel> Shipping information </IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonLabel position="floating">Shipping Address 1</IonLabel>
                  <IonTextarea
                    maxlength={100}
                    placeholder="Your Shipping Address 1"
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Shipping Address 2</IonLabel>
                  <IonTextarea
                    maxlength={100}
                    placeholder="Your Shipping Address 2"
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Country</IonLabel>
                  <IonSelect>
                    <IonSelectOption value="PH">Philippines</IonSelectOption>
                    <IonSelectOption value="JP">Japan</IonSelectOption>
                    <IonSelectOption value="US">United States</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">State</IonLabel>
                  <IonSelect>
                    <IonSelectOption value="AL">Alabama</IonSelectOption>
                    <IonSelectOption value="AR">Arkansas</IonSelectOption>
                    <IonSelectOption value="">And so on</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">City </IonLabel>
                  <IonInput type="text" placeholder="your City"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Postal Code </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your Postal Code"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Phone </IonLabel>
                  <IonInput type="text" placeholder="your Phone"></IonInput>
                </IonItem>
              </IonList>
              <IonButton
                expand="full"
                onClick={() => this.checkState()}
                color="primary"
              >
                SIGNUP
                <IonIcon slot="end" icon={paperPlane} />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default Signup;
