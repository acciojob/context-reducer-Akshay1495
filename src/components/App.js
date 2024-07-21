import React, { useContext, useState } from 'react';
import { AuthContext, AuthProvider } from './AuthContext';
import './App.css';

const App = () => {
  const { authState, login, signout } = use