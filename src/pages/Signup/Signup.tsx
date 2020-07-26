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
type UserfieldBillingKeys = keyof State['userFields']['billing'];
type UserfieldShippingKeys = keyof State['userFields']['shipping'];

class Signup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userFields: {
        email: '',
        billing: {},
        shipping: {}
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

  //Billing state object
  inputUserBillingField = (key: UserfieldBillingKeys, newValue) =>
    this.setState((prevState) => ({
      userFields: {
        ...prevState.userFields,
        billing: {
          ...prevState.userFields.billing,
          [key]: newValue
        }
      }
    }));

  //Billing state object
  inputUserShippingField = (key: UserfieldShippingKeys, newValue) =>
    this.setState((prevState) => ({
      userFields: {
        ...prevState.userFields,
        shipping: {
          ...prevState.userFields.shipping,
          [key]: newValue
        }
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
                    value={userFields.username}
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
                    value={userFields.billing.address_1}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'address_1',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Billing Address 2</IonLabel>
                  <IonTextarea
                    maxlength={100}
                    placeholder="Your Billing Address 2"
                    value={userFields.billing.address_2}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'address_2',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Country</IonLabel>
                  <IonSelect
                    value={userFields.billing.country}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'country',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  >
                    <IonSelectOption value="PH">Philippines</IonSelectOption>
                    <IonSelectOption value="JP">Japan</IonSelectOption>
                    <IonSelectOption value="US">United States</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">State</IonLabel>
                  <IonSelect
                    value={userFields.billing.state}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'state',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  >
                    <IonSelectOption value="AL">Alabama</IonSelectOption>
                    <IonSelectOption value="AR">Arkansas</IonSelectOption>
                    <IonSelectOption value="">And so on</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">City </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your City"
                    value={userFields.billing.city}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'city',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Postal Code </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your Postal Code"
                    value={userFields.billing.postcode}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'postcode',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Phone </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your Phone"
                    value={userFields.billing.phone}
                    onIonChange={(e) =>
                      this.inputUserBillingField(
                        'phone',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
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
                    value={userFields.shipping.address_1}
                    onIonChange={(e) =>
                      this.inputUserShippingField(
                        'address_1',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Shipping Address 2</IonLabel>
                  <IonTextarea
                    maxlength={100}
                    placeholder="Your Shipping Address 2"
                    value={userFields.shipping.address_2}
                    onIonChange={(e) =>
                      this.inputUserShippingField(
                        'address_2',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Country</IonLabel>
                  <IonSelect
                    value={userFields.shipping.country}
                    onIonChange={(e) =>
                      this.inputUserShippingField(
                        'country',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  >
                    <IonSelectOption value="PH">Philippines</IonSelectOption>
                    <IonSelectOption value="JP">Japan</IonSelectOption>
                    <IonSelectOption value="US">United States</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">State</IonLabel>
                  <IonSelect
                    value={userFields.shipping.state}
                    onIonChange={(e) =>
                      this.inputUserShippingField(
                        'state',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  >
                    <IonSelectOption value="AL">Alabama</IonSelectOption>
                    <IonSelectOption value="AR">Arkansas</IonSelectOption>
                    <IonSelectOption value="">And so on</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">City </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your City"
                    value={userFields.shipping.city}
                    onIonChange={(e) =>
                      this.inputUserShippingField(
                        'city',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Postal Code </IonLabel>
                  <IonInput
                    type="text"
                    placeholder="your Postal Code"
                    value={userFields.shipping.postcode}
                    onIonChange={(e) =>
                      this.inputUserShippingField(
                        'postcode',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  ></IonInput>
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
