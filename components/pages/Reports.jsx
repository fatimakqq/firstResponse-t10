import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
} from '@ionic/react';

import { callOutline, mailOutline, cog } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Reports = () => {
  useEffect(() => {
    // Common styling for all charts
    const chartStyle = {
      backgroundColor: [
        'rgba(22, 101, 52, 0.2)', // green-800 with opacity
        'rgba(30, 58, 138, 0.2)', // blue-900 with opacity
      ],
      borderColor: [
        'rgba(22, 101, 52, 1)', // green-800
        'rgba(30, 58, 138, 1)', // blue-900
      ]
    };

    // Calls by type chart
    const canvas = document.getElementById('callsByTypeBar');
    const ctx = canvas.getContext('2d');
    const data = {
      labels: ['Trauma', 'Fall', 'Dizziness', 'Injury', 'Intoxication', 'Abdominal Pain', 'Seizure', 'Illness', 'Breathing', 'Syncope'],
      datasets: [{
        label: 'Number of Calls',
        data: [12, 4, 3, 8, 2, 3, 4, 5, 7, 2],
        backgroundColor: Array(10).fill().map((_, i) => i % 2 === 0 ? chartStyle.backgroundColor[0] : chartStyle.backgroundColor[1]),
        borderColor: Array(10).fill().map((_, i) => i % 2 === 0 ? chartStyle.borderColor[0] : chartStyle.borderColor[1]),
        borderWidth: 2
      }]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Incidents',
            color: '#1e3a8a' // blue-900
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    };

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    // Response times chart with enhanced info
    const lineCanvas = document.getElementById('responseTimesLine');
    const lineCtx = lineCanvas.getContext('2d');
    const lineData = {
      labels: ['Apr 1-7', 'Apr 8-14', 'Apr 15-21', 'Apr 22-28', 'Apr 29-31'],
      datasets: [{
        label: 'Average Response Time',
        data: [24, 27, 26, 22, 24],
        fill: false,
        borderColor: chartStyle.borderColor[0],
        lineTension: 0.1
      }]
    };

    const lineOptions = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Time (minutes)',
            color: '#1e3a8a'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} minutes`;
            }
          }
        }
      }
    };

    new Chart(lineCtx, {
      type: 'line',
      data: lineData,
      options: lineOptions
    });

    // ... [Rest of your chart initializations with updated colors] ...

  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className="text-blue-900">My Stats</IonTitle>
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
        {/* Time Period Selector */}
        <div className="flex justify-center pt-6 pb-4">
          <select className="bg-white text-blue-900 font-medium rounded-xl border border-green-800 border-opacity-20 py-2 px-4 focus:ring-2 focus:ring-blue-900">
            <option value="month" selected>Last 30 days</option>
            <option value="week">Last 1 week</option>
            <option value="year">Last 1 year</option>
          </select>
        </div>

        {/* Charts Section */}
        <div className="space-y-6 px-4">
          {/* Calls By Type */}
          <IonCard className="rounded-2xl shadow-md overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-green-800 to-blue-900">
              <h2 className="text-white text-xl font-bold text-center">Calls By Type</h2>
            </div>
            <div className="p-4">
              <canvas id="callsByTypeBar"></canvas>
            </div>
          </IonCard>

          {/* Response Times */}
          <IonCard className="rounded-2xl shadow-md overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-green-800 to-blue-900">
              <h2 className="text-white text-xl font-bold text-center">Response Times</h2>
            </div>
            <div className="p-4">
              <canvas id="responseTimesLine"></canvas>
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-blue-900 text-sm">
                  <strong>What does this mean?</strong><br/>
                  This graph shows the average time taken to respond to emergency calls. 
                  Response time is measured from initial call receipt to arrival on scene. 
                  Target response time is under 25 minutes.
                </p>
              </div>
            </div>
          </IonCard>

          {/* Remaining charts with similar styling... */}
          {/* Each chart gets wrapped in an IonCard with gradient header */}
          {/* Add your remaining charts here with the same structure */}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Reports;