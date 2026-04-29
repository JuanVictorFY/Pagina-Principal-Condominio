const FeatureCard = ({ icon, title, text, delay }) => {
  return (
    <div className="col-md-3" data-aos="fade-up" data-aos-delay={delay}>
      <div className="card border-0 shadow-lg h-100 p-2" style={{ borderRadius: '18px' }}>
        <div className="card-body text-center text-dark">
          <div className="d-inline-flex align-items-center justify-content-center mb-3 text-dark bg-light rounded-circle" style={{ width: '60px', height: '60px' }}>
            <i className={`bi ${icon} fs-2`}></i>
          </div>
          <h6 className="fw-bold">{title}</h6>
          <p className="small text-muted mb-0">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard