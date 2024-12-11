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
  const [selectedRange, setSelectedRange] = useState('month');
  const [dateRange, setDateRange] = useState('');
  const [chartDates, setChartDates] = useState([]);

  const callTypeDefinitions = {
    'Trauma': 'Physical injuries requiring immediate medical attention. Includes accidents, sports injuries, and physical trauma.',
    'Fall': 'Incidents involving falls from height or ground-level falls, particularly in elderly or at-risk patients.',
    'Dizzy': 'Episodes of dizziness, vertigo, or balance issues that may indicate underlying medical conditions.',
    'Injury': 'Non-trauma injuries including sprains, strains, cuts, and minor wounds requiring first aid.',
    'Intox': 'Cases involving alcohol or substance intoxication requiring medical evaluation or intervention.'
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatChartDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  const getResponseTimeData = (range) => {
    switch (range) {
      case 'week':
        return [23, 21, 26, 24, 22, 25, 23];
      case 'month':
        return [24, 20, 25, 22];
      case 'year':
        return [23, 24, 22, 25, 23, 26, 25, 24, 23, 22, 24, 23];
      default:
        return [24, 23, 25, 22];
    }
  };

  const generateChartDates = (range) => {
    const dates = [];
    const endDate = new Date();
    let startDate = new Date();
    let intervals;

    switch (range) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        intervals = 7;
        break;
      case 'month':
        startDate.setDate(endDate.getDate() - 30);
        intervals = 4;
        break;
      case 'year':
        startDate.setDate(endDate.getDate() - 365);
        intervals = 12;
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
        intervals = 4;
    }

    const intervalSize = Math.floor((endDate - startDate) / intervals);

    for (let i = 0; i < intervals; i++) {
      const intervalDate = new Date(startDate.getTime() + (intervalSize * i));
      const nextDate = new Date(intervalDate.getTime() + intervalSize);
      dates.push(`${formatChartDate(intervalDate)} - ${formatChartDate(nextDate)}`);
    }

    return dates;
  };

  useEffect(() => {
    const endDate = new Date();
    let startDate = new Date();

    switch (selectedRange) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case 'year':
        startDate.setDate(endDate.getDate() - 365);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    setDateRange(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    const newDates = generateChartDates(selectedRange);
    setChartDates(newDates);
  }, [selectedRange]);

  useEffect(() => {
    let mounted = true;

    const initializeCharts = async () => {
      try {
        chartInstancesRef.current.forEach(chart => {
          if (chart) {
            chart.destroy();
          }
        });
        chartInstancesRef.current = [];

        const chartStyle = {
          backgroundColor: 'rgba(22, 101, 52, 0.2)',
          borderColor: 'rgba(22, 101, 52, 1)',
        };

        const commonOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { display: false },
            tooltip: {
              position: 'nearest'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              },
              ticks: {
                padding: 5,
                color: '#1e3a8a',
                font: {
                  size: 11
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
                  size: 11
                }
              }
            }
          }
        };

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
                      size: 12,
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
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.parsed.y;
                      const definition = callTypeDefinitions[label];
                      return [
                        `Calls: ${value}`,
                        `Definition: ${definition}`
                      ];
                    }
                  }
                }
              }
            }
          });
          
          chartInstancesRef.current.push(callsChart);
        }

        if (responseTimesRef.current && mounted) {
          const lineCtx = responseTimesRef.current.getContext('2d');
          
          const responseChart = new Chart(lineCtx, {
            type: 'line',
            data: {
              labels: chartDates,
              datasets: [{
                data: getResponseTimeData(selectedRange),
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
                      size: 12,
                      weight: 'bold'
                    }
                  },
                  ticks: {
                    stepSize: 5,
                    callback: function(value) {
                      return value + ' min';
                    }
                  }
                },
                x: {
                  ...commonOptions.scales.x,
                  ticks: {
                    ...commonOptions.scales.x.ticks,
                    maxRotation: 45,
                    minRotation: 45
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
  }, [chartDates]);

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
        <div className="p-3">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <select 
                className="bg-white text-blue-900 font-medium rounded-xl border border-green-800 border-opacity-20 py-1.5 px-3 focus:ring-2 focus:ring-blue-900"
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
              >
                <option value="month">Last 30 days</option>
                <option value="week">Last 1 week</option>
                <option value="year">Last 1 year</option>
              </select>
              <div className="text-green-800 font-bold">
                {dateRange}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <IonCard className="rounded-2xl shadow-md">
              <div className="p-2 bg-gradient-to-r from-green-800 to-blue-900">
                <h2 className="text-white text-lg font-bold text-center">Calls By Type</h2>
              </div>
              <div className="p-3">
                <div className="relative h-[200px] w-full">
                  <canvas ref={callsByTypeRef} />
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-xl text-xs">
                  <p className="text-blue-900">
                    <strong>Understanding Call Types</strong><br/>
                    Hover over each bar to see detailed information about each call type.
                  </p>
                  <ul className="mt-1 text-blue-900 space-y-1">
                    {Object.entries(callTypeDefinitions).map(([type, definition]) => (
                      <li key={type} className="flex">
                        <span className="font-bold min-w-[50px]">{type}:</span>
                        <span className="ml-1">{definition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </IonCard>

            <IonCard className="rounded-2xl shadow-md">
              <div className="p-2 bg-gradient-to-r from-green-800 to-blue-900">
                <h2 className="text-white text-lg font-bold text-center">Response Times</h2>
              </div>
              <div className="p-3">
                <div className="relative h-[200px] w-full">
                  <canvas ref={responseTimesRef} />
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                  <p className="text-blue-900 text-xs">
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