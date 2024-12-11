'use client';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';
import "tailwindcss/tailwind.css";
import Card from '../ui/Card';
import { getSession } from 'next-auth/react'
import { useSession } from "next-auth/react"
import { useNavigate } from "react-router-dom";
import Notifications from './Notifications';
import { useState, useEffect } from 'react';
import { notificationsOutline, cog, heartHalf } from 'ionicons/icons';
import { getEmLogInfo, getHomeItems } from '../../store/selectors';
import Store from '../../store';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import IndividualLog from './IndividualLog';
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
  IonRouterOutlet,
} from '@ionic/react';
import Settings from './Settings';
import Tabs from './Tabs'

const CustomButton = ({ title, timeStart, timeEnd, location, date, logId }) => {
  return (
    <div className="w-400 mx-30 h-84">
      <IonItem routerLink={`/tabs/emergencies/log/${logId}`} routerDirection="forward">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "blue", borderRadius: "30px"}}
          whileTap={{ scale: 0.95 }}
          className="w-full h-full border text-white font-bold py-2 px-4 rounded-2xl"
          style={{ 
            background: 'linear-gradient(to bottom right, rgba(22, 101, 52, 0.9), rgba(30, 58, 138, 0.9))',
            borderColor: 'rgba(22, 101, 52, 0.3)'
          }}
        >
          <div className="p-2 flex justify-between">
            <div>
              <h2 className="text-left text-4xl font-manjari leading-8 pb-0">{title}</h2>
              <h3 className="text-left text-2xl font-manjari leading-6 mt-2">{timeStart} - {timeEnd}</h3> 
              <h3 className="text-left text-2xl font-manjari leading-5 mt-2 opacity-90">{date}</h3>
            </div>
            <div className="text-right">
              <h3 className="text-right text-2xl font-manjari">{location}</h3>
            </div>
          </div>
        </motion.button>
      </IonItem>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/tabs/login',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}

const Emergencies = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [emergencies, setEmergencies] = useState([]);
  const emLogInfo = Store.useState(getEmLogInfo);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/emergency");
        const data = await response.json();
        setEmergencies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmergencies();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className="text-blue-900">Emergency Logs</IonTitle>
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
      
      <IonContent className="ion-padding" fullscreen>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

        <div id="animation-circle" className="relative">
          <div className="absolute z-50 right-0 -mt-2 ml-8 w-8 h-8 rounded-full bg-red-700 animate-ping"></div>
          <div className="absolute z-50 right-0 -mt-2 ml-8 w-8 h-8 rounded-full bg-red-700"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: 'false', amount: 0.25 }}
        >
          <div className='grid grid-cols-1 gap-6'>
            {emLogInfo.map((log, index) => (
              log.logId == 4 ? (
                <React.Fragment key={index}>
                  <CustomButton
                    logId={log.logId}
                    title={log.title}
                    time={log.time}
                    location={log.location}
                    date={log.date}
                    timeStart={log.timeStart}
                    timeEnd={log.timeEnd}
                  />
                </React.Fragment>
              ) : (
                <CustomButton
                  logId={log.logId}
                  title={log.title}
                  time={log.time}
                  location={log.location}
                  date={log.date}
                  timeStart={log.timeStart}
                  timeEnd={log.timeEnd}
                />
              )
            ))}
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Emergencies;