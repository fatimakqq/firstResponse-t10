import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement } from 'chart.js';

// Register the necessary chart components
ChartJS.register(LinearScale, CategoryScale, BarElement);

const BarChart = () => {
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Patient Type',
        data: [40, 60],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'linear',
      },
    },
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bar Graph</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Bar data={data} options={options} />
      </IonContent>
    </IonPage>
  );
};

export default BarChart;
