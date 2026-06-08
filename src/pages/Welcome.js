import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="page welcome-page">
      <div className="welcome-content">
        <h1>Welcome to PopX</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        <button className="btn-primary" onClick={() => navigate('/register')}>
          Create Account
        </button>
        <button className="btn-secondary" onClick={() => navigate('/login')}>
          Already Registered? Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;
