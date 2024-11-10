'use client';
import React from 'react';
import { useLocation, Route, useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonModal,
  IonItem,
  IonList,
  IonBackButton,
  IonRouterOutlet
} from '@ionic/react';
import { chevronBackOutline, peopleOutline, timeOutline, calendarOutline } from 'ionicons/icons';

const IndividualShift = ({ match }) => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <IonButtons slot="start">
            <IonBackButton 
              className="text-blue-900" 
              defaultHref="/tabs/calendar" 
              icon={chevronBackOutline}
              text="Back"
            />
          </IonButtons>
          <IonTitle className="text-blue-900 font-bold">Shift Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-gray-100">
        <div className="p-4 space-y-4">
          {/* Date Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={calendarOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">Date</h2>
            </div>
            <div className="p-4">
              <p className="text-lg text-gray-800">5/26/2024</p>
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={timeOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">Time</h2>
            </div>
            <div className="p-4">
              <p className="text-lg text-gray-800">8AM - 12PM</p>
            </div>
          </div>

          {/* On Shift Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={peopleOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">On Shift</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {['Rudra Amin', 'Faris Kazi'].map((name, index) => (
                <div key={index} className="p-4">
                  <p className="text-lg text-gray-800">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Not On Shift Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={peopleOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">Not On Shift</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {['Jin Ryong Kim', 'Fatima Khalid'].map((name, index) => (
                <div key={index} className="p-4">
                  <p className="text-lg text-gray-800">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>

      <IonRouterOutlet>
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default IndividualShift;