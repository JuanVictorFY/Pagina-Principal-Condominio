import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Configuración de los menús laterales según el rol
const menus = {
  admin: [
    { icon: 'bi-grid-1x2-fill', text: 'Panel de Control' },
    { icon: 'bi-wallet2', text: 'Finanzas y Cobros' },
    { icon: 'bi-people-fill', text: 'Directorio Residentes' },
    { icon: 'bi-megaphone-fill', text: 'Comunicados' },
    { icon: 'bi-building-fill-gear', text: 'Gestión de Áreas' },
    { icon: 'bi-tools', text: 'Mantenimiento' },
    { icon: 'bi-gear-fill', text: 'Configuraciones' },
  ],
  residente: [
    { icon: 'bi-house-door-fill', text: 'Mi Domicilio' },
    { icon: 'bi-wallet2', text: 'Pagos y Recibos' },
    { icon: 'bi-person-badge-fill', text: 'Control de Visitas' },
    { icon: 'bi-calendar-event', text: 'Reservar Áreas' },
    { icon: 'bi-p-circle-fill', text: 'Estacionamiento y Carritos' },
    { icon: 'bi-megaphone-fill', text: 'Comunicados' },
    { icon: 'bi-bar-chart-steps', text: 'Asambleas y Votaciones' },
    { icon: 'bi-exclamation-triangle', text: 'Reportar Incidencia' },
  ],
  seguridad: [
    { icon: 'bi-shield-shaded', text: 'Monitor Principal' },
    { icon: 'bi-person-bounding-box', text: 'Control de Accesos' },
    { icon: 'bi-camera-video-fill', text: 'Cámaras (CCTV)' },
    { icon: 'bi-journal-text', text: 'Bitácora Digital' },
  ]
};

  /* --- COMPONENTES INTERNOS DE CADA ROL --- */
  
  const AdminPanelControl = () => (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-md-3">
        <div className="service-card-elite p-4 h-100">
          <div className="text-info mb-2"><i className="bi bi-bank fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Recaudación Mes</h6>
          <h2 className="text-white fw-bold mb-0">$12,450</h2>
          <small className="text-success"><i className="bi bi-arrow-up-short"></i> +15% vs mes anterior</small>
        </div>
      </div>
      <div className="col-md-3">
        <div className="service-card-elite p-4 h-100">
          <div className="text-warning mb-2"><i className="bi bi-exclamation-circle fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Morosidad</h6>
          <h2 className="text-white fw-bold mb-0">3 Dptos</h2>
          <small className="text-white-50">Avisos automáticos enviados</small>
        </div>
      </div>
      <div className="col-md-3">
        <div className="service-card-elite p-4 h-100">
          <div className="text-success mb-2"><i className="bi bi-door-open fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Visitas Hoy</h6>
          <h2 className="text-white fw-bold mb-0">42</h2>
          <small className="text-white-50">Accesos registrados</small>
        </div>
      </div>
      <div className="col-md-3">
        <div className="service-card-elite p-4 h-100" style={{ borderColor: 'rgba(255, 95, 86, 0.4)' }}>
          <div className="text-danger mb-2"><i className="bi bi-tools fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Incidencias</h6>
          <h2 className="text-white fw-bold mb-0">1 Abierta</h2>
          <small className="text-danger">Ascensor Torre B</small>
        </div>
      </div>
      
      <div className="col-12 mt-5">
        <h5 className="text-white mb-4">Últimas Transacciones</h5>
        <div className="service-card-elite p-0 overflow-hidden">
          <table className="table table-dark table-hover mb-0 bg-transparent text-white-50">
            <thead>
              <tr>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Unidad</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Concepto</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Fecha</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="bg-transparent py-3 px-4">Dpto 402</td><td className="bg-transparent py-3">Cuota Mantenimiento</td><td className="bg-transparent py-3">Hoy, 10:23 AM</td><td className="bg-transparent py-3 text-end px-4 text-success fw-bold">+$150.00</td></tr>
              <tr><td className="bg-transparent py-3 px-4">Dpto 105</td><td className="bg-transparent py-3">Reserva Área Parrilla</td><td className="bg-transparent py-3">Ayer, 16:45 PM</td><td className="bg-transparent py-3 text-end px-4 text-success fw-bold">+$25.00</td></tr>
              <tr><td className="bg-transparent py-3 px-4">Torre A</td><td className="bg-transparent py-3">Pago a Proveedor (Limpieza)</td><td className="bg-transparent py-3">Ayer, 09:00 AM</td><td className="bg-transparent py-3 text-end px-4 text-danger fw-bold">-$450.00</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

const AdminFinanzas = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
      <h5 className="text-white mb-0">Resumen Financiero</h5>
      <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 small fw-bold shadow-lg" onClick={() => onOpenModal('Exportar Reporte', 'confirm-export')}>
        <i className="bi bi-file-earmark-pdf me-2"></i> Exportar Reporte
      </button>
    </div>
    <div className="col-md-4">
      <div className="service-card-elite p-4 h-100">
        <div className="text-success mb-3"><i className="bi bi-graph-up-arrow fs-2"></i></div>
        <h6 className="text-white-50 text-uppercase small fw-bold">Ingresos del Mes</h6>
        <h2 className="text-white fw-bold mb-0">$15,200.00</h2>
      </div>
    </div>
    <div className="col-md-4">
      <div className="service-card-elite p-4 h-100">
        <div className="text-danger mb-3"><i className="bi bi-graph-down-arrow fs-2"></i></div>
        <h6 className="text-white-50 text-uppercase small fw-bold">Egresos del Mes</h6>
        <h2 className="text-white fw-bold mb-0">$4,850.00</h2>
      </div>
    </div>
    <div className="col-md-4">
      <div className="service-card-elite p-4 h-100" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,86,179,0.1))' }}>
        <div className="text-info mb-3"><i className="bi bi-safe fs-2"></i></div>
        <h6 className="text-white-50 text-uppercase small fw-bold">Fondo de Reserva</h6>
        <h2 className="text-white fw-bold mb-0">$32,500.00</h2>
      </div>
    </div>

    <div className="col-12 mt-5">
      <h5 className="text-white mb-4">Gestión de Morosidad (Pendientes)</h5>
      <div className="service-card-elite p-0 overflow-hidden">
        <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
          <thead>
            <tr>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Residente</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Unidad</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Deuda</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-transparent py-3 px-4 d-flex align-items-center">
                <div className="avatar-circle me-3 shadow-sm" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>CM</div> 
                <span className="text-white fw-medium">Carlos Mendoza</span>
              </td>
              <td className="bg-transparent py-3">Dpto 801</td>
              <td className="bg-transparent py-3 text-danger fw-bold">$300.00</td>
              <td className="bg-transparent py-3 text-end px-4">
                <button className="btn btn-sm btn-outline-success rounded-pill px-3 hover-cyan" onClick={() => onOpenModal('Enviar Recordatorio', 'confirm-whatsapp', { item: 'Carlos Mendoza' })}><i className="bi bi-whatsapp"></i> Recordatorio</button>
              </td>
            </tr>
            <tr>
              <td className="bg-transparent py-3 px-4 d-flex align-items-center">
                <div className="avatar-circle me-3 shadow-sm" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>AR</div> 
                <span className="text-white fw-medium">Ana Ríos</span>
              </td>
              <td className="bg-transparent py-3">Dpto 305</td>
              <td className="bg-transparent py-3 text-danger fw-bold">$150.00</td>
              <td className="bg-transparent py-3 text-end px-4">
                <button className="btn btn-sm btn-outline-success rounded-pill px-3 hover-cyan" onClick={() => onOpenModal('Enviar Recordatorio', 'confirm-whatsapp', { item: 'Ana Ríos' })}><i className="bi bi-whatsapp"></i> Recordatorio</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AdminDirectorio = ({ onOpenModal }) => {
  const residents = [
    { name: "Juan Pérez", depto: "402", phone: "+51 999 123 456", status: "Al Día", color: "success" },
    { name: "Carlos Mendoza", depto: "801", phone: "+51 987 654 321", status: "Moroso", color: "danger" },
    { name: "Laura Giraldo", depto: "105", phone: "+51 955 444 333", status: "Al Día", color: "success" },
    { name: "Miguel Torres", depto: "704", phone: "+51 922 111 000", status: "Al Día", color: "success" },
    { name: "Ana Ríos", depto: "305", phone: "+51 966 777 888", status: "Moroso", color: "danger" },
    { name: "Elena Silva", depto: "202", phone: "+51 911 222 333", status: "Al Día", color: "success" },
  ];
  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-2 gap-3">
        <div className="input-group" style={{ maxWidth: '350px' }}>
          <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
          <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar por nombre o dpto..." />
        </div>
        <button className="btn btn-outline-info rounded-pill px-4 py-2 fw-bold w-100 w-md-auto" onClick={() => onOpenModal('Registrar Nuevo Residente', 'form-residente')}><i className="bi bi-person-plus me-2"></i> Nuevo Residente</button>
      </div>
      {residents.map((r, i) => (
        <div className="col-xl-4 col-md-6" key={i}>
          <div className="service-card-elite p-4 h-100 d-flex flex-column align-items-center text-center shadow-sm">
            <div className="avatar-circle mb-3 shadow-lg" style={{ width: '65px', height: '65px', fontSize: '1.6rem' }}>{r.name.charAt(0)}</div>
            <h5 className="text-white fw-bold mb-1">{r.name}</h5>
            <span className="badge bg-secondary bg-opacity-25 text-white-50 rounded-pill mb-3 px-3">Dpto {r.depto}</span>
            <div className="mt-auto w-100">
              <div className="d-flex justify-content-between align-items-center border-top border-secondary border-opacity-25 pt-3 mt-2 mb-3">
                <small className="text-white-50 hover-cyan"><i className="bi bi-telephone me-1"></i> {r.phone}</small>
                <span className={`badge bg-${r.color} bg-opacity-25 text-${r.color} border border-${r.color} border-opacity-50 rounded-pill`}>{r.status}</span>
              </div>
              {/* BOTONES CRUD: EDITAR Y BORRAR */}
              <div className="d-flex gap-2 w-100">
                <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill fw-bold" onClick={() => onOpenModal('Editar Perfil', 'form-residente', r)}><i className="bi bi-pencil-square me-1"></i> Editar</button>
                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" title="Eliminar Residente" onClick={() => onOpenModal('Eliminar Residente', 'confirm-delete', { item: r.name })}><i className="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminComunicados = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
      <h5 className="text-white mb-0">Tablón de Anuncios</h5>
      <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Redactar Comunicado', 'form-comunicado')}>
        <i className="bi bi-plus-circle me-2"></i> Redactar Comunicado
      </button>
    </div>
    {[
      { title: "Corte de Agua Programado", date: "15 Nov, 2023", scope: "Torre B", type: "warning", desc: "Se realizará mantenimiento preventivo en las bombas de agua desde las 10:00 AM hasta las 14:00 PM." },
      { title: "Nueva Política de Mascotas", date: "10 Nov, 2023", scope: "Todos", type: "info", desc: "Se ha actualizado el reglamento interno respecto al tránsito de mascotas en áreas comunes. Por favor revisar el PDF adjunto." }
    ].map((c, i) => (
      <div className="col-lg-6" key={i}>
        <div className="service-card-elite p-4 h-100 d-flex flex-column position-relative">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className={`badge bg-${c.type} bg-opacity-25 text-${c.type} border border-${c.type} border-opacity-50 rounded-pill px-3`}>{c.scope}</span>
            <small className="text-white-50">{c.date}</small>
          </div>
          <h4 className="text-white fw-bold mb-3">{c.title}</h4>
          <p className="text-white-50 small flex-grow-1 lh-lg">{c.desc}</p>
          
          {/* BOTONES CRUD: EDITAR Y BORRAR */}
          <div className="d-flex gap-2 mt-3 pt-3 border-top border-secondary border-opacity-25">
            <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill fw-bold" onClick={() => onOpenModal('Editar Anuncio', 'form-comunicado', c)}><i className="bi bi-pencil-square me-1"></i> Editar Anuncio</button>
            <button className="btn btn-sm btn-outline-danger rounded-pill px-4" onClick={() => onOpenModal('Eliminar Anuncio', 'confirm-delete', { item: c.title })}><i className="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AdminAreas = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
      <h5 className="text-white mb-0">Zonas y Amenidades</h5>
      <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Registrar Nueva Área', 'form-area')}>
        <i className="bi bi-plus-circle me-2"></i> Registrar Área
      </button>
    </div>
    {[
      { name: "Zona de Parrillas", capacity: "15 personas", status: "Activa", color: "success", icon: "bi-fire" },
      { name: "Piscina Techada", capacity: "20 personas", status: "Mantenimiento", color: "warning", icon: "bi-water" },
      { name: "Salón de Eventos", capacity: "50 personas", status: "Activa", color: "success", icon: "bi-music-note-beamed" }
    ].map((a, i) => (
      <div className="col-lg-4 col-md-6" key={i}>
        <div className="service-card-elite p-4 h-100 d-flex flex-column align-items-center text-center">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow" style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', border: `1px solid var(--bs-${a.color})` }}>
            <i className={`bi ${a.icon} fs-2 text-${a.color}`}></i>
          </div>
          <h5 className="text-white fw-bold mb-1">{a.name}</h5>
          <p className="text-white-50 small mb-3">Aforo Máximo: {a.capacity}</p>
          <span className={`badge bg-${a.color} bg-opacity-25 text-${a.color} rounded-pill px-3 mb-4`}>{a.status}</span>
          
          {/* BOTONES CRUD: EDITAR, SUSPENDER Y BORRAR */}
          <div className="mt-auto w-100 d-flex gap-2">
            <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill" title="Editar" onClick={() => onOpenModal('Editar Área', 'form-area', a)}><i className="bi bi-pencil-square"></i></button>
            <button className="btn btn-sm btn-outline-warning flex-grow-1 rounded-pill" title="Pausar Operación" onClick={() => onOpenModal('Pausar Operación', 'confirm-pause', { item: a.name })}><i className="bi bi-pause-circle"></i></button>
            <button className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill" title="Eliminar" onClick={() => onOpenModal('Eliminar Área', 'confirm-delete', { item: a.name })}><i className="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    ))}
    </div>
  );

const AdminMantenimiento = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
      <h5 className="text-white mb-0">Gestión de Tickets</h5>
      <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 small fw-bold" onClick={() => onOpenModal('Nuevo Ticket', 'form-ticket')}>
        <i className="bi bi-plus-lg me-2"></i> Crear Ticket
      </button>
    </div>
    <div className="col-lg-6">
      <div className="p-4 rounded-4 h-100" style={{ background: 'rgba(255, 193, 7, 0.05)', border: '1px solid rgba(255, 193, 7, 0.2)' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="text-warning fw-bold mb-0"><i className="bi bi-tools me-2"></i> PENDIENTES (2)</h6>
        </div>
        <div className="card bg-transparent border-secondary border-opacity-50 p-4 mb-3 hover-cyan transition-all" style={{ cursor: 'pointer' }}>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 rounded-pill px-3">Alta Prioridad</span>
            <small className="text-white-50"><i className="bi bi-clock"></i> Hace 2 horas</small>
          </div>
          <h5 className="text-white fw-bold mb-2">Ascensor Torre B atascado</h5>
          <p className="text-white-50 small mb-4">Reportado por Dpto 502. Se detiene intermitentemente en el piso 3.</p>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-info rounded-pill flex-grow-1 fw-bold" onClick={() => onOpenModal('Asignar Técnico', 'form-asignar', { item: 'Ascensor Torre B atascado' })}>Asignar Técnico</button>
            <button className="btn btn-sm btn-success rounded-pill px-3 shadow" title="Marcar completado" onClick={() => onOpenModal('Marcar como Completado', 'confirm-complete', { item: 'Ascensor Torre B atascado' })}><i className="bi bi-check2 fs-5"></i></button>
          </div>
        </div>
        <div className="card bg-transparent border-secondary border-opacity-50 p-4 hover-cyan transition-all" style={{ cursor: 'pointer' }}>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50 rounded-pill px-3">Media</span>
            <small className="text-white-50"><i className="bi bi-clock"></i> Ayer</small>
          </div>
          <h5 className="text-white fw-bold mb-2">Foco fundido en pasillo</h5>
          <p className="text-white-50 small mb-4">Reportado por Dpto 105. Pasillo sur del piso 1 sin iluminación.</p>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-info rounded-pill flex-grow-1 fw-bold" onClick={() => onOpenModal('Asignar Técnico', 'form-asignar', { item: 'Foco fundido en pasillo' })}>Asignar Técnico</button>
            <button className="btn btn-sm btn-success rounded-pill px-3 shadow" title="Marcar completado" onClick={() => onOpenModal('Marcar como Completado', 'confirm-complete', { item: 'Foco fundido en pasillo' })}><i className="bi bi-check2 fs-5"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="p-4 rounded-4 h-100" style={{ background: 'rgba(40, 167, 69, 0.05)', border: '1px solid rgba(40, 167, 69, 0.2)' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="text-success fw-bold mb-0"><i className="bi bi-check2-all me-2"></i> COMPLETADOS (Recientes)</h6>
        </div>
        <div className="card bg-transparent border-success border-opacity-25 p-4 mb-3 opacity-75">
          <h5 className="text-white text-decoration-line-through mb-2">Limpieza profunda de Piscina</h5>
          <p className="text-white-50 small mb-0">Mantenimiento mensual programado. Completado por Empresa AquaClean el 12 de Nov.</p>
        </div>
      </div>
    </div>
  </div>
);

const AdminConfiguraciones = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-lg-8 mx-auto">
      <div className="service-card-elite p-4 p-md-5">
        <h5 className="text-white fw-bold mb-4 border-bottom border-secondary border-opacity-25 pb-3">Ajustes del Condominio</h5>
        <div className="mb-4">
          <label className="text-white-50 small fw-bold mb-2">Nombre del Condominio</label>
          <input type="text" className="form-control bg-transparent text-white border-secondary shadow-none px-4 py-3 rounded-4" defaultValue="Residencial Los Pinos" />
        </div>
        <div className="mb-5">
          <label className="text-white-50 small fw-bold mb-2">Dirección Fiscal</label>
          <input type="text" className="form-control bg-transparent text-white border-secondary shadow-none px-4 py-3 rounded-4" defaultValue="Av. Principal 123, Ciudad Central" />
        </div>
        <h5 className="text-white fw-bold mb-4 border-bottom border-secondary border-opacity-25 pb-3">Preferencias del Sistema</h5>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div><h6 className="text-white mb-1">Recordatorios Automáticos</h6><small className="text-white-50">Enviar WhatsApp a morosos los días 5 de cada mes.</small></div>
          <div className="form-check form-switch fs-4"><input className="form-check-input bg-info border-0 shadow-none" style={{ cursor: 'pointer' }} type="checkbox" defaultChecked /></div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div><h6 className="text-white mb-1">Reservas de Áreas Comunes</h6><small className="text-white-50">Permitir a los residentes reservar desde la App Móvil.</small></div>
          <div className="form-check form-switch fs-4"><input className="form-check-input bg-info border-0 shadow-none" style={{ cursor: 'pointer' }} type="checkbox" defaultChecked /></div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div><h6 className="text-white mb-1">Aprobación de Visitas Automática</h6><small className="text-white-50">Los códigos QR no requieren revisión en portería.</small></div>
          <div className="form-check form-switch fs-4"><input className="form-check-input border-secondary shadow-none" style={{ backgroundColor: 'rgba(255,255,255,0.1)', cursor: 'pointer' }} type="checkbox" /></div>
        </div>
        <div className="text-end border-top border-secondary border-opacity-25 pt-4 mt-4">
          <button className="btn btn-outline-light rounded-pill px-4 me-3 fw-bold" onClick={() => window.location.reload()}>Descartar</button>
          <button className="btn btn-info rounded-pill px-4 fw-bold text-dark shadow" onClick={() => onOpenModal('Guardar Configuración', 'confirm-save')}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = ({ activeTab, onOpenModal }) => {
  switch (activeTab) {
    case 'Finanzas y Cobros': return <AdminFinanzas onOpenModal={onOpenModal} />;
    case 'Directorio Residentes': return <AdminDirectorio onOpenModal={onOpenModal} />;
    case 'Comunicados': return <AdminComunicados onOpenModal={onOpenModal} />;
    case 'Gestión de Áreas': return <AdminAreas onOpenModal={onOpenModal} />;
    case 'Mantenimiento': return <AdminMantenimiento onOpenModal={onOpenModal} />;
    case 'Configuraciones': return <AdminConfiguraciones onOpenModal={onOpenModal} />;
    default: return <AdminPanelControl onOpenModal={onOpenModal} />;
  }
};

const ResidenteMiDomicilio = ({ onOpenModal }) => {
  const [integrantes, setIntegrantes] = useState([
    { id: 1, nombre: 'Laura Mendoza', rol: 'Titular', iniciales: 'LM', color: '' },
    { id: 2, nombre: 'Diego Mendoza', rol: 'Hijo', iniciales: 'DM', color: '#6c757d' }
  ]);

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-lg-4">
      <div className="service-card-elite p-4 h-100 position-relative overflow-hidden">
        <div className="position-absolute top-0 end-0 p-3 opacity-25"><i className="bi bi-house-heart display-1"></i></div>
        <div className="d-flex align-items-center mb-4 relative" style={{ zIndex: 1 }}>
          <div className="avatar-circle shadow-lg me-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>JP</div>
          <div>
            <h4 className="text-white fw-bold mb-1">Juan Pérez</h4>
            <span className="badge bg-primary bg-opacity-25 text-info rounded-pill px-3">Titular • Dpto 402</span>
          </div>
        </div>
        <div className="row g-3 relative" style={{ zIndex: 1 }}>
          <div className="col-6"><button className="btn btn-outline-info w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Pagar Mensualidad', 'form-pago')}><i className="bi bi-credit-card fs-4 d-block mb-1"></i> Pagar Cuota</button></div>
          <div className="col-6"><button className="btn btn-outline-success w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Autorizar Nueva Visita', 'form-visita')}><i className="bi bi-person-check fs-4 d-block mb-1"></i> Nueva Visita</button></div>
          <div className="col-6"><button className="btn btn-outline-warning w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Nueva Reserva', 'form-reserva')}><i className="bi bi-calendar-star fs-4 d-block mb-1"></i> Reservar</button></div>
          <div className="col-6"><button className="btn btn-outline-danger w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Reportar Problema', 'form-incidencia')}><i className="bi bi-exclamation-octagon fs-4 d-block mb-1"></i> Reportar</button></div>
        </div>
      </div>
    </div>
    <div className="col-lg-8">
      <div className="row g-4">
        <div className="col-sm-6">
          <div className="service-card-elite p-4 h-100 d-flex flex-column justify-content-center">
            <h6 className="text-white-50 text-uppercase small fw-bold mb-3"><i className="bi bi-wallet2 me-2"></i>Estado de Cuenta</h6>
            <div className="d-flex align-items-center">
              <i className="bi bi-check-circle-fill text-success fs-1 me-3"></i>
              <div><h4 className="text-white fw-bold mb-0">¡Al día!</h4><small className="text-white-50">Sin deudas pendientes</small></div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="service-card-elite p-4 h-100 d-flex flex-column justify-content-center">
            <h6 className="text-white-50 text-uppercase small fw-bold mb-3"><i className="bi bi-car-front-fill me-2"></i>Vehículo Registrado</h6>
            <div className="d-flex align-items-center">
              <div className="bg-dark rounded-3 p-2 px-3 border border-secondary me-3"><span className="fw-bold text-white fs-5">ABC-123</span></div>
              <div><h6 className="text-white fw-bold mb-0">Toyota Yaris</h6><small className="text-white-50">Estacionamiento #45</small></div>
            </div>
          </div>
        </div>
        
        <div className="col-12 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-white mb-0">Integrantes del Departamento</h5>
            <button className="btn btn-sm btn-outline-info rounded-pill px-3 fw-bold" onClick={() => onOpenModal('Agregar Integrante', 'form-integrante', null, (nuevo) => setIntegrantes([...integrantes, nuevo]))}><i className="bi bi-person-plus me-1"></i> Agregar</button>
          </div>
          <div className="service-card-elite p-0 overflow-hidden">
            <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
              <tbody>
                {integrantes.map((int) => (
                  <tr key={int.id}>
                    <td className="bg-transparent py-3 px-4"><div className="d-flex align-items-center"><div className="avatar-circle me-3 shadow-sm" style={{ width: '35px', height: '35px', fontSize: '0.9rem', background: int.color || undefined }}>{int.iniciales}</div><span className="text-white fw-medium">{int.nombre}</span></div></td>
                    <td className="bg-transparent py-3">{int.rol}</td>
                    <td className="bg-transparent py-3 text-end px-4">
                      <button className="btn btn-sm btn-link text-danger p-0" onClick={() => onOpenModal('Eliminar Integrante', 'confirm-delete', { item: int.nombre }, () => setIntegrantes(integrantes.filter(i => i.id !== int.id)))}><i className="bi bi-trash fs-5"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const ResidentePagos = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-lg-4">
      <div className="service-card-elite p-4 p-md-5 h-100 d-flex flex-column justify-content-center text-center shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(25,135,84,0.1), rgba(0,212,255,0.05))', borderColor: 'rgba(25,135,84,0.3)' }}>
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 text-success mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
          <i className="bi bi-check2-circle display-4"></i>
        </div>
        <h2 className="display-5 fw-bold text-white mb-2">$0.00</h2>
        <p className="text-white-50 fs-5 mb-4">No tienes deudas activas.</p>
        <button className="btn btn-outline-success rounded-pill py-3 fw-bold w-100" onClick={() => onOpenModal('Adelantar Pago', 'form-pago')}>Adelantar Mensualidad</button>
      </div>
    </div>
    <div className="col-lg-8">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">Historial de Recibos</h5>
        <button className="btn btn-sm btn-outline-light rounded-pill px-3"><i className="bi bi-download me-1"></i> Descargar Todos</button>
      </div>
      <div className="service-card-elite p-0 overflow-hidden">
        <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
          <thead>
            <tr>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Periodo</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Concepto</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Estado</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-transparent py-3 px-4 text-white fw-medium">Octubre 2023</td>
              <td className="bg-transparent py-3">Mantenimiento + Agua</td>
              <td className="bg-transparent py-3"><span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Pagado</span></td>
              <td className="bg-transparent py-3 text-end px-4 fw-bold">$150.00 <button className="btn btn-sm btn-link text-info p-0 ms-2" title="Descargar Boleta"><i className="bi bi-file-earmark-pdf fs-5"></i></button></td>
            </tr>
            <tr>
              <td className="bg-transparent py-3 px-4 text-white fw-medium">Septiembre 2023</td>
              <td className="bg-transparent py-3">Mantenimiento</td>
              <td className="bg-transparent py-3"><span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Pagado</span></td>
              <td className="bg-transparent py-3 text-end px-4 fw-bold">$120.00 <button className="btn btn-sm btn-link text-info p-0 ms-2" title="Descargar Boleta"><i className="bi bi-file-earmark-pdf fs-5"></i></button></td>
            </tr>
            <tr>
              <td className="bg-transparent py-3 px-4 text-white fw-medium">Agosto 2023</td>
              <td className="bg-transparent py-3">Mantenimiento + Multa</td>
              <td className="bg-transparent py-3"><span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Pagado</span></td>
              <td className="bg-transparent py-3 text-end px-4 fw-bold">$180.00 <button className="btn btn-sm btn-link text-info p-0 ms-2" title="Descargar Boleta"><i className="bi bi-file-earmark-pdf fs-5"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ResidenteVisitas = ({ onOpenModal }) => {
  const [visitas, setVisitas] = useState([
    { id: 1, name: "Roberto Sánchez", type: "Familiar", date: "Hoy, 15:00 PM", pin: "8492", icon: "bi-person-heart", color: "info" },
    { id: 2, name: "Servicio Técnico Claro", type: "Proveedor", date: "Mañana, 10:00 AM", pin: "5103", icon: "bi-tools", color: "warning" }
  ]);

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
        <h5 className="text-white mb-0">Control de Visitas</h5>
        <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Autorizar Ingreso', 'form-visita', null, (nuevaVisita) => setVisitas([...visitas, nuevaVisita]))}>
          <i className="bi bi-person-check me-2"></i> Autorizar Visita
        </button>
      </div>
      {visitas.map((v) => (
        <div className="col-lg-6" key={v.id}>
          <div className="service-card-elite p-4 h-100 d-flex position-relative align-items-center">
            <div className={`d-flex align-items-center justify-content-center rounded-4 me-4 bg-${v.color} bg-opacity-10 text-${v.color} border border-${v.color} border-opacity-25 shadow-sm`} style={{ width: '70px', height: '70px' }}>
              <i className={`bi ${v.icon} fs-1`}></i>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="text-white fw-bold mb-0">{v.name}</h5>
                <span className="badge bg-secondary bg-opacity-25 text-white-50 rounded-pill">{v.type}</span>
              </div>
              <p className="text-white-50 small mb-2"><i className="bi bi-clock me-1"></i> {v.date}</p>
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary border-opacity-25">
                <div className="d-flex align-items-center gap-2">
                  <small className="text-white-50 text-uppercase tracking-widest" style={{ fontSize: '0.7rem' }}>PIN DE ACCESO:</small>
                  <span className="badge bg-light text-dark fs-6 font-monospace">{v.pin}</span>
                </div>
                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => onOpenModal('Cancelar Visita', 'confirm-delete', { item: v.name }, () => setVisitas(visitas.filter(item => item.id !== v.id)))}><i className="bi bi-x-circle"></i></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ResidenteReservas = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
      <h5 className="text-white mb-0">Mis Reservas</h5>
      <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Nueva Reserva', 'form-reserva')}>
        <i className="bi bi-calendar-plus me-2"></i> Reservar Área
      </button>
    </div>
    <div className="col-lg-12">
      <div className="service-card-elite p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
        <div className="d-flex align-items-center">
          <div className="bg-dark rounded-4 p-3 px-4 text-center border border-secondary shadow-lg me-4">
            <span className="d-block text-white display-5 fw-bold" style={{ lineHeight: '1' }}>15</span>
            <span className="text-info fw-bold tracking-widest small">NOV</span>
          </div>
          <div>
            <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 rounded-pill mb-2 px-3">Aprobada</span>
            <h4 className="text-white fw-bold mb-1">Zona de Parrillas</h4>
            <p className="text-white-50 mb-0"><i className="bi bi-clock me-1"></i> 18:00 PM - 22:00 PM • <i className="bi bi-people ms-2 me-1"></i> 10 Invitados</p>
          </div>
        </div>
        <button className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold" onClick={() => onOpenModal('Cancelar Reserva', 'confirm-delete', { item: 'Reserva de Parrilla' })}>
          Cancelar
        </button>
      </div>
    </div>
    <div className="col-12 mt-4">
      <h6 className="text-white-50 text-uppercase small fw-bold mb-3">Historial de Reservas</h6>
      <div className="service-card-elite p-0 overflow-hidden">
        <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
          <tbody>
            <tr>
              <td className="bg-transparent py-3 px-4"><div className="d-flex align-items-center"><i className="bi bi-music-note-beamed fs-4 me-3 text-info"></i><span className="text-white fw-medium">Salón de Eventos</span></div></td>
              <td className="bg-transparent py-3">02 Oct, 2023</td>
              <td className="bg-transparent py-3"><span className="badge bg-secondary bg-opacity-25 text-white-50 rounded-pill px-3">Finalizada</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ResidenteComunicados = () => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 mb-2">
      <h5 className="text-white mb-0">Avisos de Administración</h5>
    </div>
    {[
      { title: "Corte de Agua Programado", date: "15 Nov, 2023", author: "Administración Central", type: "warning", desc: "Se realizará mantenimiento preventivo en las bombas de agua desde las 10:00 AM hasta las 14:00 PM. Por favor tomar precauciones." },
      { title: "Nueva Política de Mascotas", date: "10 Nov, 2023", author: "Comité de Convivencia", type: "info", desc: "Se ha actualizado el reglamento interno respecto al tránsito de mascotas en áreas comunes. Recuerde siempre usar correa." }
    ].map((c, i) => (
      <div className="col-12" key={i}>
        <div className="service-card-elite p-4 p-md-5 d-flex flex-column position-relative border-start border-4 border-bottom-0 border-top-0 border-end-0" style={{ borderLeftColor: `var(--bs-${c.type}) !important` }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
            <div className="d-flex align-items-center gap-3">
              <div className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-${c.type} bg-opacity-25 text-${c.type}`} style={{ width: '50px', height: '50px' }}><i className="bi bi-megaphone fs-4"></i></div>
              <div>
                <h4 className="text-white fw-bold mb-0">{c.title}</h4>
                <small className="text-white-50"><i className="bi bi-person me-1"></i> {c.author}</small>
              </div>
            </div>
            <span className="badge bg-dark border border-secondary text-white-50 py-2 px-3 rounded-pill"><i className="bi bi-calendar-event me-2"></i>{c.date}</span>
          </div>
          <p className="text-white opacity-75 fs-5 lh-lg mb-0">{c.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const ResidenteAsambleas = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 mb-2">
      <h5 className="text-white mb-0">Decisiones Comunitarias</h5>
    </div>
    <div className="col-12">
      <div className="service-card-elite p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 rounded-pill px-3 py-2 animate-pulse"><i className="bi bi-record-circle me-2"></i>Votación Activa</span>
          <small className="text-white-50">Cierra en 2 días</small>
        </div>
        <h3 className="text-white fw-bold mb-3">Aprobación para Cambio de Empresa de Seguridad</h3>
        <p className="text-white-50 mb-5">La junta propone cambiar a la empresa "SafeGuard Pro" debido a los incidentes del mes pasado. El costo de mantenimiento subiría en $5.00 mensuales. ¿Está de acuerdo?</p>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between text-white-50 small mb-2"><span>Sí, a favor (65%)</span><span>No, en contra (35%)</span></div>
          <div className="progress rounded-pill" style={{ height: '10px', background: 'rgba(255,255,255,0.1)' }}>
            <div className="progress-bar bg-info" role="progressbar" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="text-end mt-5 border-top border-secondary border-opacity-25 pt-4">
          <button className="btn btn-premium-unique rounded-pill px-5 py-3 fw-bold text-white shadow-lg" onClick={() => onOpenModal('Emitir Voto', 'form-voto')}>
            <i className="bi bi-check2-square me-2"></i> Emitir mi Voto
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ResidenteIncidencias = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
      <h5 className="text-white mb-0">Historial de Reportes</h5>
      <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Reportar Problema', 'form-incidencia')}>
        <i className="bi bi-exclamation-triangle me-2"></i> Nueva Incidencia
      </button>
    </div>
    <div className="col-12">
      <div className="service-card-elite p-0 overflow-hidden">
        <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
          <thead>
            <tr>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Asunto</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Fecha</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Estado</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-transparent py-3 px-4 text-white fw-medium">Fuga de agua en lavadero</td>
              <td className="bg-transparent py-3">10 Nov, 2023</td>
              <td className="bg-transparent py-3"><span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50 rounded-pill">En Revisión</span></td>
              <td className="bg-transparent py-3 text-end px-4">
                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => onOpenModal('Eliminar Reporte', 'confirm-delete', { item: 'Reporte de Fuga' })}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td className="bg-transparent py-3 px-4 text-white fw-medium text-decoration-line-through opacity-50">Luz de pasillo quemada</td>
              <td className="bg-transparent py-3 opacity-50">02 Nov, 2023</td>
              <td className="bg-transparent py-3"><span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 rounded-pill opacity-75">Resuelto</span></td>
              <td className="bg-transparent py-3 text-end px-4">
                <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" disabled><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ResidenteEstacionamiento = ({ onOpenModal }) => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 mb-2">
      <h5 className="text-white mb-0">Gestión de Vehículos y Carga</h5>
    </div>
    <div className="col-lg-6">
      <div className="service-card-elite p-4 h-100 d-flex flex-column">
        <h6 className="text-white-50 text-uppercase small fw-bold mb-4"><i className="bi bi-car-front me-2"></i>Estacionamiento de Visitas</h6>
        <div className="d-flex align-items-center mb-4">
          <div className="bg-dark rounded-circle p-3 border border-success me-3 shadow-sm text-success"><i className="bi bi-p-circle fs-2"></i></div>
          <div><h4 className="text-white fw-bold mb-1">4 Espacios</h4><small className="text-white-50">Disponibles ahora mismo</small></div>
        </div>
        <button className="btn btn-outline-info rounded-pill py-3 w-100 fw-bold mb-3 hover-cyan mt-auto" onClick={() => onOpenModal('Reservar Estacionamiento', 'form-reserva-estacionamiento')}>
          <i className="bi bi-calendar-plus me-2"></i> Reservar para Visita
        </button>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="service-card-elite p-4 h-100 d-flex flex-column" style={{ border: '1px solid rgba(255, 193, 7, 0.2)' }}>
        <h6 className="text-warning text-uppercase small fw-bold mb-4"><i className="bi bi-arrow-left-right me-2"></i>Préstamo entre Vecinos</h6>
        <p className="text-white-50 mb-4 lh-lg">¿Tienes más de una visita o los espacios comunes están llenos? Solicita permiso a un vecino para usar su estacionamiento temporalmente.</p>
        <button className="btn btn-outline-warning rounded-pill py-3 w-100 fw-bold mt-auto hover-cyan" onClick={() => onOpenModal('Solicitar Estacionamiento a Vecino', 'form-permiso-estacionamiento')}>
          <i className="bi bi-send-plus me-2"></i> Solicitar Permiso
        </button>
      </div>
    </div>
    <div className="col-12 mt-4">
      <div className="service-card-elite p-4 p-md-5 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(0,86,179,0.1))' }}>
        <div className="d-flex align-items-center gap-4">
          <div className="position-relative"><div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-25 text-info" style={{ width: '80px', height: '80px' }}><i className="bi bi-cart4 display-5"></i></div><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success border border-dark">3 Libres</span></div>
          <div><h3 className="text-white fw-bold mb-1">Carritos de Carga</h3><p className="text-white-50 mb-0">Facilita el traslado de tus compras o equipaje desde el sótano hasta tu departamento.</p></div>
        </div>
        <button className="btn btn-premium-unique rounded-pill px-5 py-3 fw-bold text-white shadow-lg text-nowrap" onClick={() => onOpenModal('Solicitar Carrito de Carga', 'form-carrito')}>
          <i className="bi bi-cart-plus me-2"></i> Pedir Carrito
        </button>
      </div>
    </div>
  </div>
);

const ResidenteDashboard = ({ activeTab, onOpenModal }) => {
  switch (activeTab) {
    case 'Pagos y Recibos': return <ResidentePagos onOpenModal={onOpenModal} />;
    case 'Control de Visitas': return <ResidenteVisitas onOpenModal={onOpenModal} />;
    case 'Reservar Áreas': return <ResidenteReservas onOpenModal={onOpenModal} />;
    case 'Estacionamiento y Carritos': return <ResidenteEstacionamiento onOpenModal={onOpenModal} />;
    case 'Comunicados': return <ResidenteComunicados />;
    case 'Asambleas y Votaciones': return <ResidenteAsambleas onOpenModal={onOpenModal} />;
    case 'Reportar Incidencia': return <ResidenteIncidencias onOpenModal={onOpenModal} />;
    default: return <ResidenteMiDomicilio onOpenModal={onOpenModal} />;
  }
};

const SeguridadDashboard = () => (
  <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
    <div className="col-12 mb-2">
      <div className="alert alert-danger bg-transparent border-danger text-danger d-flex flex-column flex-md-row align-items-center rounded-4 p-4 shadow-lg text-center text-md-start">
        <i className="bi bi-shield-fill-exclamation fs-1 me-md-4 mb-3 mb-md-0"></i>
        <div className="flex-grow-1 mb-3 mb-md-0">
          <h5 className="fw-bold mb-1">Botón de Pánico Disponible</h5>
          <span className="small">Usa esta función únicamente en caso de emergencia real para notificar a la policía y al administrador.</span>
        </div>
        <button className="btn btn-danger rounded-pill px-4 fw-bold shadow">ACTIVAR ALARMA</button>
      </div>
    </div>
    
    <div className="col-lg-6">
      <h5 className="text-white mb-3">Monitoreo de Cámaras (En Vivo)</h5>
      <div className="service-card-elite p-2 position-relative">
        <div className="position-absolute top-0 start-0 m-4 badge bg-danger rounded-pill animate-pulse" style={{ zIndex: 10 }}>EN VIVO</div>
        <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800" alt="Cámara" className="img-fluid rounded-4 w-100" style={{ height: '250px', objectFit: 'cover', filter: 'grayscale(30%) contrast(120%)' }} />
        <div className="mt-3 px-3 d-flex justify-content-between align-items-center pb-2">
          <span className="text-white fw-bold">Cam 01: Ingreso Principal</span>
          <span className="text-info"><i className="bi bi-record-circle"></i> Grabando</span>
        </div>
      </div>
    </div>

    <div className="col-lg-6">
      <h5 className="text-white mb-3">Registro de Accesos</h5>
      <div className="service-card-elite p-4 h-100 overflow-auto" style={{ maxHeight: '320px' }}>
        <div className="d-flex align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
          <i className="bi bi-person-check-fill text-success fs-3 me-3"></i>
          <div><strong className="text-white d-block">Juan Pérez (Dpto 402)</strong><small className="text-white-50">Ingreso Peatonal • Hace 2 min</small></div>
        </div>
        <div className="d-flex align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
          <i className="bi bi-car-front-fill text-info fs-3 me-3"></i>
          <div><strong className="text-white d-block">Vehículo Placa ABC-123</strong><small className="text-white-50">Visita a Dpto 105 • Hace 15 min</small></div>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-person-x-fill text-warning fs-3 me-3"></i>
          <div><strong className="text-white d-block">Repartidor Delivery</strong><small className="text-white-50">Salida Peatonal • Hace 45 min</small></div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const location = useLocation();
  
  // Recuperamos el rol del login (si entra directo sin login, por defecto será 'admin')
  const role = location.state?.role || 'admin';
  const userEmail = location.state?.userEmail || 'usuario@domus.com';
  
  const [activeTab, setActiveTab] = useState('');

  // Evitamos el scroll global para que el Sidebar se sienta fijo como una App nativa
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const activeMenu = menus[role] || menus.admin;

  // Inicializar el tab activo con la primera opción del menú correspondiente
  useEffect(() => {
    if (activeMenu && activeMenu.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(activeMenu[0].text);
    }
  }, [activeMenu]);

  // --- SISTEMA INTELIGENTE DE MODALES CRUD ---
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', type: '', data: null, onConfirm: null });
  const openModal = (title, type, data = null, onConfirm = null) => setModalConfig({ isOpen: true, title, type, data, onConfirm });
  const closeModal = () => setModalConfig({ isOpen: false, title: '', type: '', data: null, onConfirm: null });

  // Estilo Premium para todos los inputs del modal
  const modalInputStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    colorScheme: 'dark' // Fuerza al navegador a mostrar el menú de calendario en modo oscuro
  };

  const renderModalBody = () => {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual para bloquear el pasado

    if (modalConfig.type.startsWith('confirm-')) {
      const getActionConfig = () => {
        if (modalConfig.type === 'confirm-delete') return { btn: 'danger', icon: 'bi-exclamation-triangle-fill', text: 'Sí, Eliminar' };
        if (modalConfig.type === 'confirm-pause') return { btn: 'warning', icon: 'bi-pause-circle-fill', text: 'Pausar Operación' };
        if (modalConfig.type === 'confirm-complete') return { btn: 'success', icon: 'bi-check-circle-fill', text: 'Marcar Completado' };
        if (modalConfig.type === 'confirm-whatsapp') return { btn: 'success', icon: 'bi-whatsapp', text: 'Enviar WhatsApp' };
        if (modalConfig.type === 'confirm-export') return { btn: 'info', icon: 'bi-file-earmark-pdf-fill', text: 'Descargar PDF' };
        if (modalConfig.type === 'confirm-save') return { btn: 'info', icon: 'bi-save-fill', text: 'Aplicar Cambios' };
        return { btn: 'primary', icon: 'bi-info-circle-fill', text: 'Confirmar' };
      };
      const action = getActionConfig();
      
      // Extraemos colores exactos para crear los efectos de resplandor
      const rgbColor = action.btn === 'danger' ? '220,53,69' : action.btn === 'warning' ? '255,193,7' : action.btn === 'success' ? '25,135,84' : '0,212,255';
      const hexColor = action.btn === 'danger' ? '#dc3545' : action.btn === 'warning' ? '#ffc107' : action.btn === 'success' ? '#198754' : '#00d4ff';

      return (
        <div className="text-center pb-2">
          
          {/* Icono con efecto de anillos de radar (Glow) */}
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 position-relative" 
               style={{ 
                 width: '90px', height: '90px', 
                 background: `rgba(${rgbColor}, 0.1)`,
                 border: `1px solid rgba(${rgbColor}, 0.3)`,
                 boxShadow: `0 0 0 15px rgba(${rgbColor}, 0.05), 0 0 30px rgba(${rgbColor}, 0.2)`
               }}>
            <i className={`bi ${action.icon} display-5`} style={{ color: hexColor }}></i>
          </div>
          
          {/* Texto dinámico con mayor énfasis */}
          <div className="text-white-50 fs-5 mb-5 lh-lg px-3">
            {modalConfig.type === 'confirm-whatsapp' ? <p>¿Deseas redirigirte a WhatsApp para enviar un recordatorio automático a <strong className="text-white fs-4 d-block mt-2">{modalConfig.data?.item}</strong>?</p> :
             modalConfig.type === 'confirm-export' ? <p>Se descargará un archivo PDF con el resumen financiero actual.</p> :
             modalConfig.type === 'confirm-save' ? <p>¿Estás seguro de que deseas aplicar estas configuraciones al sistema de Domus?</p> :
             <p>
               ¿Estás seguro de que deseas {action.text.toLowerCase()} <strong className="text-white">{modalConfig.data?.item ? `"${modalConfig.data.item}"` : 'este elemento'}</strong>? 
               {modalConfig.type === 'confirm-delete' && (
                 <span className="d-block mt-3 p-3 rounded-3" style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.2)', color: '#ff6b6b', fontSize: '0.9rem', lineHeight: '1.4' }}>
                   <i className="bi bi-exclamation-triangle-fill me-2"></i>Esta acción es irreversible y los datos se perderán para siempre.
                 </span>
               )}
             </p>
            }
          </div>
          
          {/* Botones simétricos más altos y proporcionales */}
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-secondary rounded-pill py-3 fw-bold text-white hover-cyan transition-all flex-grow-1" onClick={closeModal} style={{ background: 'rgba(255,255,255,0.05)' }}>Cancelar</button>
            <button className={`btn btn-${action.btn} rounded-pill py-3 fw-bold shadow-lg flex-grow-1 text-${(action.btn === 'info' || action.btn === 'warning') ? 'dark' : 'white'}`} onClick={() => { if (modalConfig.onConfirm) modalConfig.onConfirm(); closeModal(); }} style={{ boxShadow: `0 10px 20px rgba(${rgbColor}, 0.2)` }}>{action.text}</button>
          </div>
        </div>
      );
    }

    if (modalConfig.type === 'form-integrante') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const nombre = formData.get('nombre');
          const rol = formData.get('rol');
          if (nombre && rol && modalConfig.onConfirm) {
            const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            modalConfig.onConfirm({ id: Date.now(), nombre, rol, iniciales, color: '#00d4ff' });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre Completo</label><input type="text" name="nombre" required className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. Camila Mendoza" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Parentesco</label><input type="text" name="rol" required className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. Hija" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Teléfono (Opcional)</label><input type="text" name="telefono" className="form-control shadow-none" style={modalInputStyle} placeholder="+51..." /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Integrante</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-visita') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name');
          const typeCode = formData.get('type');
          const date = formData.get('date');
          const time = formData.get('time');

          if (name && date && time && modalConfig.onConfirm) {
            // Configurar diseño dependiendo del tipo
            let typeStr = "Familiar"; let icon = "bi-person-heart"; let color = "info";
            if (typeCode === 'prov') { typeStr = "Proveedor"; icon = "bi-tools"; color = "warning"; }
            if (typeCode === 'del') { typeStr = "Delivery"; icon = "bi-box-seam"; color = "success"; }
            
            // Generar un PIN aleatorio de 4 dígitos
            const pin = Math.floor(1000 + Math.random() * 9000).toString();
            
            modalConfig.onConfirm({
              id: Date.now(),
              name,
              type: typeStr,
              date: `${date} • ${time}`,
              pin,
              icon,
              color
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre o Empresa del Visitante</label><input type="text" name="name" required className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. Roberto Sánchez / Empresa Delivery" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>DNI / Pasaporte</label><input type="text" name="dni" className="form-control shadow-none" style={modalInputStyle} placeholder="Nro. Documento" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Visita</label>
              <select name="type" className="form-select shadow-none py-2" style={modalInputStyle}>
                <option value="fam">Familiar / Amigo</option>
                <option value="prov">Proveedor / Técnico</option>
                <option value="del">Delivery</option>
              </select>
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Fecha</label>
              <div className="position-relative">
                <i className="bi bi-calendar-event position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="date" name="date" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} min={today} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Estimada</label>
              <div className="position-relative">
                <i className="bi bi-clock position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="time" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg"><i className="bi bi-person-check-fill me-2"></i>Autorizar Ingreso</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-reserva') {
      return (
        <form>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>Seleccionar Área Común</label>
            <div className="d-flex flex-column gap-2">
              
              <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                <input type="radio" name="areaReserva" className="form-check-input mt-0 me-4 shadow-none fs-4" defaultChecked />
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-25 text-warning me-3 shadow-sm" style={{ width: '45px', height: '45px' }}><i className="bi bi-fire fs-5"></i></div>
                <div>
                  <span className="text-white fw-bold d-block">Zona de Parrillas</span>
                  <small className="text-white-50">Aforo: 15 personas</small>
                </div>
              </label>
              
              <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                <input type="radio" name="areaReserva" className="form-check-input mt-0 me-4 shadow-none fs-4" />
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-25 text-info me-3 shadow-sm" style={{ width: '45px', height: '45px' }}><i className="bi bi-music-note-beamed fs-5"></i></div>
                <div>
                  <span className="text-white fw-bold d-block">Salón de Eventos</span>
                  <small className="text-white-50">Aforo: 50 personas</small>
                </div>
              </label>

              <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                <input type="radio" name="areaReserva" className="form-check-input mt-0 me-4 shadow-none fs-4" />
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 text-success me-3 shadow-sm" style={{ width: '45px', height: '45px' }}><i className="bi bi-water fs-5"></i></div>
                <div>
                  <span className="text-white fw-bold d-block">Piscina Techada</span>
                  <small className="text-white-50">Aforo: 20 personas</small>
                </div>
              </label>

            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Fecha de Reserva</label>
              <div className="position-relative">
                <i className="bi bi-calendar-check position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="date" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} min={today} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Inicio</label>
              <div className="position-relative">
                <i className="bi bi-clock position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Fin</label>
              <div className="position-relative">
                <i className="bi bi-clock-history position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}>Confirmar Reserva</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-incidencia') {
      return (
        <form>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Problema</label>
              <select className="form-select shadow-none py-2" style={modalInputStyle}>
                <option>Plomería / Agua</option>
                <option>Eléctrico</option>
                <option>Áreas Comunes</option>
                <option>Seguridad</option>
              </select>
            </div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Asunto Breve</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. Fuga en lavadero" /></div>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Descripción detallada</label><textarea rows="3" className="form-control shadow-none" style={modalInputStyle} placeholder="Explica el problema..."></textarea></div>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-2 text-uppercase d-block" style={{ letterSpacing: '1px' }}>Adjuntar Foto (Opcional)</label>
            <div className="border border-secondary border-opacity-50 rounded-3 p-4 text-center text-white-50" style={{ background: 'rgba(255,255,255,0.02)', borderStyle: 'dashed !important', cursor: 'pointer' }}>
              <i className="bi bi-camera fs-2 d-block mb-2"></i>
              <small>Haz clic para subir imagen</small>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-danger text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}><i className="bi bi-send-exclamation me-2"></i>Enviar Reporte</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-residente') {
      return (
        <form>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre Completo</label><input type="text" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Juan Pérez" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Departamento</label><input type="text" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.depto || ''} placeholder="Ej. 402" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Teléfono</label><input type="text" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.phone || ''} placeholder="+51 999 888 777" /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}>Guardar Perfil</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-comunicado') {
      return (
        <form>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Título del Anuncio</label><input type="text" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.title || ''} placeholder="Ej. Mantenimiento Preventivo" /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Alcance (Visibilidad)</label>
            <select className="form-select shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.scope || 'todos'}>
              <option value="todos">Todos los Residentes</option>
              <option value="torrea">Solo Torre A</option>
              <option value="torreb">Solo Torre B</option>
            </select>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Descripción / Mensaje</label><textarea rows="3" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.desc || ''} placeholder="Escribe el mensaje aquí..."></textarea></div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}>Publicar Anuncio</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-area') {
      return (
        <form>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre del Área / Amenidad</label><input type="text" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Zona de Parrillas" /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Aforo Máximo Permitido</label><input type="text" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.capacity || ''} placeholder="Ej. 15 personas" /></div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}>Guardar Área</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-ticket' || modalConfig.type === 'form-asignar') {
      return (
        <form>
          {modalConfig.type === 'form-asignar' && <div className="alert alert-info bg-transparent border-info text-info mb-4 small rounded-3"><i className="bi bi-info-circle me-2"></i>Asignando técnico para: <strong>{modalConfig.data?.item}</strong></div>}
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Especialidad Requerida</label>
            <select className="form-select shadow-none py-2" style={modalInputStyle}>
              <option value="tec1">Técnico General</option>
              <option value="tec2">Especialista en Plomería</option>
              <option value="tec3">Empresa Externa (Ascensores)</option>
            </select>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}>Confirmar Técnico</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-pago') {
      return (
        <form>
          <div className="alert alert-info bg-transparent border-info text-info mb-4 d-flex align-items-center rounded-3"><i className="bi bi-shield-lock-fill fs-4 me-3"></i><small>Transacción encriptada de extremo a extremo.</small></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Monto a Pagar</label><input type="text" className="form-control shadow-none fw-bold fs-5 text-success" style={modalInputStyle} defaultValue="$150.00" readOnly /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Número de Tarjeta</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="0000 0000 0000 0000" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Vencimiento</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="MM/YY" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>CVV</label><input type="password" className="form-control shadow-none" style={modalInputStyle} placeholder="123" /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-success text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}><i className="bi bi-credit-card me-2"></i>Pagar Ahora</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-voto') {
      return (
        <form>
          <h5 className="text-white mb-4">Aprobación para Cambio de Empresa de Seguridad</h5>
          <div className="mb-4">
            <label className="d-flex align-items-center p-3 rounded-4 mb-3 border border-secondary border-opacity-50 transition-all hover-cyan" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
              <input type="radio" name="voto" className="form-check-input mt-0 me-3 shadow-none fs-4" />
              <span className="text-white fs-5">Sí, estoy a favor</span>
            </label>
            <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
              <input type="radio" name="voto" className="form-check-input mt-0 me-3 shadow-none fs-4" />
              <span className="text-white fs-5">No, estoy en contra</span>
            </label>
          </div>
          <p className="text-warning small mb-4"><i className="bi bi-info-circle me-1"></i> Recuerde que el voto es secreto y una vez emitido no puede ser modificado.</p>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}><i className="bi bi-check2-square me-2"></i>Confirmar Voto</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-reserva-estacionamiento') {
      return (
        <form>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Placa del Vehículo</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. ABC-123" /></div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Fecha</label>
              <div className="position-relative">
                <i className="bi bi-calendar-event position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="date" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} min={today} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Llegada</label>
              <div className="position-relative">
                <i className="bi bi-box-arrow-in-right position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Salida</label>
              <div className="position-relative">
                <i className="bi bi-box-arrow-right position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}>Confirmar Reserva</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-permiso-estacionamiento') {
      return (
        <form>
          <div className="alert alert-warning bg-transparent border-warning text-warning mb-4 d-flex align-items-center rounded-3 small"><i className="bi bi-info-circle-fill fs-4 me-3"></i>El vecino recibirá una notificación para aprobar tu solicitud.</div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Dpto a Solicitar</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. 502" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Placa Vehículo</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. XYZ-987" /></div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Inicio</label>
              <div className="position-relative">
                <i className="bi bi-clock position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Fin</label>
              <div className="position-relative">
                <i className="bi bi-clock-history position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Mensaje (Opcional)</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="Hola vecino, ¿podría prestarme su espacio?" /></div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-warning text-dark rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}><i className="bi bi-send-fill me-2"></i>Enviar Solicitud</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-carrito') {
      return (
        <form>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Carrito</label>
            <select className="form-select shadow-none py-2" style={modalInputStyle}>
              <option>Carrito de Compras (Estándar)</option>
              <option>Carrito Plataforma (Carga Pesada)</option>
            </select>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tiempo Estimado</label>
            <select className="form-select shadow-none py-2" style={modalInputStyle}>
              <option>15 Minutos</option>
              <option>30 Minutos</option>
              <option>1 Hora</option>
            </select>
          </div>
          <p className="text-white-50 small mb-4"><i className="bi bi-exclamation-triangle me-1"></i> Recuerde devolver el carrito en la zona designada en el sótano para evitar penalidades.</p>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-info text-dark rounded-pill px-4 py-2 fw-bold shadow-lg" onClick={closeModal}><i className="bi bi-check2-circle me-2"></i>Confirmar Préstamo</button>
          </div>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="d-flex position-relative w-100">
      {/* Menú Lateral Fijo (Sidebar) */}
      <aside className="dashboard-sidebar p-4 d-flex flex-column">
        <div className="d-flex align-items-center mb-5">
          <div className="d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #0056b3, #00d4ff)', borderRadius: '12px', transform: 'rotate(45deg)' }}>
            <i className="bi bi-buildings-fill text-white" style={{ transform: 'rotate(-45deg)', fontSize: '1.2rem' }}></i>
          </div>
          <span className="fs-4 fw-bold text-white">DOMUS</span>
        </div>
        
        <div className="text-white-50 small fw-bold text-uppercase mb-3 px-2 tracking-widest">Menú de {role}</div>
        <nav className="flex-grow-1">
          {activeMenu.map((item, i) => (
            <button 
              className={`sidebar-link border-0 w-100 text-start bg-transparent ${activeTab === item.text ? 'active' : ''}`} 
              key={i}
              onClick={() => setActiveTab(item.text)}
            >
              <i className={`bi ${item.icon} fs-5 me-3`}></i> {item.text}
            </button>
          ))}
        </nav>

        {/* Perfil Inferior y Cierre de Sesión */}
        <div className="mt-auto border-top border-secondary border-opacity-25 pt-4">
          <div className="d-flex align-items-center mb-4 px-2">
            <div className="rounded-circle bg-secondary me-3 d-flex align-items-center justify-content-center text-white fw-bold shadow" style={{ width: '40px', height: '40px' }}>
              {role?.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <strong className="text-white d-block text-truncate">{role?.charAt(0).toUpperCase() + role?.slice(1)}</strong>
              <small className="text-white-50 text-truncate d-block" style={{ fontSize: '0.75rem' }}>{userEmail}</small>
            </div>
          </div>
          <Link to="/" className="btn btn-outline-danger w-100 rounded-pill fw-bold">
            <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="dashboard-main flex-grow-1 p-4 p-md-5">
        
        {/* Header Superior Móvil */}
        <div className="dash-mobile-nav align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center">
            <i className="bi bi-buildings-fill text-info fs-3 me-2"></i>
            <span className="fw-bold text-white fs-5">DOMUS</span>
          </div>
          <Link to="/" className="text-white-50"><i className="bi bi-x-lg fs-1"></i></Link>
        </div>

        {/* Cabecera del Contenido */}
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="display-6 fw-bold text-white mb-2" style={{ animation: 'fadeInDown 0.3s ease' }}>
              {activeTab === activeMenu[0].text ? `¡Hola, ${role?.charAt(0).toUpperCase() + role?.slice(1)}!` : activeTab}
            </h2>
            <p className="text-white-50 fs-5 mb-0" style={{ animation: 'fadeInDown 0.3s ease' }}>
              {activeTab === activeMenu[0].text ? 'Bienvenido de vuelta a tu espacio.' : `Gestiona la sección de ${activeTab ? activeTab.toLowerCase() : ''}.`}
            </p>
          </div>
          <div className="d-none d-md-block">
            <button className="btn btn-outline-light rounded-circle p-2 position-relative border-0 shadow-none me-2 hover-cyan">
              <i className="bi bi-bell fs-4"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-dark rounded-circle mt-2 ms-n2"></span>
            </button>
          </div>
        </div>

        {/* Renderizado inteligente según el rol que haya iniciado sesión */}
        {role === 'admin' && <AdminDashboard activeTab={activeTab} onOpenModal={openModal} />}
        {role === 'residente' && <ResidenteDashboard activeTab={activeTab} onOpenModal={openModal} />}
        {role === 'seguridad' && <SeguridadDashboard />}
        
      </main>

      {/* MODAL INTELIGENTE GLOBAL */}
      {modalConfig.isOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}>
          <div className="card border-0 p-0 shadow-lg position-relative overflow-hidden" style={{ background: '#0f172a', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '28px', width: '90%', maxWidth: '550px', animation: 'fadeInDown 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}>
            
            {/* Glow decorativo */}
            <div className="position-absolute top-0 start-50 translate-middle rounded-circle" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
            
            <div className="position-relative" style={{ zIndex: 1 }}>
              <div className="d-flex justify-content-between align-items-center p-4 p-md-5 pb-3 pb-md-4 border-bottom border-secondary border-opacity-25">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <i className={`bi ${modalConfig.type.startsWith('confirm') ? 'bi-shield-exclamation' : 'bi-ui-checks'} text-info fs-5`}></i>
                  </div>
                  <h4 className="text-white fw-bold mb-0">{modalConfig.title}</h4>
                </div>
                <button className="btn btn-link text-white-50 p-0 hover-cyan transition-all" onClick={closeModal} style={{ transform: 'scale(1.2)' }}><i className="bi bi-x"></i></button>
              </div>
              
              <div className="p-4 p-md-5 pt-4">
                {renderModalBody()}
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;