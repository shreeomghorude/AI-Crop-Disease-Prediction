import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import NavbarFinal from './Components/NavbarFinal';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Features from './Components/Features';
import PredictDisease from './Components/PredictDisease';

import CropRelatedIssues from './Components/CropRelatedIssues';
import AboutUs from './Components/AboutUs';
import PredictDiseaseResult from './Components/PredictDiseaseResult';


import AppContext from './AppContext';

function App() {
  const [tempUrl, setTempUrl] = useState('tp');
  const [cropPredictRes, setCropPredictRes] = useState('');
  const [ans, setAns] = useState({
    Crop: "",
    Disease: "",
    Cause_of_disease: [],
    How_to_prevent_OR_cure_the_disease: []
  });

  return (
    <AppContext.Provider value={{ tempUrl, setTempUrl, ans, setAns, cropPredictRes, setCropPredictRes }}>
      <Routes>

        {/* FIXED HOME ROUTE */}
        <Route path="/" element={<Home />} />

        <Route path="/navbar" element={<NavbarFinal />} />

        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Features + Crop Tools */}
        <Route path="/features" element={<Features />} />
        <Route path="/crop-related-issues" element={<CropRelatedIssues />} />

        <Route path="/predict-disease" element={<PredictDisease />} />
        <Route path="/predict-disease-result" element={<PredictDiseaseResult />} />


      </Routes>
    </AppContext.Provider>
  );
}

export default App;
