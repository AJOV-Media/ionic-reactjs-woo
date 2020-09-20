import { IonChip, IonCol, IonIcon, IonLabel, IonRow } from '@ionic/react';
import { calendar, contract, mail, star } from 'ionicons/icons';
import React, { Component } from 'react';
import Reviews from '../../interfaces/Reviews.interface';

class ReviewItems extends Component<Reviews> {
  render() {
    const {
      id,
      date_created,
      status,
      reviewer,
      reviewer_email,
      review,
      rating
    } = this.props;
    return (
      <IonRow key={id}>
        <IonCol size="2">
          <strong> {reviewer} </strong> <br />
          {rating >= 1 ? <IonIcon size="small" icon={star}></IonIcon> : ''}
          {rating >= 2 ? <IonIcon size="small" icon={star}></IonIcon> : ''}
          {rating >= 3 ? <IonIcon size="small" icon={star}></IonIcon> : ''}
          {rating >= 4 ? <IonIcon size="small" icon={star}></IonIcon> : ''}
          {rating >= 5 ? <IonIcon size="small" icon={star}></IonIcon> : ''}
        </IonCol>
        <IonCol size="10">
          <IonChip color="secondary">
            <IonIcon icon={mail} color="primary" />
            <IonLabel color="dark">{reviewer_email}</IonLabel>
          </IonChip>
          <IonChip color="secondary">
            <IonIcon icon={calendar} color="primary" />
            <IonLabel color="dark">{date_created}</IonLabel>
          </IonChip>
          <IonChip color="secondary">
            <IonIcon icon={contract} color="primary" />
            <IonLabel color="dark"> {status}</IonLabel>
          </IonChip>

          <br />
          <span> {review} </span>
        </IonCol>
      </IonRow>
    );
  }
}

export default ReviewItems;
