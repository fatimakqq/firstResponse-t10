import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';
import { cog, filterOutline, arrowDownOutline } from 'ionicons/icons';
import Store from '../../store';
import { getEmLogInfo } from '../../store/selectors';
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
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from '@ionic/react';

const emergencyTypes = [
  "All",
  "Concussion",
  "Seizure",
  "Fainting",
  "Migraine",
  "Fever",
  "Allergic Reaction",
  "Asthma Attack"
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Location A-Z", value: "location" },
  { label: "Emergency Type A-Z", value: "type" }
];

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

const Emergencies = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const emLogInfo = Store.useState(getEmLogInfo);

  useEffect(() => {
    let filtered = [...emLogInfo];
    
    if (selectedType !== "All") {
      filtered = filtered.filter(log => log.title === selectedType);
    }
    
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "location":
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case "type":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredLogs(filtered);
  }, [selectedType, sortBy, emLogInfo]);

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
        
        <IonToolbar className="bg-gray-50">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex-1 mr-2">
              <IonItem lines="none" className="rounded-xl bg-white shadow-sm" style={{
                '--background': 'white'
              }}>
                <IonIcon icon={filterOutline} slot="start" style={{ color: 'rgb(22, 101, 52)' }} />
                <IonLabel className="font-manjari text-xl" style={{ color: 'rgb(30, 58, 138)' }}>Type</IonLabel>
                <IonSelect 
                  value={selectedType} 
                  onIonChange={e => setSelectedType(e.detail.value)}
                  interface="action-sheet"
                  interfaceOptions={{
                    header: 'Filter by Emergency Type'
                  }}
                  className="font-manjari text-xl"
                  style={{ color: 'rgb(30, 58, 138)' }}
                >
                  {emergencyTypes.map(type => (
                    <IonSelectOption key={type} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <IonIcon icon={arrowDownOutline} slot="end" style={{ color: 'rgb(22, 101, 52)' }} />
              </IonItem>
            </div>
            
            <div className="flex-1 ml-2">
              <IonItem lines="none" className="rounded-xl bg-white shadow-sm" style={{
                '--background': 'white'
              }}>
                <IonIcon icon={filterOutline} slot="start" style={{ color: 'rgb(22, 101, 52)' }} />
                <IonLabel className="font-manjari text-xl" style={{ color: 'rgb(30, 58, 138)' }}>Sort</IonLabel>
                <IonSelect 
                  value={sortBy} 
                  onIonChange={e => setSortBy(e.detail.value)}
                  interface="action-sheet"
                  interfaceOptions={{
                    header: 'Sort Emergencies'
                  }}
                  className="font-manjari text-xl"
                  style={{ color: 'rgb(30, 58, 138)' }}
                >
                  {sortOptions.map(option => (
                    <IonSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <IonIcon icon={arrowDownOutline} slot="end" style={{ color: 'rgb(22, 101, 52)' }} />
              </IonItem>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: 'false', amount: 0.25 }}
        >
          <div className='grid grid-cols-1 gap-6'>
            {filteredLogs.map((log, index) => (
              <CustomButton
                key={log.logId}
                logId={log.logId}
                title={log.title}
                timeStart={log.timeStart}
                timeEnd={log.timeEnd}
                location={log.location}
                date={log.date}
              />
            ))}
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Emergencies;