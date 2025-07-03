import React from 'react';

const Error = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const paperStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: window.innerWidth < 768 ? '40px 20px' : '60px 40px',
    textAlign: 'center',
    border: '2px solid black',
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto'
  };

  const iconStyle = {
    fontSize: window.innerWidth < 768 ? '60px' : '80px',
    marginBottom: '20px',
    display: 'block'
  };

  const titleStyle = {
    fontSize: window.innerWidth < 480 ? '2.5rem' : window.innerWidth < 768 ? '3rem' : '4rem',
    fontWeight: 'bold',
    margin: '20px 0',
    letterSpacing: window.innerWidth < 768 ? '1px' : '2px',
    wordBreak: 'break-word'
  };

  const dividerStyle = {
    width: '100%',
    height: '2px',
    backgroundColor: 'black',
    margin: window.innerWidth < 768 ? '20px 0' : '30px 0',
    border: 'none'
  };

  const subtitleStyle = {
    fontSize: window.innerWidth < 768 ? '1.25rem' : '1.5rem',
    fontWeight: '500',
    margin: '20px 0'
  };

  const descriptionStyle = {
    fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
    lineHeight: '1.6',
    margin: window.innerWidth < 768 ? '15px 0 30px 0' : '20px 0 40px 0',
    color: '#333'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: window.innerWidth < 480 ? '10px' : '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: window.innerWidth < 480 ? 'column' : 'row'
  };

  const primaryButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: window.innerWidth < 768 ? '10px 25px' : '12px 30px',
    fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    minWidth: window.innerWidth < 480 ? '100%' : '120px',
    width: window.innerWidth < 480 ? '100%' : 'auto'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: 'black',
    border: '2px solid black',
    padding: window.innerWidth < 768 ? '8px 25px' : '10px 30px',
    fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    minWidth: window.innerWidth < 480 ? '100%' : '120px',
    width: window.innerWidth < 480 ? '100%' : 'auto'
  };

  return (
    <div style={containerStyle}>
      <div style={paperStyle}>
        <div style={iconStyle}>⚠</div>
        
        <h1 style={titleStyle}>ERROR</h1>
        
        <hr style={dividerStyle} />
        
        <h2 style={subtitleStyle}>Something went wrong</h2>
        
        <p style={descriptionStyle}>
          We encountered an unexpected error while processing your request. 
          This could be due to a temporary issue with our servers or a problem 
          with your connection.
        </p>
        
        <div style={buttonContainerStyle}>
          <button
            style={primaryButtonStyle}
            onClick={handleRefresh}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
          >
            ↻ Try Again
          </button>
          
          <button
            style={secondaryButtonStyle}
            onClick={handleGoHome}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.04)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ⌂ Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;