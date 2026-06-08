import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validate = (form) => {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (!/^[a-zA-Z\s]{2,}$/.test(form.fullName.trim())) {
    errors.fullName = 'Name must contain only letters (min 2 characters).';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|in|co\.in)$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email (e.g. example@gmail.com).';
  }

  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = 'Password must contain at least one uppercase letter.';
  } else if (!/[a-z]/.test(form.password)) {
    errors.password = 'Password must contain at least one lowercase letter.';
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = 'Password must contain at least one number.';
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
    errors.password = 'Password must contain at least one special character.';
  }

  return errors;
};

const InputField = ({ label, required, type, placeholder, value, onChange, error, touched }) => (
  <div className="form-group">
    <label>
      {label}{required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={touched && error ? 'input-error' : touched && !error ? 'input-success' : ''}
    />
    {touched && error && <span className="field-error">{error}</span>}
    {touched && !error && value && <span className="field-success">✓</span>}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', password: '', companyName: '', isAgency: 'yes',
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const errors = validate(form);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    setSubmitError('');
    // Touch all required fields
    const allTouched = { fullName: true, phone: true, email: true, password: true };
    setTouched((prev) => ({ ...prev, ...allTouched }));

    if (Object.keys(errors).length > 0) {
      setSubmitError('Please fix all errors before submitting.');
      return;
    }

    const result = register(form);
    if (result.success) {
      navigate('/account');
    } else {
      setSubmitError(result.message);
    }
  };

  // Password strength
  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) score++;
    if (score <= 2) return { label: 'Weak', color: '#e05c5c', width: '33%' };
    if (score <= 3) return { label: 'Medium', color: '#f0a500', width: '66%' };
    return { label: 'Strong', color: '#2ecc71', width: '100%' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="page auth-page">
      <h1>Create your<br />PopX account</h1>

      <InputField
        label="Full Name" required type="text" placeholder="e.g. John Smith"
        value={form.fullName} onChange={handleChange('fullName')}
        error={errors.fullName} touched={touched.fullName}
      />

      <InputField
        label="Phone number" required type="tel" placeholder="e.g. 9876543210"
        value={form.phone} onChange={handleChange('phone')}
        error={errors.phone} touched={touched.phone}
      />

      <InputField
        label="Email address" required type="email" placeholder="e.g. john@gmail.com"
        value={form.email} onChange={handleChange('email')}
        error={errors.email} touched={touched.email}
      />

      {/* Password with toggle */}
      <div className="form-group">
        <label>Password <span className="required">*</span></label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 8 chars, A-Z, 0-9, @#$"
            value={form.password}
            onChange={handleChange('password')}
            className={touched.password && errors.password ? 'input-error' : touched.password && !errors.password ? 'input-success' : ''}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {touched.password && errors.password && (
          <span className="field-error">{errors.password}</span>
        )}
        {form.password && strength && (
          <div className="password-strength">
            <div className="strength-bar">
              <div style={{ width: strength.width, background: strength.color }} />
            </div>
            <span style={{ color: strength.color, fontSize: '11px', fontWeight: 600 }}>
              {strength.label}
            </span>
          </div>
        )}
        {touched.password && !errors.password && form.password && (
          <span className="field-success">✓</span>
        )}
      </div>

      <div className="form-group">
        <label>Company name</label>
        <input
          type="text"
          placeholder="e.g. Acme Corp (optional)"
          value={form.companyName}
          onChange={handleChange('companyName')}
        />
      </div>

      <span className="radio-group-label">
        Are you an Agency?<span className="required">*</span>
      </span>
      <div className="radio-options">
        <label className="radio-option">
          <input type="radio" name="agency" value="yes"
            checked={form.isAgency === 'yes'} onChange={handleChange('isAgency')} />
          Yes
        </label>
        <label className="radio-option">
          <input type="radio" name="agency" value="no"
            checked={form.isAgency === 'no'} onChange={handleChange('isAgency')} />
          No
        </label>
      </div>

      {submitError && <p className="error-msg" style={{ marginBottom: '14px' }}>{submitError}</p>}

      <button className="btn-primary" onClick={handleSubmit}>
        Create Account
      </button>
    </div>
  );
};

export default Register;
