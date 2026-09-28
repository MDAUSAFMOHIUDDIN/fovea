'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAqs3s6iYh-hSFDfnLWhiF_ONXqc-cLo5I',
  authDomain: 'fovea-trial.firebaseapp.com',
  projectId: 'fovea-trial',
  storageBucket: 'fovea-trial.firebasestorage.app',
  messagingSenderId: '701345733994',
  appId: '1:701345733994:web:8be4e89c0f22ba2bee1913',
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
