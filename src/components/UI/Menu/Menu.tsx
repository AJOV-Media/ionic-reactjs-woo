import React, { Component } from 'react';
import { authenticationService } from '../../../_services/authentication.service';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote
} from '@ionic/react';

//import { useLocation } from 'react-router-dom';
import './Menu.css';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import {
  book,
  bookSharp,
  shirt,
  shirtSharp,
  peopleCircle,
  peopleCircleSharp,
  bookmarkOutline,
  lockClosed,
  lockClosedSharp,
  paperPlane,
  paperPlaneSharp,
  person,
  personSharp,
  logOut,
  logOutSharp
} from 'ionicons/icons';

interface Props {}

interface State {
  currentUser: any;
  loggedIn: boolean;
  error: boolean;
  appPages: AppPage[];
  categoryItems: any;
}

interface AppPage {
  url: string;
  iosIcon: string;
  requireLogin?: boolean;
  mdIcon: string;
  title: string;
}

class Menu extends Component<Props, State> {
  WooCommerce: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentUser: authenticationService.currentUserValue,
      error: false,
      loggedIn: false,
      appPages: [
        {
          title: 'Products',
          url: '/products',
          iosIcon: shirt,
          mdIcon: shirtSharp
        },
        {
          title: 'About',
          url: '/page/Outbox',
          iosIcon: peopleCircle,
          mdIcon: peopleCircleSharp
        },
        {
          title: 'Contact',
          url: '/page/Favorites',
          iosIcon: book,
          mdIcon: bookSharp
        },
        {
          title: 'Login',
          url: '/login',
          requireLogin: false,
          iosIcon: lockClosed,
          mdIcon: lockClosedSharp
        },
        {
          title: 'Sign Up',
          url: '/signup',
          requireLogin: false,
          iosIcon: paperPlane,
          mdIcon: paperPlaneSharp
        },
        {
          title: 'My Account',
          url: '/myaccount',
          requireLogin: true,
          iosIcon: person,
          mdIcon: personSharp
        },
        {
          title: 'Logout',
          url: '/signup',
          requireLogin: true,
          iosIcon: logOut,
          mdIcon: logOutSharp
        }
      ],
      categoryItems: []
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
    const { currentUser } = this.state;

    if (currentUser.user_display_name) {
      this.setState({
        loggedIn: true
      });
    }

    this.WooCommerce.get('products/categories')
      .then((response) => {
        Object.keys(response.data).forEach((key) => {
          this.setState({
            categoryItems: [...this.state.categoryItems, response.data[key]]
          });
        });
      })
      .catch((error) => {
        console.log('Error Data:', error);
        this.setState({ error: true });
      })
      .finally(() => {
        //this.setState({ loading: false });
      });
  }

  displayMainMenu = () => {
    const { appPages, loggedIn } = this.state;

    return appPages.map((appPage, index) => {
      let hideMenu: boolean;
      if (appPage.requireLogin === true && loggedIn === true) {
        hideMenu = false;
      } else if (appPage.requireLogin === undefined) {
        hideMenu = false;
      } else {
        hideMenu = true;
      }

      return (
        <IonMenuToggle key={index} autoHide={false} hidden={hideMenu}>
          <IonItem
            routerLink={appPage.url}
            routerDirection="none"
            lines="none"
            detail={false}
          >
            <IonIcon slot="start" icon={appPage.iosIcon} />
            <IonLabel>{appPage.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      );
    });
  };

  render() {
    const { categoryItems, currentUser } = this.state;

    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>Woo Ionic Demo</IonListHeader>
            <IonNote>
              Hi and Welcome{' '}
              {currentUser.user_display_name
                ? currentUser.user_display_name
                : 'Guest'}
            </IonNote>
            {this.displayMainMenu()}
          </IonList>

          <IonList id="labels-list">
            <IonListHeader> Categories</IonListHeader>
            {categoryItems.map((category, index) => (
              <IonItem lines="none" key={index}>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel>{category.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>
    );
  }
}

export default Menu;
