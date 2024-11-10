import {
    IonPage,
    IonHeader,
    IonItem,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonContent,
    IonList,
    IonIcon,
    IonToggle,
    IonLabel,
    IonCardContent,
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonSelect,
    IonSelectOption,
    IonOption,
  } from '@ionic/react';

import "tailwindcss/tailwind.css";
import { Redirect, Route, Link, } from 'react-router-dom';
import { filter } from 'ionicons/icons';
import Store from '../../store';
import { useState } from 'react';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import { callOutline, mailOutline, cog, } from 'ionicons/icons';


//<IonSelectOption value="">All Buildings</IonSelectOption> - ADD TO lINE 61 IF YOU WANT ALL BUILDINGS FILTER
//const [selectedBuilding, setSelectedBuilding] = useState(''); - CHANGE LINE 44 TO DISPLAY ALL BUILDINGS IF NO FILTER SELECTED

function Assets() {


  
  
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className=" text-blue-900">Help</IonTitle>
          </div>
          <IonButtons slot="start">
            <IonMenuButton className="text-blue-900" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/tabs/settings" className="text-blue-900">
              <IonIcon icon={cog} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
        <IonContent>
        <IonCard>
            <img src="https://raw.githubusercontent.com/acm-projects/Respondent/main/Photo-Drive-21.jpeg" alt="placeholder" />
            <IonCardHeader>
            <IonCardSubtitle className="text-green-800 font-semibold">Welcome to FirstResponse</IonCardSubtitle>
            <IonCardTitle className="text-blue-900 text-xl font-bold">Our mission is to create the best possible user experience for EMTs.</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="space-y-4">
            <div className="space-y-3">
              <p>
                <span className="text-blue-900 font-bold">Emergencies: </span>
                <span className="text-green-800">View emergency logs of active and past emergencies. The red flashing symbol indicates an active emergency.</span>
              </p>
              <p>
                <span className="text-blue-900 font-bold">Converter: </span>
                <span className="text-green-800">Convert medical dosages based on patient body weight.</span>
              </p>
              <p>
                <span className="text-blue-900 font-bold">Reports: </span>
                <span className="text-green-800">View your response time stats and other team reports.</span>
              </p>
              <p>
                <span className="text-blue-900 font-bold">Calendar: </span>
                <span className="text-green-800">View your upcoming shifts including coworkers and timings.</span>
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <IonList className="bg-transparent">
                <IonItem button href="tel:+18001234567" className="rounded-xl my-2" lines="none">
                  <IonIcon icon={callOutline} slot="start" className="text-green-800" />
                  <IonLabel className="text-blue-900 font-semibold">Call Us</IonLabel>
                </IonItem>
                <IonItem button href="mailto:support@example.com" className="rounded-xl my-2" lines="none">
                  <IonIcon icon={mailOutline} slot="start" className="text-green-800" />
                  <IonLabel className="text-blue-900 font-semibold">Email Us</IonLabel>
                </IonItem>
              </IonList>
            </div>
          </IonCardContent>
      </IonCard>
        </IonContent>
      </IonPage>
    );
  }

export default Assets;