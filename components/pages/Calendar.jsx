'use client';
import {
  IonPage,
  IonButton,
  IonDatetime,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from '@ionic/react';

import { motion } from 'framer-motion';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import React from 'react';
import { heartHalf, cog } from 'ionicons/icons';

const CustomButton = ({ timeStart, timeEnd, date, shiftID }) => {
  return (
    <div className="w-400 mx-30 h-84">
      <IonItem routerLink={`/shift/${shiftID}`} routerDirection="forward"> 
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
              <h2 className="text-left text-3xl font-manjari leading-8 pb-0">{timeStart} - {timeEnd}</h2>
              <h3 className="text-left text-xl font-manjari leading-5 mt-2 opacity-90">Tap to see details</h3>
            </div>
            <div className="text-right">
              <h3 className="text-right text-2xl font-manjari">{date}</h3>
            </div>
          </div>
        </motion.button>
      </IonItem>
    </div>
  );
};

const Calendar = () => {
  const calendar = Store.useState(selectors.getCalendar);
  const calendarInfo = Store.useState(selectors.getCalendarInfo);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className="text-blue-900">Calendar</IonTitle>
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: 'false', amount: 0.25 }}
        >
          <div className='grid grid-cols-1 gap-6'>
            {calendarInfo.map((log, index) => (
              log.shiftID == 2 ? (
                <React.Fragment key={index}>
                  <CustomButton
                    shiftID={log.logId}
                    time={log.time}
                    date={log.date}
                    timeStart={log.timeStart}
                    timeEnd={log.timeEnd}
                  />
                </React.Fragment>
              ) : (
                <CustomButton
                  shiftID={log.logId}
                  time={log.time}
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

export default Calendar;