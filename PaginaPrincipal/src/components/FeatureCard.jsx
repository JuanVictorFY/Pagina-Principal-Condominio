import { useState } from 'react';

const FeatureCard = ({ icon, title, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    borderRadius: '18px',
    transition: 'all 0.3s ease-in-out',
    transform: isHovered ? 'translateY(-15px) scale(1.03)' : 'translateY(0) scale(1)',
    boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    height: '100%'
  };

  return (
    <div 
      className="card border-0 p-2 text-dark bg-white" 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body text-center">
        <div 
          className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle" 
          style={{ 
            width: '60px', height: '60px', 
            backgroundColor: isHovered ? '#0a1680' : '#f8f9fa',
            color: isHovered ? 'white' : 'black',
            transition: '0.3s'
          }}
        >
          <i className={`bi ${icon} fs-2`}></i>
        </div>
        <h6 className="fw-bold">{title}</h6>
        <p className="small text-muted mb-0">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard; // ESTA LÍNEA ES CRÍTICA