import { IonCol, IonIcon, IonRow } from '@ionic/react';
import { star } from 'ionicons/icons';
import React, { Component } from 'react';
import Reviews from '../../interfaces/Reviews.interface';

class ReviewItems extends Component<Reviews> {
  render() {
    const {
      id,
      date_created,
      product_id,
      status,
      reviewer,
      reviewer_email,
      review,
      rating,
      varified
    } = this.props;
    return (
      <IonRow key={id}>
        <IonCol size="2">
          <strong> {reviewer} </strong>
          {rating >= 1 ? <IonIcon size="small" name={star}></IonIcon> : ''}
          {rating >= 2 ? <IonIcon size="small" name={star}></IonIcon> : ''}
          {rating >= 3 ? <IonIcon size="small" name={star}></IonIcon> : ''}
          {rating >= 4 ? <IonIcon size="small" name={star}></IonIcon> : ''}
          {rating >= 5 ? <IonIcon size="small" name={star}></IonIcon> : ''}
        </IonCol>
        <IonCol size="10">
          <strong> {reviewer_email} </strong>
          <small>{date_created}</small>
          <span> {review} </span>
        </IonCol>
      </IonRow>
    );
  }
}

export default ReviewItems;
