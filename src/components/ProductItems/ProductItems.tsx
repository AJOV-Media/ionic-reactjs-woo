import React, { Component } from 'react';
import ProductListing from '../../interfaces/ProductListing.interface';
import {
  IonThumbnail,
  IonLabel,
  IonChip,
  IonIcon,
  IonItem,
  IonInput,
  IonNote
} from '@ionic/react';
import { cash, pricetag } from 'ionicons/icons';

import './ProductItems.css';

class ProductItems extends Component<ProductListing> {
  setWooHtml = (htmlString) => {
    return { __html: htmlString };
  };

  mapImage = (image) => {
    let imagePath = '';

    if (image === undefined) {
      imagePath = 'noimagepath';
    } else {
      let imageName = image.src.split('/').slice(-1)[0];
      let imageExplode = imageName.split('.');
      let imageRename = imageExplode[0] + '-100x100.' + imageExplode[1];

      let index = image.src.split('/').indexOf(imageName);

      let urlArray = image.src.split('/');

      urlArray.splice(index, 1);

      let finalUrl = urlArray.join('/') + '/' + imageRename;

      imagePath = finalUrl;
    }

    return imagePath;
  };

  //cart qty info
  displayQuantity = (qty) =>
    qty && (
      <IonNote slot="end">
        <IonInput
          inputmode="numeric"
          type="number"
          value={qty}
          className="addCartInput"
        ></IonInput>
      </IonNote>
    );

  render() {
    const {
      name,
      shortDescription,
      price_html,
      mainImage,
      clicked,
      qty
    } = this.props;
    return (
      <IonItem onClick={clicked}>
        <IonThumbnail slot="start">
          <img src={this.mapImage(mainImage)} alt={name} />
        </IonThumbnail>
        <IonLabel className="label-description">
          <h2>{name}</h2>
          <h3 dangerouslySetInnerHTML={this.setWooHtml(shortDescription)}></h3>

          <IonChip>
            <IonIcon icon={cash}></IonIcon>
            <span dangerouslySetInnerHTML={this.setWooHtml(price_html)}></span>
            <IonIcon icon={pricetag}></IonIcon>
          </IonChip>
        </IonLabel>
        {this.displayQuantity(qty)}
      </IonItem>
    );
  }
}

export default ProductItems;
