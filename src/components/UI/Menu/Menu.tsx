import React, {Component} from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {  book, bookSharp, shirt, shirtSharp, peopleCircle, peopleCircleSharp } from "ionicons/icons";

interface Props {

}

interface State { 
   appPages: AppPage[]
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

class Menu extends Component <Props, State> {

  WooCommerce: any;
  
  constructor(props: Props){
    super(props);
    this.state = {
      appPages: [{
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
          }]
    }

    this.WooCommerce = new WooCommerceRestApi({
      url: 'https://woocommerce.local:8091/',
      consumerKey:  'ck_e69ffab389c5ab9957b0f3e67a0398047f9d62d9',
      consumerSecret:  'cs_30d030a4f3d6a1e132a9b0bdb8fc35f0b81171c7',
      version: "wc/v3",
      verifySsl: true,
      queryStringAuth: true  
    }); 
  
  }

  componentDidMount() {
                       
  }

  displayMainMenu = mainLists => (
    mainLists.map((appPage, index) => (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem  routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
            <IonIcon slot="start" icon={appPage.iosIcon} />
            <IonLabel>{appPage.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
    ))
  )
  
  render() {
    const {  appPages } = this.state;

    return(
      <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>User/Guest</IonListHeader>
          <IonNote>Hi and Welcome user or guest</IonNote>
          {this.displayMainMenu(appPages)}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader> Categories</IonListHeader>
         
        </IonList>
      </IonContent>
    </IonMenu>   
    );
  }

}

export default Menu;