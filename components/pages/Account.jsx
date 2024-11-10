import {
    IonPage,
    IonHeader,
    IonItem,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonToggle,
    IonLabel,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonBackButton,
    IonAvatar,
    IonInput,
  } from '@ionic/react';

import { Redirect, Route, Link, useHistory, } from 'react-router-dom';
import { arrowBack, pencilOutline } from 'ionicons/icons';
import Store from '../../store';
import { useState } from 'react';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';


const Account = () => {
    const account = Store.useState(selectors.account);
    const history = useHistory();
    const handleBackClick = () => {
        history.goBack();
    }

return (
    <IonPage>
        <IonHeader>
    <IonToolbar>
        <IonButtons slot="start">
        <IonBackButton defaultHref="/tabs/settings" onClick={handleBackClick} />
        </IonButtons>
        <IonTitle class = "ion-text-center" size="large" >Account</IonTitle>
    </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <div className="profile-picture-container ion-text-center">
          <IonAvatar>
            <img alt="Profile" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar>
        </div>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput type="text"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput type="text"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contact Number</IonLabel>
          <IonInput type="tel"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Birthdate:</IonLabel>
          <IonInput type="date"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Gender</IonLabel>
          <IonInput type="text"></IonInput>
        </IonItem>
        <IonButton expand="block">Save Changes</IonButton>
      </IonContent>
    </IonPage>

    );  
};

export default Account;