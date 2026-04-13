import React, { useState } from 'react';
import { User, Mail, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [status, setStatus] = useState(''); // '', 'submitting', 'success', 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // --- REAL SUBMISSION LOGIC (WEB3FORMS) ---
    const ACCESS_KEY = "f5100ef8-e7ed-4b04-89fc-99511116441e"; 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...formData
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        
        <div className="contact-content">
          <div className="contact-header">
            <span className="contact-tag">Contact Me</span>
            <h1 className="contact-title">Let’s Get In Touch.</h1>
            <p className="contact-subtitle">
              Or just reach out manually to me at <a href="mailto:sakshidalvi20057@gmail.com" className="email-link">sakshidalvi20057@gmail.com</a>
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="message">Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows="4" 
                placeholder="Enter your message" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className={`submit-btn ${status === 'submitting' ? 'loading' : ''}`} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : (
                <>
                  Contact Me
                  <Send size={16} className="btn-icon" />
                </>
              )}
            </button>

            {status === 'error' && <p className="error-message">Oops! Something went wrong. Please try again.</p>}
          </form>
        </div>

      </div>

      {status === 'success' && (
        <div className="success-overlay">
          <div className="success-modal">
            <CheckCircle size={48} className="success-icon" />
            <h2>Success!</h2>
            <p>Thank you I got your information!</p>
            <button onClick={() => setStatus('')} className="close-success-btn">Close</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Contact;
