import React, { useState } from "react";
import { AppBar, Toolbar, Button, Card, CardContent, Tab, Tabs } from "@material-ui/core";
import Modal from "react-modal";
import "./Header.css";
import logo from "../../assets/logo.jpeg";
import Login from "../../screens/login/Login";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Login Modal"
          style={customStyles}
        >
          <Card>
            <CardContent>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="LOGIN" />
                <Tab label="REGISTER" />
              </Tabs>
              {selectedTab === 0 && <Login closeModal={closeModal} />}
              {/* Add your register component for the second tab */}
            </CardContent>
          </Card>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
