import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = currentUser?.fullName
    ? currentUser.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'MD';

  return (
    <div className="page settings-page">
      <div className="settings-header">
        <h2>Account Settings</h2>
      </div>

      <div className="settings-card">
        <div className="profile-row">
          <div className="avatar-wrapper">
            <div className="avatar-placeholder">{initials}</div>
            <div className="camera-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4zm6.4-10.4h-1.92l-1.28-2H8.8L7.52 4.8H5.6A2.4 2.4 0 0 0 3.2 7.2v9.6A2.4 2.4 0 0 0 5.6 19.2h12.8a2.4 2.4 0 0 0 2.4-2.4V7.2a2.4 2.4 0 0 0-2.4-2.4zM12 17a5 5 0 1 1 0-10A5 5 0 0 1 12 17z" />
              </svg>
            </div>
          </div>
          <div className="profile-info">
            <h3>{currentUser?.fullName || 'Marry Doe'}</h3>
            <p>{currentUser?.email || 'Marry@Gmail.Com'}</p>
          </div>
        </div>

        <p className="settings-bio">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
          Erat, Sed Diam
        </p>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AccountSettings;
