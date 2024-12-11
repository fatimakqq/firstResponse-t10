import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
} from '@ionic/react';
import { cog } from 'ionicons/icons';
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Reports = () => {
  const callsByTypeRef = useRef(null);
  const responseTimesRef = useRef(null);
  const chartInstancesRef = useRef([]);

  useEffect(() => {
    let mounted = true;

    const initializeCharts = async () => {
      try {
        console.log('Initializing charts...');

        // Cleanup existing charts
        chartInstancesRef.current.forEach(chart => {
          if (chart) {
            chart.destroy();
          }
        });
        chartInstancesRef.current = [];

        // Shared chart styles and options
        const chartStyle = {
          backgroundColor: 'rgba(22, 101, 52, 0.2)',
          borderColor: 'rgba(22, 101, 52, 1)',
        };

        const commonOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              },
              ticks: {
                padding: 10,
                color: '#1e3a8a',
                font: {
                  size: 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#1e3a8a',
                font: {
                  size: 12
                }
              }
            }
          }
        };

        // Initialize calls chart
        if (callsByTypeRef.current && mounted) {
          const ctx = callsByTypeRef.current.getContext('2d');
          
          const callsChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Trauma', 'Fall', 'Dizzy', 'Injury', 'Intox'],
              datasets: [{
                data: [12, 4, 3, 8, 2],
                backgroundColor: chartStyle.backgroundColor,
                borderColor: chartStyle.borderColor,
                borderWidth: 2
              }]
            },
            options: {
              ...commonOptions,
              scales: {
                ...commonOptions.scales,
                y: {
                  ...commonOptions.scales.y,
                  title: {
                    display: true,
                    text: 'Number of Calls',
                    color: '#1e3a8a',
                    font: {
                      size: 14,
                      weight: 'bold'
                    }
                  },
                  ticks: {
                    stepSize: 2,
                    callback: function(value) {
                      return value.toFixed(0);
                    }
                  }
                }
              }
            }
          });
          
          chartInstancesRef.current.push(callsChart);
        }

        // Initialize response times chart
        if (responseTimesRef.current && mounted) {
          const lineCtx = responseTimesRef.current.getContext('2d');
          
          const responseChart = new Chart(lineCtx, {
            type: 'line',
            data: {
              labels: ['Dec 1-7', 'Dec 8-14', 'Dec 15-21','Dec 22-28' ],
              datasets: [{
                data: [24, 27, 26, 29],
                borderColor: chartStyle.borderColor,
                tension: 0.1,
                fill: false
              }]
            },
            options: {
              ...commonOptions,
              scales: {
                ...commonOptions.scales,
                y: {
                  ...commonOptions.scales.y,
                  title: {
                    display: true,
                    text: 'Minutes',
                    color: '#1e3a8a',
                    font: {
                      size: 14,
                      weight: 'bold'
                    }
                  },
                  ticks: {
                    stepSize: 5,
                    callback: function(value) {
                      return value + ' min';
                    }
                  }
                }
              },
              plugins: {
                ...commonOptions.plugins,
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return `${context.parsed.y} minutes`;
                    }
                  }
                }
              }
            }
          });
          
          chartInstancesRef.current.push(responseChart);
        }

      } catch (error) {
        console.error('Error initializing charts:', error);
      }
    };

    const timer = setTimeout(() => {
      if (mounted) {
        initializeCharts();
      }
    }, 1000);

    return () => {
      mounted = false;
      clearTimeout(timer);
      chartInstancesRef.current.forEach(chart => chart?.destroy());
      chartInstancesRef.current = [];
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <IonButtons slot="start">
            <IonMenuButton className="text-blue-900" />
          </IonButtons>
          <IonTitle className="text-blue-900">My Stats</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/tabs/settings" className="text-blue-900">
              <IonIcon icon={cog} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-gray-100">
        <div className="p-4">
          <select className="w-full bg-white text-blue-900 font-medium rounded-xl border border-green-800 border-opacity-20 py-2 px-4 focus:ring-2 focus:ring-blue-900 mb-6">
            <option value="month">Last 30 days</option>
            <option value="week">Last 1 week</option>
            <option value="year">Last 1 year</option>
          </select>

          <div className="space-y-6">
            <IonCard className="rounded-2xl shadow-md">
              <div className="p-4 bg-gradient-to-r from-green-800 to-blue-900">
                <h2 className="text-white text-xl font-bold text-center">Calls By Type</h2>
              </div>
              <div className="p-4">
                <div className="relative h-[300px] w-full">
                  <canvas ref={callsByTypeRef} />
                </div>
              </div>
            </IonCard>

            <IonCard className="rounded-2xl shadow-md">
              <div className="p-4 bg-gradient-to-r from-green-800 to-blue-900">
                <h2 className="text-white text-xl font-bold text-center">Response Times</h2>
              </div>
              <div className="p-4">
                <div className="relative h-[300px] w-full">
                  <canvas ref={responseTimesRef} />
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-900 text-sm">
                    <strong>What does this mean?</strong><br/>
                    This graph shows the average response time for emergency calls.
                    Target response time is under 25 minutes.
                  </p>
                </div>
              </div>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Reports;