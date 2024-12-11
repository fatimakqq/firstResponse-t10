import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { motion } from 'framer-motion';
import { cog, helpCircle } from 'ionicons/icons';

const TaskItem = ({ task, isCompleted, onToggle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mb-3"
    >
      <label 
        className="flex items-center space-x-4 p-4 rounded-2xl cursor-pointer"
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(22, 101, 52, 0.9), rgba(30, 58, 138, 0.9))',
          borderColor: 'rgba(22, 101, 52, 0.3)'
        }}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggle}
          className="w-6 h-6 rounded-md border-2 border-white/30 checked:bg-green-500 checked:border-green-500 transition-colors duration-200"
        />
        <div className="flex-1">
          <p className="text-white text-xl font-manjari leading-7">{task}</p>
        </div>
      </label>
    </motion.div>
  );
};

const TaskSection = ({ title, tasks, onToggleTask }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-manjari font-bold text-blue-900 mb-3">
        {title}
      </h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task.text}
          isCompleted={task.completed}
          onToggle={() => onToggleTask(task.id)}
        />
      ))}
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState({
    prepare: [
      {
        id: 1,
        text: "View logs for the seizure emergency",
        completed: false
      }
    ],
    respond: [
      {
        id: 2,
        text: "Calculate acetaminophen dosage based on weight before administering",
        completed: false
      }
    ],
    revise: [
      {
        id: 3,
        text: "Review stats",
        completed: false
      },
      {
        id: 4,
        text: "Review upcoming shift for tomorrow",
        completed: false
      }
    ]
  });

  const [showCompletionAlert, setShowCompletionAlert] = useState(false);

  useEffect(() => {
    const isAllCompleted = Object.values(tasks).every(sectionTasks => 
      sectionTasks.every(task => task.completed)
    );
    if (isAllCompleted) {
      setShowCompletionAlert(true);
    }
  }, [tasks]);

  const toggleTask = (taskId) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      Object.keys(newTasks).forEach(section => {
        newTasks[section] = newTasks[section].map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      });
      return newTasks;
    });
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={showCompletionAlert}
        onDidDismiss={() => setShowCompletionAlert(false)}
        header="All Tasks Complete!"
        message="You have successfully completed all your tasks for today."
        buttons={['OK']}
        cssClass="font-manjari"
      />

      <IonHeader>
        <IonToolbar className="bg-gray-100 border-b border-green-800">
          <div className="flex items-center px-4">
            <IonTitle className="text-blue-900">Today's Tasks</IonTitle>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <TaskSection 
            title="1. Pre-Response:"
            tasks={tasks.prepare}
            onToggleTask={toggleTask}
          />
          
          <TaskSection 
            title="2. During Response:"
            tasks={tasks.respond}
            onToggleTask={toggleTask}
          />
          
          <TaskSection 
            title="3. Post-Response:"
            tasks={tasks.revise}
            onToggleTask={toggleTask}
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-8"
          >
            <button
              className="w-full p-4 rounded-2xl text-white font-manjari text-xl leading-8 flex items-center justify-center space-x-2"
              style={{ 
                background: 'linear-gradient(to bottom right, rgba(22, 101, 52, 0.9), rgba(30, 58, 138, 0.9))',
                borderColor: 'rgba(22, 101, 52, 0.3)'
              }}
              onClick={() => window.location.href = '/help'}
            >
              <IonIcon icon={helpCircle} className="text-2xl" />
              <span>NEED HELP?</span>
            </button>
          </motion.div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;