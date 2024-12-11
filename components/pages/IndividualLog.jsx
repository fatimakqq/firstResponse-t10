import React from 'react';
import { useParams } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonBackButton,
} from '@ionic/react';
import { 
  chevronBackOutline, 
  personOutline,
  informationCircleOutline,
  helpCircleOutline,
  cog
} from 'ionicons/icons';
import Store from '../../store';
import { getEmLogInfo } from '../../store/selectors';

const IndividualLog = () => {
  const { id } = useParams();
  const emLogInfo = Store.useState(getEmLogInfo);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <IonButtons slot="start">
            <IonBackButton 
              className="text-blue-900" 
              defaultHref="/tabs/emergencies" 
              icon={chevronBackOutline}
              text="Back"
            />
          </IonButtons>
          <IonTitle className="text-blue-900 font-bold">Emergency Details</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/tabs/settings" className="text-blue-900">
              <IonIcon icon={cog} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-4 bg-gradient-to-r from-green-800 to-blue-900 text-white">
              <h1 className="text-2xl font-bold">Concussion</h1>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={personOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">Patient Information</h2>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-gray-800">John Doe</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Gender</p>
                <p className="text-gray-800">Male</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Age</p>
                <p className="text-gray-800">20</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Weight (lbs)</p>
                <p className="text-gray-800">135</p>
              </div>
            </div>
          </div>

          {/* Emergency Information */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={informationCircleOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">Emergency Information</h2>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <p className="text-gray-600 text-sm">Time</p>
                <p className="text-gray-800">3:45 PM</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Location</p>
                <p className="text-gray-800">Basketball Court</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Description</p>
                <p className="text-gray-800">Patient hit head during basketball game. Loss of consciousness for 30 seconds.</p>
              </div>
            </div>
          </div>


        </div>
      </IonContent>
    </IonPage>
  );
};

export default IndividualLog;