import React, { Component } from "react";
import ProductListing from "../../interfaces/ProductListing.interface";
import { IonThumbnail, IonLabel, IonChip, IonIcon, IonItem } from "@ionic/react";
import { cash, pricetag } from "ionicons/icons";


class ProductItems extends Component <ProductListing> {

    setWooHtml = htmlString => {
        return {__html: htmlString};
    }
    
    render () {
        const { name, shortDescription, price_html } = this.props;
        return (
             <IonItem>
                   <IonThumbnail item-left></IonThumbnail>
                    <IonLabel>   
                        <h2>{name}</h2> 
                        <h3 dangerouslySetInnerHTML={this.setWooHtml(shortDescription)}></h3>
                        <IonChip>
                            <IonIcon icon={cash}></IonIcon>
                            <span dangerouslySetInnerHTML={this.setWooHtml(price_html)}></span>
                            <IonIcon icon={pricetag}></IonIcon>
                        </IonChip>
                    </IonLabel>
             </IonItem>
        )
    }
}

export default ProductItems