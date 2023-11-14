import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import DoctorList from '../doctorList/DoctorList';
import Appointment from '../appointment/Appointment';
import './Home.css';
import Header from "../../common/header/Header";
const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
        <Header /> 
      <div>
      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="DOCTORS" />
        <Tab label="APPOINTMENT" />
      </Tabs>
      </div>
      <div className='centered'>
      {selectedTab === 0 && <DoctorList />} 
      
      </div>
      {selectedTab === 1 && <Appointment />} 
      </div>
      
  );
  
};

export default Home;