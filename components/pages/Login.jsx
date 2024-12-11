import React, { useState, useEffect } from 'react';
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
} from '@ionic/react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationsOutline, heartHalf, mailOutline, lockClosedOutline } from 'ionicons/icons';

const SplashScreen = () => (
  <motion.div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="w-32 h-32 mb-6 bg-gradient-to-br from-green-800 to-blue-900 rounded-3xl flex items-center justify-center">
        <IonIcon icon={heartHalf} className="h-16 w-16 text-white"/>
      </div>
      <motion.h1 
        className="text-4xl font-bold text-blue-900"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        FirstResponse
      </motion.h1>
    </motion.div>
  </motion.div>
);

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length === 0) {
      window.location.href = '/tabs/emergencies';
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center px-4 bg-gray-100">
      {/* Logo and Title Section */}
      <div className="mb-10 text-center mt-10">
        <div className="w-20 h-20 mb-4 mx-auto bg-gradient-to-br from-green-800 to-blue-900 rounded-2xl flex items-center justify-center">
          <IonIcon icon={heartHalf} className="h-10 w-10 text-white"/>
        </div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">FirstResponse</h1>
        <p className="text-green-800">Welcome back</p>
      </div>

      {/* Login Form */}
      <div className="w-full bg-gray-100 rounded-3xl shadow-lg p-8 mt-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-900">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IonIcon icon={mailOutline} className="h-5 w-5 text-green-800" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-green-700'
                } rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-900">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IonIcon icon={lockClosedOutline} className="h-5 w-5 text-green-800" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-10 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-green-700'
                } rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-green-800 hover:text-blue-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  )}
                </svg>
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-800 to-blue-900 text-white py-3 rounded-xl font-medium hover:opacity-90 transition duration-200 transform hover:scale-[0.99] shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <IonPage>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      <IonHeader>
        <IonToolbar className="bg-grey-100 border-b border-green-800">
          <IonButtons slot="start">
            <IonMenuButton className="text-blue-900" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="bg-gray-100">
        {showNotifications && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowNotifications(false)}
          >
            <div className="bg-gray-100 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Notifications</h2>
              <p className="text-green-800">No new notifications</p>
            </div>
          </div>
        )}

        <motion.div 
          className="min-h-screen py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <LoginCard />
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Login;