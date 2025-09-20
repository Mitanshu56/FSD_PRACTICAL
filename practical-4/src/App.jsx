import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [recentAction, setRecentAction] = useState("");

  const handleIncrement = () => {
    setCount(count + 1);
    triggerAnimation("increment");
  };

  const handleDecrement = () => {
    setCount(count - 1);
    triggerAnimation("decrement");
  };

  const handleReset = () => {
    setCount(0);
    triggerAnimation("reset");
  };

  const handleIncrementFive = () => {
    setCount(count + 5);
    triggerAnimation("increment-five");
  };

  const triggerAnimation = (action) => {
    setIsAnimating(true);
    setRecentAction(action);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getCountColor = () => {
    if (count > 0) return "positive";
    if (count < 0) return "negative";
    return "neutral";
  };

  const getFullName = () => {
    const full = `${firstName} ${lastName}`.trim();
    return full || "Anonymous User";
  };

  return (
    <div className="app-container">
      <div className="background-elements">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>

      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-graduation-cap"></i>
            <span>CHARUSAT</span>
          </div>
          <h1>Interactive Dashboard</h1>
          <p>Modern React Application</p>
        </div>
      </header>

      <main className="main-content">
        {/* Counter Section */}
        <section className="counter-section">
          <div className="section-header">
            <i className="fas fa-calculator"></i>
            <h2>Smart Counter</h2>
          </div>
          
          <div className="counter-display">
            <div className={`count-value ${getCountColor()} ${isAnimating ? 'animate' : ''}`}>
              {count}
            </div>
            <div className="count-label">Current Count</div>
            {recentAction && (
              <div className="recent-action">
                Last action: {recentAction.replace('-', ' ')}
              </div>
            )}
          </div>

          <div className="button-grid">
            <button 
              className="btn btn-danger" 
              onClick={handleReset}
              title="Reset to zero"
            >
              <i className="fas fa-undo"></i>
              Reset
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleIncrement}
              title="Add 1"
            >
              <i className="fas fa-plus"></i>
              +1
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleDecrement}
              title="Subtract 1"
            >
              <i className="fas fa-minus"></i>
              -1
            </button>
            <button 
              className="btn btn-success" 
              onClick={handleIncrementFive}
              title="Add 5"
            >
              <i className="fas fa-rocket"></i>
              +5
            </button>
          </div>
        </section>

        {/* Form Section */}
        <section className="form-section">
          <div className="section-header">
            <i className="fas fa-user-edit"></i>
            <h2>User Information</h2>
          </div>

          <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <div className="input-wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                />
                <label htmlFor="firstName">First Name</label>
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <i className="fas fa-user-tag input-icon"></i>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
          </form>

          <div className="user-preview">
            <div className="preview-card">
              <div className="avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="user-info">
                <h3>{getFullName()}</h3>
                <p className="user-details">
                  {firstName && <span><strong>First:</strong> {firstName}</span>}
                  {lastName && <span><strong>Last:</strong> {lastName}</span>}
                </p>
                {!firstName && !lastName && (
                  <p className="placeholder-text">
                    <i className="fas fa-info-circle"></i>
                    Enter your name above to see preview
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <i className="fas fa-heart"></i>
            Built with React & Vite | CHARUSAT University
          </p>
          <p className="version">v1.0.0</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
