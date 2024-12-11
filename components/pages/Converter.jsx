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
  IonToggle,
} from '@ionic/react';

import { useState, useEffect } from 'react';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { notificationsOutline, cog, heartHalf, flaskOutline } from 'ionicons/icons';

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
// New component for unit toggle
const UnitToggle = ({ isEnabled, onToggle, selectedMedication }) => {
  // Define which medications support unit toggle
  const supportsToggle = [
    'acetaminophen-adult',
    'acetaminophen-pediatric',
    'ibuprofen-adult',
    'ibuprofen-pediatric',
    'dipenhydramine',
    'glucose-adult',
    'glucose-pediatric',
    
  ].includes(selectedMedication);

  if (!supportsToggle) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-4">
      <div className="rounded-2xl bg-white shadow-md p-4 border border-green-800 border-opacity-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IonIcon icon={flaskOutline} className="text-blue-900 mr-2 text-xl" />
            <span className="text-gray-600">Toggle Unit Type</span>
          </div>
          <IonToggle
            checked={isEnabled}
            onIonChange={onToggle}
            className="custom-toggle"
          >
            <div slot="start" className="mr-1 text-sm">
              mg
            </div>
            <div slot="end" className="ml-1 text-sm">
              mL
            </div>
          </IonToggle>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Switch between solid (mg) and liquid (mL) form
        </p>
      </div>
    </div>
  );
};
const WeightCard = () => {
  const [inputValue, setInputValue] = useState(0);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [calculatedDosage, setCalculatedDosage] = useState(0);
  const [dosageUnit, setDosageUnit] = useState("mg");
  const [medicationName, setMedicationName] = useState("");
  const [isLiquidForm, setIsLiquidForm] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMedicationChange = (e) => {
    setSelectedMedication(e);
    setIsLiquidForm(false); // Reset to solid form when medication changes
    const names = {
      'acetaminophen-adult': 'Acetaminophen (Adult)',
      'acetaminophen-pediatric': 'Acetaminophen (Pediatric)',
      'albuterol': 'Albuterol',
      'aspirin': 'Aspirin',
      'dipenhydramine': 'Dipenhydramine',
      'epinephrine-adult': 'Epinephrine 1:1000 (Adult)',
      'epinephrine-pediatric': 'Epinephrine 1:1000 (Pediatric)',
      'glucose-adult': 'Glucose (Adult)',
      'glucose-pediatric': 'Glucose (Pediatric)',
      'ibuprofen-adult': 'Ibuprofen (Adult)',
      'ibuprofen-pediatric': 'Ibuprofen (Pediatric)',
      'igel-airway-device': 'I-gel Airway Device',
      'ipratropium-bromide': 'Ipratropium Bromide',
      'kilograms': 'Weight in Kilograms',
      'naloxone-adult': 'Naloxone (Adult)',
      'naloxone-pediatric': 'Naloxone (Pediatric)',
    };
    setMedicationName(names[e] || e);
  };

  // Conversion ratios for liquid forms (mg/mL)
  const liquidConcentrations = {
    'acetaminophen-adult': 100,    // 100mg/mL
    'acetaminophen-pediatric': 32, // 32mg/mL
    'ibuprofen-adult': 100,        // 100mg/mL
    'ibuprofen-pediatric': 40,     // 40mg/mL
    'dipenhydramine': 12.5,         // 12.5mg/mL
    'glucose-adult': 1000,         // 1g/mL (D50W is 0.5g/mL)
    'glucose-pediatric': 250
  };

  useEffect(() => {
    let dosage = 0;
    let unit = isLiquidForm ? "mL" : "mg";
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
      unit = "mL";
    } else if (selectedMedication === "aspirin") {
      dosage = 324;
    } else if (selectedMedication === "dipenhydramine") {
      dosage = 25;
    } else if (selectedMedication === "epinephrine-adult") {
      dosage = 0.5;
      unit = "mL";
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
      dosage = 10*kilos;
      if(dosage > 400) {
        dosage = 400;
      }
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
      unit = "mL";
    } else if (selectedMedication === "kilograms") {
      dosage = kilos;
      unit = "kg";
    } else if (selectedMedication === "naloxone-adult") {
      dosage = 1;
      unit = "mL";
    } else if (selectedMedication === "naloxone-pediatric") {
      dosage = 0.1*kilos;
      if(dosage > 0.5){
        dosage = 0.5;
      }
      unit = "mL";
    }

    // Convert to mL if liquid form is selected
    if (isLiquidForm && liquidConcentrations[selectedMedication]) {
      dosage = dosage / liquidConcentrations[selectedMedication];
      unit = "mL";
    }

    setCalculatedDosage(dosage);
    setDosageUnit(unit);
  }, [inputValue, selectedMedication, isLiquidForm]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <InputField onInputChange={handleInputChange}/>
        
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

        <MedicationDropdown 
          selectedMedication={selectedMedication}
          onMedicationChange={handleMedicationChange}
        />

        <UnitToggle 
          isEnabled={isLiquidForm}
          onToggle={(e) => setIsLiquidForm(e.detail.checked)}
          selectedMedication={selectedMedication}
        />

        {selectedMedication && inputValue > 0 && (
          <div className="w-full max-w-md mx-auto mt-6 px-4">
            <div className="rounded-2xl bg-white shadow-md p-6 border border-green-800 border-opacity-20 mb-4">
              <p className="text-gray-600 text-center">
                For a patient weighing <span className="font-bold text-blue-900">{inputValue} pounds</span>,
                administer the following dosage of <span className="font-bold text-blue-900">{medicationName}</span>
                {isLiquidForm ? " (liquid form)" : ""}:
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-green-800 to-blue-900 shadow-md p-8 text-center">
              <h4 className="text-4xl font-bold text-white"> 
                <span className="mr-3">
                  {calculatedDosage != null ? calculatedDosage.toFixed(3) : '-'}
                </span> 
                <span className="text-3xl opacity-90">{dosageUnit}</span>
              </h4>
              {dosageUnit === "Do Not Administer" || dosageUnit === "Do Not Use" ? (
                <p className="text-white mt-2 text-lg opacity-90">⚠️ {dosageUnit}</p>
              ) : null}
            </div>
          </div>
        )}
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
            <IonTitle className="text-blue-900">Convert Dosage</IonTitle>
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