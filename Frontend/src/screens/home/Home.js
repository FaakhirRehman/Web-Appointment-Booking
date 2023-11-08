import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import DoctorList from '../doctorList/DoctorList';
import Appointment from '../appointment/Appointment';
import './Home.css';
import Header from "../../common/header/Header"; // Import your Header component here
const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
        <Header /> {/* Include the Header component */}
      <div>
      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="DOCTORS" />
        <Tab label="APPOINTMENT" />
      </Tabs>
      </div>
      <div className='centered'>
      {selectedTab === 0 && <DoctorList />} {/* Doctors go here */}
      {selectedTab === 1 && <Appointment />} {/* apps go here*/}
      </div>
      </div>
      
  );
  
};

export default Home;