import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const emailError = !email.trim()
    ? 'Email is required.'
    : !/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|in|co\.in)$/.test(email.trim())
    ? 'Enter a valid email (e.g. example@gmail.com).'
    : '';

  const passwordError = !password
    ? 'Password is required.'
    : password.length < 8
    ? 'Password must be at least 8 characters.'
    : '';

  const handleLogin = () => {
    setSubmitError('');
    setTouched({ email: true, password: true });

    if (emailError || passwordError) {
      setSubmitError('Please fill in all fields correctly.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/account');
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="page auth-page">
      <h1>Signin to your<br />PopX account</h1>
      <p className="subtitle">
        Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
      </p>

      {/* Email */}
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setTouched((p) => ({ ...p, email: true })); }}
          className={touched.email && emailError ? 'input-error' : touched.email && !emailError ? 'input-success' : ''}
        />
        {touched.email && emailError && <span className="field-error">{emailError}</span>}
        {touched.email && !emailError && email && <span className="field-success">✓</span>}
      </div>

      {/* Password */}
      <div className="form-group">
        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setTouched((p) => ({ ...p, password: true })); }}
            className={touched.password && passwordError ? 'input-error' : touched.password && !passwordError ? 'input-success' : ''}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {touched.password && passwordError && <span className="field-error">{passwordError}</span>}
        {touched.password && !passwordError && password && <span className="field-success">✓</span>}
      </div>

      {submitError && <p className="error-msg" style={{ marginBottom: '12px' }}>{submitError}</p>}

      <button className="btn-login-disabled" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
