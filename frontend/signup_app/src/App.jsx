import React from 'react';
import LoginCard from './components/LoginCard';
import SignupCard from './components/SignupCard';
import Dashboard from './components/Dashboard';
import Usersdata from './components/Usersdata';
import { useState } from 'react';



function App() {
  const [clicked, setClicked]=useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  
  function handleLogin(){
    setClicked(true);
    setShowLogin(true);
  }
  function handleSignup(){
    setClicked(true);
  }
  function handleUsersClick(){
    setShowUsers(!showUsers);
  }
  function handleDashboardClick(){
    setShowDashboard(!showDashboard);
  }
  function handleSignout(){
    localStorage.removeItem('authToken');
    setIsloggedin(false);
    setClicked(false);
    setShowLogin(false);
  }
  return (
    <div>
      {!isloggedin && 
        ( <>
            { !clicked && (
            <div className="buttons">
              <button onClick={handleSignup}>Signup</button><br />
              <button onClick={handleLogin}>Login</button>
            </div>
            )}
            {clicked && (
              showLogin? <LoginCard onLogin={setIsloggedin}  />: <SignupCard onSignup={setIsloggedin}  />
            )}
          </>
        )
      }
      {isloggedin && (
        <>
          <p>Logged in!</p>
          
          <button id='showUsers' onClick={handleUsersClick}>  Users</button>
          <button id='showDashboard' onClick={handleDashboardClick}> Dashboard</button>
          <button id='signout' onClick={handleSignout}>Signout</button>
          {showDashboard && <Dashboard /> } 
          {showUsers && <Usersdata />}
        </>
      )}
    </div>
  );
}

export default App;
