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
  IonLabel,
  IonCardContent,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { useState } from 'react';
import { callOutline, mailOutline, cog, chevronDown, chevronUp } from 'ionicons/icons';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandableSection = ({ title, subtitle, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start justify-between text-left"
      >
        <div>
          <h3 className="text-blue-900 font-bold">{title}</h3>
          <p className="text-green-800">{subtitle}</p>
        </div>
        <IonIcon
          icon={isExpanded ? chevronUp : chevronDown}
          className="text-blue-900 mt-1 ml-2"
        />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 pl-4 text-gray-700 space-y-2">
              {content.map((step, index) => (
                <div key={index} className="flex">
                  <span className="font-semibold mr-2">{index + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Help() {
  const sections = [
    {
      title: "How do I see which tasks to complete?",
      content: [
        "Tap on the 'My Tasks' page on the navbar",
        "View an automatically generated list of your tasks for today",
        "Pre-Response tasks should be completed before you arrive on site of an emergency",
        "During Response tasks should be completed on site of an emergency",
        "Post-Response tasks can be completed after your shift is complete.",
        "You will receive a success notification if you complete all of today's tasks. Great work!",
      ]
    },
    {
      title: "How do I complete my PRE-RESPONSE tasks?",
      subtitle: "Viewing emergency logs",
      content: [
        "Tap on the 'Emergency Logs' page on the navbar",
        "Active emergencies are marked with a flashing red indicator",
        "Tap on an emergency to view detailed information",
        "Review patient information such as age, and weight",
      ]
    },
    {
      title: "How do I complete my DURING-RESPONSE tasks?",
      subtitle: "Calculating medical dosages",
      content: [
        "Tap on the 'Converter' page on the navbar",
        "Enter the patient's weight in kilograms or pounds",
        "Select the medication from the dropdown menu",
        "Use the units toggle to switch between g to mL units for medication",
        "The converter automatically calculates the correct dosage",
      ]
    },
    {
      title: "How do I complete my POST-RESPONSE tasks?",
      subtitle: "Tracking your stats and shifts",
      content: [
        "TO VIEW PERSONAL REPORTS:",
        "Tap on the 'Reports' page on the navbar",
        "Select timeframe from dropdown (today, this week, this month)",
        "Graphs will be generated to reflect calls by type and your personal response times",
        "To see more detailed numerical data, tap on any bar/point on the graphs",
        "TO VIEW YOUR SHIFTS:",
        "Tap on the 'My Shifts' page on the navbar",
        "Tap on a shift to view more information about the shift, such as date, time, and coworkers",

      ]
    },

  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className="text-blue-900">Help</IonTitle>
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
            <IonCardSubtitle className="text-green-800 font-semibold">
              Welcome to FirstResponse. Our mission is to create the best possible user experience for EMTs.
            </IonCardSubtitle>
            <IonCardTitle className="text-blue-900 text-xl font-bold">
              Frequently Asked Questions (FAQs):
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="space-y-2 mb-6">
              {sections.map((section, index) => (
                <ExpandableSection
                  key={index}
                  title={section.title}
                  subtitle={section.subtitle}
                  content={section.content}
                />
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-blue-900 font-bold mb-3">Need Additional Help?</h3>
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

export default Help;