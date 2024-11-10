import React, { useState, useEffect } from 'react';
import { useLocation, Route } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonList,
  IonBackButton,
  IonRouterOutlet,
  IonAccordionGroup,
  IonAccordion,
} from '@ionic/react';
import { 
  chevronBackOutline, 
  locationOutline, 
  timeOutline, 
  personOutline,
  informationCircleOutline,
  chatbubbleEllipsesOutline,
  helpCircleOutline,
  arrowForward
} from 'ionicons/icons';
import Store from '../../store';
import { getEmLogInfo } from '../../store/selectors';

const MapCard = ({index}) => {
  const [map, setMap] = useState(null);
  const [steps, setSteps] = useState([]);
  const [eta, setEta] = useState(null);
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const emLogInfo = Store.useState(getEmLogInfo);

  useEffect(() => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDWhhJfm9B9r5evrHoSDWRUQX3gr6ac2W4`;
      script.onload = () => {
          const newMap = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 },
            styles: [
              { elementType: "geometry", stylers: [{ color: "#1e233b" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d17d3b" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d17d3b" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    "color": "#d85f0e"
                  },
                  {
                    "weight": 6
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
            zoom: 17,
          });
          setMap(newMap);

          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer = new window.google.maps.DirectionsRenderer();
          directionsRenderer.setMap(newMap);
          navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              const origin = new window.google.maps.LatLng(latitude, longitude);
              const destination = emLogInfo[index].mapLocation;
              const request = {
                origin,
                destination,
                travelMode: 'DRIVING',
              };
              directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                  directionsRenderer.setDirections(result);
                  const steps = result.routes[0].legs[0].steps;
                  setSteps(steps);
                  const eta = result.routes[0].legs[0].duration.text;
                  setEta(eta);
                }
              });
              newMap.setCenter(origin);
            });
      };
      document.head.appendChild(script);
  }, [emLogInfo, index]);

  return (
    <div className="space-y-4">
      <div id="map" className="rounded-xl overflow-hidden" style={{ height: '30vh', width: '100%' }} />
      
      {eta && (
        <div className="p-3 bg-gradient-to-r from-green-800 to-blue-900 text-white rounded-xl">
          <p className="text-center font-bold">ETA: {eta}</p>
        </div>
      )}

      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" className="rounded-t-xl bg-gradient-to-r from-green-800 to-blue-900">
            <IonLabel className="text-white font-bold">Directions</IonLabel>
          </IonItem>
          <div slot="content" style={{ maxHeight: '28vh', overflow: 'auto' }} className="p-4 bg-white rounded-b-xl">
            <ol className="space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="text-gray-800" 
                    dangerouslySetInnerHTML={{ __html: step.instructions }}>
                </li>
              ))}
            </ol>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

const IndividualLog = (props) => {
  const emLogInfo = Store.useState(getEmLogInfo);
  const index = props.location.pathname.split("/").pop();

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
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="space-y-6">
          {/* Title and Time Section */}
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
            </div>
          </div>



          {/* Enhanced Chatbot Section */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-800 border-opacity-20">
            <div className="p-1 pl-3 bg-gradient-to-r from-green-800 to-blue-900 text-white flex items-center">
              <IonIcon icon={helpCircleOutline} className="h-6 w-6 mr-2"/>
              <h2 className="text-xl font-bold">Treatment Chatbot</h2>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-gray-600">
                Need guidance on treating head injuries? Our AI assistant can help with:
              </p>
              <ul className="list-disc list-inside text-gray-800 ml-2">
                <li>Treatment protocols</li>
                <li>Best practices</li>
                <li>Safety guidelines</li>
              </ul>
              <IonItem 
                button 
                detail={true} 
                lines="none" 
                className="mt-2 --ion-item-background: transparent;"
              >
                <IonIcon icon={chatbubbleEllipsesOutline} slot="start" className="text-green-800" />
                <IonLabel className="text-blue-900 font-semibold">Open Chatbot</IonLabel>
              </IonItem>
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

export default IndividualLog;