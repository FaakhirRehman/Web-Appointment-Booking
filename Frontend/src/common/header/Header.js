import React, { useState } from "react";
import { AppBar, Toolbar, Button, Card, CardContent, Tab, Tabs } from "@material-ui/core";
import Modal from "react-modal";
import "./Header.css";
import logo from "../../assets/logo.jpeg";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogin = () => {
    // Logic for handling user login me thinks
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic for handling user logout probs
    setIsLoggedIn(false);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="toolbar">
        <div className="logo">
            <img src={logo} alt="Logo" className="logoimg" />
            <h1 className="app-title">Doctor Finder</h1>
        </div>
        
        <div className="right-section">
            {isLoggedIn ? (
            <Button  className="login-btn" variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>
            ) : (
            <Button  className="login-btn" variant="contained" color="primary" onClick={openModal}>
                Login
            </Button>
            )}
        </div>
        {/* stuff */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          
        >
          {/* Implement the Login/Register tabs using Material-UI components here if u plz */}
          <Card>
            <CardContent>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="LOGIN" />
                <Tab label="REGISTER" />
              </Tabs>
              {/* Here, based on the selectedTab value, you can chamhe the content for LOGIN and REGISTER */}
              {/* LIKe so: 
              {selectedTab is 0 then <LoginContent />}
              {selectedTab is 1 then <RegisterContent />} */}
            </CardContent>
          </Card>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
