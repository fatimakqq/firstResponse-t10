import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonList,
  IonSelect,
  IonContent,
  IonSelectOption,
  IonCard,
  IonImg,
} from '@ionic/react';

import { useState, useEffect } from 'react';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { notificationsOutline, cog, heartHalf, scaleOutline } from 'ionicons/icons';

const InputField = ({onInputChange}) => (
<div className="w-full max-w-md mx-auto pt-8 px-4">
  <div className="relative rounded-2xl bg-white shadow-md p-6 border border-green-800 border-opacity-20">
    <input
      type="text"
      name="pounds"
      id="pounds"
      className="text-4xl font-bold w-full rounded-xl border-0 py-3 pr-20 text-blue-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-900 bg-gray-50"
      placeholder="0.0"
      onChange={onInputChange}
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-8">
      <span className="text-3xl font-bold text-green-800">
        LBS
      </span>
    </div>
    <label className="block text-center mt-2 text-sm font-medium text-green-800">
      Enter patient weight in pounds
    </label>
  </div>
</div>
);

const MedicationDropdown = ({selectedMedication, onMedicationChange}) => {
const handleSelectChange = (e) => {
  onMedicationChange(e.target.value);
};

return (
  <div className="w-full max-w-md mx-auto px-4 mt-4">
    <div className="rounded-2xl bg-white shadow-md p-6 border border-green-800 border-opacity-20">
      <select 
        className="w-full text-lg rounded-xl border-green-800 border-opacity-20 py-3 px-4 text-blue-900 bg-gray-50 focus:ring-2 focus:ring-blue-900"
        value={selectedMedication || ''}
        onChange={handleSelectChange}
      >
        <option value="" disabled selected>Select Medication</option>
        <option value="acetaminophen-adult">Acetaminophen - Adult</option>
        <option value="acetaminophen-pediatric">Acetaminophen - Pediatric</option>
        <option value="albuterol">Albuterol</option>
        <option value="aspirin">Aspirin</option>
        <option value="dipenhydramine">Dipenhydramine</option>
        <option value="epinephrine-adult">Epinephrine 1:1000 - Adult</option>
        <option value="epinephrine-pediatric">Epinephrine 1:1000 - Pediatric</option>
        <option value="glucose-adult">Glucose - Adult</option>
        <option value="glucose-pediatric">Glucose - Pediatric</option>
        <option value="ibuprofen-adult">Ibuprofen - Adult</option>
        <option value="ibuprofen-pediatric">Ibuprofen - Pediatric</option>
        <option value="igel-airway-device">I-gel Airway Device</option>
        <option value="ipratropium-bromide">Ipratropium Bromide</option>
        <option value="kilograms">Kilograms</option>
        <option value="naloxone-adult">Naloxone - Adult</option>
        <option value="naloxone-pediatric">Naloxone - Pediatric Opioid Exposure</option>
      </select>
    </div>
  </div>
);
};

const WeightCard = () => {
const [inputValue, setInputValue] = useState(0);
const [selectedMedication, setSelectedMedication] = useState(null);
const [calculatedDosage, setCalculatedDosage] = useState(0);
const [dosageUnit, setDosageUnit] = useState("mL");

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

const handleMedicationChange = (e) => {
  setSelectedMedication(e);
};

useEffect(() => {
  let dosage = 0;
  let unit = "mg";
  let kilos = inputValue/2.205;
  
  if (selectedMedication === "acetaminophen-adult") {
    dosage = 500;
  } else if (selectedMedication === "acetaminophen-pediatric") {
    dosage = 15*kilos;
    if(dosage>=1000){
      dosage = 1000;
    }
  } else if (selectedMedication === "albuterol") {
    dosage = 2.5;
  } else if (selectedMedication === "aspirin") {
    dosage = 324;
  } else if (selectedMedication === "dipenhydramine") {
    dosage = 25;
  } else if (selectedMedication === "epinephrine-adult") {
    dosage = 0.5;
  } else if (selectedMedication === "epinephrine-pediatric") {
    unit = "mL";
    if(kilos > 0 && kilos <5){
      dosage = null;
      unit = "Do Not Administer";
    } else if(kilos >= 5 && kilos < 10){
      dosage = 0.05;
      unit = "-0.1 mL";
    } else if(kilos >= 10 && kilos < 15){
      dosage = 0.1;
    } else if(kilos >= 15 && kilos < 20){
      dosage = 0.15;
    } else if(kilos >= 20 && kilos < 25){
      dosage = 0.2;
    } else if(kilos >= 25 && kilos < 30){
      dosage = 0.25;
    } else if(kilos >= 30){
      dosage = 0.3;
    }
  } else if (selectedMedication === "glucose-adult") {
    dosage = 15;
    unit = "g";
  } else if (selectedMedication === "glucose-pediatric") {
    unit = "mL";
    if(kilos < 10){
      dosage = 5;
    } else if(kilos >= 10 && kilos < 13){
      dosage = 7.5;
    } else if(kilos >= 13 && kilos < 18){
      dosage = 0.25;
      unit = "tube";
    } else if(kilos >= 18 && kilos < 22){
      dosage = 0.5;
      unit = "tube";
    } else {
      dosage = 15;
      unit = "g";
    }
  } else if (selectedMedication === "ibuprofen-adult") {
    dosage = 600;
  } else if (selectedMedication === "ibuprofen-pediatric") {
    dosage = 10;
  } else if (selectedMedication === "igel-airway-device") {
    unit = "I-gel";
    if(kilos > 0 && kilos < 25){
      dosage = null;
      unit = "Do Not Use";
    } else if(kilos >=25 && kilos <35){
      dosage = 2.5;
    } else if(kilos >=35 && kilos <60){
      dosage = 3.0;
    } else if(kilos >=60 && kilos <90){
      dosage = 4.0;
    } else {
      dosage = 5.0;
    }
  } else if (selectedMedication === "ipratropium-bromide") {
    dosage = 0.5;
  } else if (selectedMedication === "kilograms") {
    dosage = kilos;
    unit = "kg";
  } else if (selectedMedication === "naloxone-adult") {
    dosage = 1;
  } else if (selectedMedication === "naloxone-pediatric") {
    dosage = 0.1*kilos;
    if(dosage > 0.5){
      dosage = 0.5;
    }
  }
  setCalculatedDosage(dosage);
  setDosageUnit(unit);
}, [inputValue, selectedMedication]);

return (
  <div className="min-h-screen bg-gray-100">
    <div className="py-6">
      {/* Weight Input Section */}
      <InputField onInputChange={handleInputChange}/>
      
      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-green-800 border-opacity-20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-100 px-4 text-sm text-green-800 font-semibold">
            CONVERT TO
          </span>
        </div>
      </div>

      {/* Medication Selection */}
      <MedicationDropdown 
        selectedMedication={selectedMedication}
        onMedicationChange={handleMedicationChange}
      />

      {/* Result Display */}
      <div className="w-full max-w-md mx-auto mt-6 px-4">
        <div className="rounded-2xl bg-gradient-to-br from-green-800 to-blue-900 shadow-md p-8 text-center">
          <h4 className="text-4xl font-bold text-white"> 
            <span className="mr-3">
              {calculatedDosage != null ? calculatedDosage.toFixed(3) : '-'}
            </span> 
            <span className="text-3xl opacity-90">{dosageUnit}</span>
          </h4>
        </div>
      </div>
    </div>
  </div>
);
};

const Converter = () => {
return (
  <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className=" text-blue-900">Convert Dosage</IonTitle>
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
    
    <IonContent className="bg-gray-100">
      <WeightCard/>
    </IonContent>
  </IonPage>
);
};

export default Converter;