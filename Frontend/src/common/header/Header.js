import React, { useEffect, useState } from "react";
import { CardHeader, AppBar, Toolbar, Button, Card, CardContent, Tab, Tabs } from "@material-ui/core";
import Modal from "react-modal";
import "./Header.css";
import logo from "../../assets/logo.jpeg";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";

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

  useEffect(() => {
  const loggedInStatus = !!localStorage.getItem('token');
  setIsLoggedIn(loggedInStatus);
  }, []);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`/auth/logout`, requestOptions)
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
            <Button className="login-btn" variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button className="login-btn" variant="contained" color="primary" onClick={openModal}>
              Login
            </Button>
          )}
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Login Modal" style={customStyles}>
          <Card>
          <CardHeader title="Authentication" style={{ backgroundColor: 'purple', height: '70px', color: 'white' }} />
            <CardContent>
              {/* Add your Authenticate Card Top Here */}
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="LOGIN" />
                <Tab label="REGISTER" />
              </Tabs>
              {selectedTab === 0 && <Login closeModal={closeModal} handleLogin={handleLogin} />}
              {selectedTab === 1 && <Register closeModal={closeModal} />}
            </CardContent>
          </Card>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
