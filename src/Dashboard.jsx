import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  
const AdminPanelControl = ({ onOpenModal, transactions, setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTransactions = transactions.filter(t => 
    t.unit.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
          <h5 className="text-white mb-0">Últimas Transacciones</h5>
          <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
            <div className="input-group" style={{ minWidth: '280px' }}>
              <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar unidad o concepto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Registrar Transacción', 'form-transaccion', null, (newTrans) => setTransactions(prev => [newTrans, ...prev]))}>
              <i className="bi bi-plus-circle me-2"></i> Nueva Transacción
            </button>
          </div>
        </div>
        <div className="service-card-elite p-0 overflow-hidden">
          <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
            <thead>
              <tr>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Unidad</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Concepto</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Fecha</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end">Monto</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="bg-transparent py-3 px-4">{t.unit}</td>
                  <td className="bg-transparent py-3">{t.concept}</td>
                  <td className="bg-transparent py-3">{t.date}</td>
                  <td className={`bg-transparent py-3 text-end fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>{t.amount}</td>
                  <td className="bg-transparent py-3 text-end px-4">
                    <button className="btn btn-sm btn-outline-info rounded-pill px-3 me-2 hover-cyan" title="Editar" onClick={() => onOpenModal('Editar Transacción', 'form-transaccion', t, (updatedTrans) => setTransactions(prev => prev.map(tr => tr.id === t.id ? updatedTrans : tr)))}><i className="bi bi-pencil-square"></i></button>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" title="Eliminar" onClick={() => onOpenModal('Eliminar Transacción', 'confirm-delete', { item: t.concept }, () => setTransactions(prev => prev.filter(tr => tr.id !== t.id)))}><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="bg-transparent py-5 text-center text-white-50">
                    <i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>
                    No se encontraron transacciones con ese criterio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminFinanzas = ({ onOpenModal, morosos, setMorosos }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Centralizamos los datos para que la vista web y el PDF usen exactamente la misma información
  const datosFinancieros = {
    ingresos: "$15,200.00",
    egresos: "$4,850.00",
    fondo: "$32,500.00"
  };

  const filteredMorosos = morosos.filter(m => 
    m.residente.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.unidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generarPDF = () => {
    const doc = new jsPDF();

    // --- DISEÑO CORPORATIVO Y PROFESIONAL ---
    
    // Función para dibujar el Marco y el Footer en todas las páginas generadas
    const addPageFrameAndFooter = (doc, pageNum, pageCount) => {
      // Barra decorativa vertical (Cyan) en el lado izquierdo
      doc.setFillColor(0, 212, 255);
      doc.rect(0, 0, 5, 297, 'F');

      // --- FOOTER PROFESIONAL ---
      // Fondo del pie de página
      doc.setFillColor(248, 250, 252);
      doc.rect(5, 275, 205, 22, 'F');

      // Línea Cyan superior del footer
      doc.setDrawColor(0, 212, 255);
      doc.setLineWidth(0.5);
      doc.line(15, 275, 195, 275);

      // Información del Footer
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      doc.setFont('helvetica', 'bold');
      doc.text('DOMUS', 15, 283);
      doc.setFont('helvetica', 'normal');
      doc.text('- Sistema Inteligente de Gestión', 29, 283);

      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('soporte@domus-app.com  |  www.domus-app.com  |  +51 999 000 111', 15, 289);

      // Número de Página
      doc.setFont('helvetica', 'italic');
      doc.text(`Página ${pageNum} de ${pageCount}`, 195, 286, { align: 'right' });
    };

    // --- CABECERA PRINCIPAL (HEADER) ---
    doc.setFillColor(15, 23, 42); // Azul Marino Oscuro
    doc.rect(5, 0, 205, 45, 'F');

    // Logo Domus en el PDF
    doc.setFillColor(0, 212, 255); // Cyan
    doc.circle(25, 22, 9, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('D', 21, 29);

    // Titulares Izquierda
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('DOMUS', 42, 24);
    doc.setFontSize(10);
    doc.setTextColor(0, 212, 255);
    doc.text('REPORTE FINANCIERO MENSUAL', 42, 31);

    // Metadatos Derecha
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ESTADO DE CUENTAS', 195, 22, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Periodo: Mes Actual`, 195, 28, { align: 'right' });
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 195, 33, { align: 'right' });

    // --- SECCIÓN: BALANCE GENERAL (CAJA LIMPIA) ---
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen del Balance General', 15, 60);

    // Contenedor principal de los datos
    doc.setDrawColor(220, 225, 230);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, 65, 180, 30, 4, 4, 'FD');

    // Separadores verticales
    doc.setDrawColor(230, 235, 240);
    doc.setLineWidth(0.5);
    doc.line(75, 70, 75, 90);
    doc.line(135, 70, 135, 90);

    // Métrica 1: Ingresos
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Ingresos Recaudados', 22, 76);
    doc.setFontSize(14);
    doc.setTextColor(25, 135, 84); // Success Green
    doc.setFont('helvetica', 'bold');
    doc.text(datosFinancieros.ingresos, 22, 85);

    // Métrica 2: Egresos
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Egresos del Mes', 82, 76);
    doc.setFontSize(14);
    doc.setTextColor(220, 53, 69); // Danger Red
    doc.setFont('helvetica', 'bold');
    doc.text(datosFinancieros.egresos, 82, 85);

    // Métrica 3: Fondo Reserva
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Fondo de Reserva', 142, 76);
    doc.setFontSize(14);
    doc.setTextColor(0, 86, 179); // Primary Blue
    doc.setFont('helvetica', 'bold');
    doc.text(datosFinancieros.fondo, 142, 85);

    // --- TABLA DE MOROSIDAD VINCULADA A LA VISTA ---
    const bodyData = filteredMorosos.map(m => [ m.residente, m.unidad, 'Pago Vencido', m.deuda ]);

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalle de Residentes Pendientes', 15, 110);

    autoTable(doc, {
      startY: 115,
      head: [['Residente', 'Unidad / Dpto', 'Estado de Pago', 'Deuda Acumulada']],
      body: bodyData,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' },
      bodyStyles: { textColor: [60, 60, 60], fontSize: 10, valign: 'middle', padding: 6 },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold' },
        1: { halign: 'center' },
        2: { halign: 'center', textColor: [220, 53, 69], fontStyle: 'bold' },
        3: { halign: 'right', textColor: [220, 53, 69], fontStyle: 'bold' }
      },
      alternateRowStyles: { fillColor: [244, 247, 250] },
      margin: { left: 15, right: 15 }
    });

    // --- RENDERIZAR FONDOS Y FOOTERS AL FINAL PARA TODAS LAS PÁGINAS ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addPageFrameAndFooter(doc, i, pageCount);
    }

    doc.save('Reporte_Financiero_Domus.pdf');
  };

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">Resumen Financiero</h5>
        <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 small fw-bold shadow-lg" onClick={() => onOpenModal('Exportar Reporte', 'confirm-export', null, generarPDF)}>
          <i className="bi bi-file-earmark-pdf me-2"></i> Exportar Reporte
        </button>
      </div>
    <div className="col-md-4">
      <div className="service-card-elite p-4 h-100">
        <div className="text-success mb-3"><i className="bi bi-graph-up-arrow fs-2"></i></div>
        <h6 className="text-white-50 text-uppercase small fw-bold">Ingresos del Mes</h6>
        <h2 className="text-white fw-bold mb-0">{datosFinancieros.ingresos}</h2>
      </div>
    </div>
    <div className="col-md-4">
      <div className="service-card-elite p-4 h-100">
        <div className="text-danger mb-3"><i className="bi bi-graph-down-arrow fs-2"></i></div>
        <h6 className="text-white-50 text-uppercase small fw-bold">Egresos del Mes</h6>
        <h2 className="text-white fw-bold mb-0">{datosFinancieros.egresos}</h2>
      </div>
    </div>
    <div className="col-md-4">
      <div className="service-card-elite p-4 h-100" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,86,179,0.1))' }}>
        <div className="text-info mb-3"><i className="bi bi-safe fs-2"></i></div>
        <h6 className="text-white-50 text-uppercase small fw-bold">Fondo de Reserva</h6>
        <h2 className="text-white fw-bold mb-0">{datosFinancieros.fondo}</h2>
      </div>
    </div>

    <div className="col-12 mt-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
        <h5 className="text-white mb-0">Gestión de Morosidad (Pendientes)</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar residente o unidad..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Registrar Moroso', 'form-moroso', null, (newMoroso) => setMorosos(prev => [newMoroso, ...prev]))}>
            <i className="bi bi-person-plus me-2"></i> Añadir Registro
          </button>
        </div>
      </div>
      <div className="service-card-elite p-0 overflow-hidden">
        <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
          <thead>
            <tr>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Residente</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Unidad</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3">Deuda</th>
              <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMorosos.length > 0 ? filteredMorosos.map((m) => (
              <tr key={m.id}>
                <td className="bg-transparent py-3 px-4 d-flex align-items-center">
                  <div className="avatar-circle me-3 shadow-sm" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>{m.iniciales}</div> 
                  <span className="text-white fw-medium">{m.residente}</span>
                </td>
                <td className="bg-transparent py-3">{m.unidad}</td>
                <td className="bg-transparent py-3 text-danger fw-bold">{m.deuda}</td>
                <td className="bg-transparent py-3 text-end px-4">
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-info rounded-pill px-3 hover-cyan" title="Editar Registro" onClick={() => onOpenModal('Editar Registro', 'form-moroso', m, (updatedMoroso) => setMorosos(prev => prev.map(mor => mor.id === m.id ? updatedMoroso : mor)))}><i className="bi bi-pencil-square"></i></button>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" title="Eliminar Registro" onClick={() => onOpenModal('Eliminar Registro', 'confirm-delete', { item: m.residente }, () => setMorosos(prev => prev.filter(mor => mor.id !== m.id)))}><i className="bi bi-trash"></i></button>
                    <button className="btn btn-sm btn-outline-success rounded-pill px-3 hover-cyan" title="Enviar Recordatorio" onClick={() => onOpenModal('Enviar Recordatorio', 'confirm-whatsapp', { item: m.residente })}><i className="bi bi-whatsapp"></i></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="bg-transparent py-5 text-center text-white-50">
                  <i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>
                  No se encontraron residentes morosos con ese criterio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

const AdminDirectorio = ({ onOpenModal, residents, setResidents }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.depto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
        <h5 className="text-white mb-0">Directorio de Residentes</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px', maxWidth: '350px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar por nombre o dpto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-outline-info rounded-pill px-4 py-2 fw-bold w-100 w-sm-auto text-nowrap" onClick={() => onOpenModal('Registrar Nuevo Residente', 'form-residente', null, (newRes) => setResidents(prev => [...prev, newRes]))}><i className="bi bi-person-plus me-2"></i> Nuevo Residente</button>
        </div>
      </div>
      {filteredResidents.length > 0 ? filteredResidents.map((r) => (
        <div className="col-xl-4 col-md-6" key={r.id}>
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
                <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill fw-bold" onClick={() => onOpenModal('Editar Perfil', 'form-residente', r, (updatedRes) => setResidents(prev => prev.map(res => res.id === r.id ? updatedRes : res)))}><i className="bi bi-pencil-square me-1"></i> Editar</button>
                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" title="Eliminar Residente" onClick={() => onOpenModal('Eliminar Residente', 'confirm-delete', { item: r.name }, () => setResidents(prev => prev.filter(res => res.id !== r.id)))}><i className="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="col-12 text-center text-white-50 mt-5 py-5">
          <i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>
          <p>No se encontraron residentes con ese criterio de búsqueda.</p>
        </div>
      )}
    </div>
  );
};

const AdminComunicados = ({ onOpenModal, comunicados, setComunicados }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredComunicados = comunicados.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
        <h5 className="text-white mb-0">Tablón de Anuncios</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar por título o contenido..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Redactar Comunicado', 'form-comunicado', null, (newCom) => setComunicados(prev => [newCom, ...prev]))}>
            <i className="bi bi-plus-circle me-2"></i> Redactar Comunicado
          </button>
        </div>
      </div>
      {filteredComunicados.length > 0 ? filteredComunicados.map((c) => (
        <div className="col-lg-6" key={c.id}>
          <div className="service-card-elite p-4 h-100 d-flex flex-column position-relative">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className={`badge bg-${c.type} bg-opacity-25 text-${c.type} border border-${c.type} border-opacity-50 rounded-pill px-3`}>{c.scope}</span>
              <small className="text-white-50">{c.date}</small>
            </div>
            <h4 className="text-white fw-bold mb-3">{c.title}</h4>
            <p className="text-white-50 small flex-grow-1 lh-lg">{c.desc}</p>
            
            {/* BOTONES CRUD: EDITAR Y BORRAR */}
            <div className="d-flex gap-2 mt-3 pt-3 border-top border-secondary border-opacity-25">
              <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill fw-bold" onClick={() => onOpenModal('Editar Anuncio', 'form-comunicado', c, (updatedCom) => setComunicados(prev => prev.map(com => com.id === c.id ? updatedCom : com)))}><i className="bi bi-pencil-square me-1"></i> Editar Anuncio</button>
              <button className="btn btn-sm btn-outline-danger rounded-pill px-4" onClick={() => onOpenModal('Eliminar Anuncio', 'confirm-delete', { item: c.title }, () => setComunicados(prev => prev.filter(com => com.id !== c.id)))}><i className="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      )) : (
        <div className="col-12 text-center text-white-50 mt-5 py-5">
          <i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>
          <p>No se encontraron comunicados con ese criterio de búsqueda.</p>
        </div>
      )}
    </div>
  );
};

const AdminAreas = ({ onOpenModal, areas, setAreas }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = areas.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
        <h5 className="text-white mb-0">Zonas y Amenidades</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar área..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Registrar Nueva Área', 'form-area', null, (newArea) => setAreas(prev => [...prev, newArea]))}>
            <i className="bi bi-plus-circle me-2"></i> Registrar Área
          </button>
        </div>
      </div>
      {filteredAreas.length > 0 ? filteredAreas.map((a) => (
        <div className="col-lg-4 col-md-6" key={a.id}>
          <div className="service-card-elite p-4 h-100 d-flex flex-column align-items-center text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow" style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', border: `1px solid var(--bs-${a.color})` }}>
              <i className={`bi ${a.icon} fs-2 text-${a.color}`}></i>
            </div>
            <h5 className="text-white fw-bold mb-1">{a.name}</h5>
            <p className="text-white-50 small mb-3">Aforo Máximo: {a.capacity}</p>
            <span className={`badge bg-${a.color} bg-opacity-25 text-${a.color} rounded-pill px-3 mb-4`}>{a.status}</span>
            
            {/* BOTONES CRUD: EDITAR, SUSPENDER Y BORRAR */}
            <div className="mt-auto w-100 d-flex gap-2">
              <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill" title="Editar" onClick={() => onOpenModal('Editar Área', 'form-area', a, (updatedArea) => setAreas(prev => prev.map(ar => ar.id === a.id ? updatedArea : ar)))}><i className="bi bi-pencil-square"></i></button>
              <button className="btn btn-sm btn-outline-warning flex-grow-1 rounded-pill" title={a.status === 'Mantenimiento' ? 'Reactivar Operación' : 'Pausar Operación'} onClick={() => onOpenModal(a.status === 'Mantenimiento' ? 'Reactivar Operación' : 'Pausar Operación', 'confirm-pause', { item: a.name }, () => setAreas(prev => prev.map(ar => ar.id === a.id ? { ...ar, status: a.status === 'Mantenimiento' ? 'Activa' : 'Mantenimiento', color: a.status === 'Mantenimiento' ? 'success' : 'warning' } : ar)))}><i className={a.status === 'Mantenimiento' ? 'bi bi-play-circle' : 'bi bi-pause-circle'}></i></button>
              <button className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill" title="Eliminar" onClick={() => onOpenModal('Eliminar Área', 'confirm-delete', { item: a.name }, () => setAreas(prev => prev.filter(ar => ar.id !== a.id)))}><i className="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      )) : (
        <div className="col-12 text-center text-white-50 mt-5 py-5">
          <i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>
          <p>No se encontraron áreas con ese criterio de búsqueda.</p>
        </div>
      )}
      </div>
    );
};

const AdminMantenimiento = ({ onOpenModal, tickets, setTickets }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.depto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
        <h5 className="text-white mb-0">Gestión de Tickets</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar ticket o dpto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Nuevo Ticket', 'form-ticket', null, (newTk) => setTickets([newTk, ...tickets]))}>
            <i className="bi bi-plus-lg me-2"></i> Crear Ticket
          </button>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="p-4 rounded-4 h-100" style={{ background: 'rgba(255, 193, 7, 0.05)', border: '1px solid rgba(255, 193, 7, 0.2)' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="text-warning fw-bold mb-0"><i className="bi bi-tools me-2"></i> PENDIENTES ({filteredTickets.length})</h6>
          </div>
          {filteredTickets.length > 0 ? filteredTickets.map(t => (
            <div className="card bg-transparent border-secondary border-opacity-50 p-4 mb-3 hover-cyan transition-all" style={{ cursor: 'pointer' }} key={t.id}>
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <span className={`badge bg-${t.color} bg-opacity-25 text-${t.color} border border-${t.color} border-opacity-50 rounded-pill px-3`}>{t.priority}</span>
                <small className="text-white-50"><i className="bi bi-clock"></i> {t.time}</small>
              </div>
              <h5 className="text-white fw-bold mb-2">{t.title}</h5>
              <p className="text-white-50 small mb-4">Reportado por {t.depto}. {t.desc}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-info rounded-pill flex-grow-1 fw-bold" onClick={() => onOpenModal('Asignar Técnico', 'form-asignar', { item: t.title })}>Asignar Técnico</button>
                <button className="btn btn-sm btn-success rounded-pill px-3 shadow" title="Marcar completado" onClick={() => onOpenModal('Marcar como Completado', 'confirm-complete', { item: t.title }, () => setTickets(tickets.filter(tk => tk.id !== t.id)))}><i className="bi bi-check2 fs-5"></i></button>
              </div>
            </div>
          )) : (
            <div className="text-center text-white-50 mt-4 py-4">
              <i className="bi bi-search fs-2 d-block mb-2 opacity-50"></i>
              <small>No se encontraron tickets pendientes.</small>
            </div>
          )}
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
};

const AdminConfiguraciones = ({ onOpenModal, settings, setSettings }) => {
  const [draft, setDraft] = useState(settings);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sincronizar el borrador si el state global cambia externamente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(settings);
  }, [settings]);

  // Comprueba en tiempo real si el usuario modificó alguna configuración
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(settings);

  const handleSave = () => {
    onOpenModal('Guardar Configuración', 'confirm-save', null, () => {
      setSettings(draft);
      setShowSuccess(true);
      // Ocultar la notificación de éxito después de 3 segundos
      setTimeout(() => setShowSuccess(false), 3000);
    });
  };

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">Configuraciones del Sistema</h5>
        {showSuccess && (
          <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-3 py-2 rounded-pill shadow-sm" style={{ animation: 'fadeInDown 0.3s ease' }}>
            <i className="bi bi-check-circle-fill me-2"></i>Ajustes guardados con éxito
          </span>
        )}
      </div>

      <div className="col-lg-6">
        <div className="service-card-elite p-4 h-100">
          <div className="d-flex align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 text-info me-3" style={{ width: '40px', height: '40px' }}><i className="bi bi-building fs-5"></i></div>
            <h5 className="text-white fw-bold mb-0">Perfil del Condominio</h5>
          </div>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre Oficial</label>
            <input type="text" className="form-control bg-transparent text-white border-secondary shadow-none px-4 py-3 rounded-4" 
                   value={draft.condominioNombre} onChange={e => setDraft({...draft, condominioNombre: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Dirección Fiscal</label>
            <input type="text" className="form-control bg-transparent text-white border-secondary shadow-none px-4 py-3 rounded-4" 
                   value={draft.direccion} onChange={e => setDraft({...draft, direccion: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Moneda Principal</label>
            <select className="form-select bg-transparent text-white border-secondary shadow-none px-4 py-3 rounded-4"
                    value={draft.moneda} onChange={e => setDraft({...draft, moneda: e.target.value})}>
              <option value="USD" className="text-dark">Dólares (USD)</option>
              <option value="PEN" className="text-dark">Soles (PEN)</option>
              <option value="MXN" className="text-dark">Pesos (MXN)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="service-card-elite p-4 h-100">
          <div className="d-flex align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10 text-warning me-3" style={{ width: '40px', height: '40px' }}><i className="bi bi-sliders fs-5"></i></div>
            <h5 className="text-white fw-bold mb-0">Preferencias Globales</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 border border-secondary border-opacity-25 hover-cyan transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div>
              <h6 className="text-white mb-1"><i className="bi bi-whatsapp me-2 text-success"></i>Recordatorios Automáticos</h6>
              <small className="text-white-50">Enviar WhatsApp a morosos los días 5 de cada mes.</small>
            </div>
            <div className="form-check form-switch fs-4 m-0">
              <input className={`form-check-input border-0 shadow-none ${draft.recordatorios ? 'bg-info' : 'bg-secondary'}`} style={{ cursor: 'pointer' }} type="checkbox" checked={draft.recordatorios} onChange={e => setDraft({...draft, recordatorios: e.target.checked})} />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 border border-secondary border-opacity-25 hover-cyan transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div>
              <h6 className="text-white mb-1"><i className="bi bi-calendar-check me-2 text-info"></i>Reservas de Áreas Comunes</h6>
              <small className="text-white-50">Permitir a los residentes reservar desde la App Móvil.</small>
            </div>
            <div className="form-check form-switch fs-4 m-0">
              <input className={`form-check-input border-0 shadow-none ${draft.reservas ? 'bg-info' : 'bg-secondary'}`} style={{ cursor: 'pointer' }} type="checkbox" checked={draft.reservas} onChange={e => setDraft({...draft, reservas: e.target.checked})} />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 border border-secondary border-opacity-25 hover-cyan transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div>
              <h6 className="text-white mb-1"><i className="bi bi-qr-code-scan me-2 text-white"></i>Aprobación de Visitas Automática</h6>
              <small className="text-white-50">Los códigos QR no requieren revisión en portería.</small>
            </div>
            <div className="form-check form-switch fs-4 m-0">
              <input className={`form-check-input border-0 shadow-none ${draft.visitasAuto ? 'bg-info' : 'bg-secondary'}`} style={{ cursor: 'pointer' }} type="checkbox" checked={draft.visitasAuto} onChange={e => setDraft({...draft, visitasAuto: e.target.checked})} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mt-2">
        <div className="d-flex flex-column flex-md-row justify-content-end align-items-center gap-3 p-4 rounded-4" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          {hasChanges && <span className="text-warning small fw-bold me-auto animate-pulse"><i className="bi bi-info-circle-fill me-1"></i> Tienes cambios sin guardar</span>}
          <button className={`btn btn-outline-light rounded-pill px-4 fw-bold ${hasChanges ? '' : 'opacity-50'}`} disabled={!hasChanges} onClick={() => setDraft(settings)}>Descartar Cambios</button>
          <button className={`btn btn-premium-unique rounded-pill px-5 py-2 fw-bold text-white shadow-lg ${hasChanges ? '' : 'opacity-50'}`} disabled={!hasChanges} onClick={handleSave}><i className="bi bi-save-fill me-2"></i>Guardar Configuración</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ activeTab, onOpenModal }) => {
  const [settings, setSettings] = useState({
    condominioNombre: "Residencial Los Pinos",
    direccion: "Av. Principal 123, Ciudad Central",
    moneda: "USD",
    recordatorios: true,
    reservas: true,
    visitasAuto: false
  });
  const [transactions, setTransactions] = useState([
    { id: 1, unit: "Dpto 402", concept: "Cuota Mantenimiento", date: "Hoy, 10:23 AM", amount: "+$150.00", type: "income" },
    { id: 2, unit: "Dpto 105", concept: "Reserva Área Parrilla", date: "Ayer, 16:45 PM", amount: "+$25.00", type: "income" },
    { id: 3, unit: "Torre A", concept: "Pago a Proveedor (Limpieza)", date: "Ayer, 09:00 AM", amount: "-$450.00", type: "expense" }
  ]);
  const [morosos, setMorosos] = useState([
    { id: 1, residente: 'Carlos Mendoza', iniciales: 'CM', unidad: 'Dpto 801', deuda: '$300.00' },
    { id: 2, residente: 'Ana Ríos', iniciales: 'AR', unidad: 'Dpto 305', deuda: '$150.00' }
  ]);
  const [residents, setResidents] = useState([
    { id: 1, name: "Juan Pérez", depto: "402", phone: "+51 999 123 456", status: "Al Día", color: "success" },
    { id: 2, name: "Carlos Mendoza", depto: "801", phone: "+51 987 654 321", status: "Moroso", color: "danger" },
    { id: 3, name: "Laura Giraldo", depto: "105", phone: "+51 955 444 333", status: "Al Día", color: "success" }
  ]);
  const [comunicados, setComunicados] = useState([
    { id: 1, title: "Corte de Agua Programado", date: "15 Nov, 2023", scope: "Torre B", type: "warning", desc: "Se realizará mantenimiento preventivo en las bombas de agua desde las 10:00 AM hasta las 14:00 PM." },
    { id: 2, title: "Nueva Política de Mascotas", date: "10 Nov, 2023", scope: "Todos", type: "info", desc: "Se ha actualizado el reglamento interno respecto al tránsito de mascotas en áreas comunes. Por favor revisar el PDF adjunto." }
  ]);
  const [areas, setAreas] = useState([
    { id: 1, name: "Zona de Parrillas", capacity: "15 personas", status: "Activa", color: "success", icon: "bi-fire" },
    { id: 2, name: "Piscina Techada", capacity: "20 personas", status: "Mantenimiento", color: "warning", icon: "bi-water" },
    { id: 3, name: "Salón de Eventos", capacity: "50 personas", status: "Activa", color: "success", icon: "bi-music-note-beamed" }
  ]);
  const [tickets, setTickets] = useState([
    { id: 1, title: "Ascensor Torre B atascado", depto: "Dpto 502", desc: "Se detiene intermitentemente en el piso 3.", priority: "Alta Prioridad", color: "danger", time: "Hace 2 horas" },
    { id: 2, title: "Foco fundido en pasillo", depto: "Dpto 105", desc: "Pasillo sur del piso 1 sin iluminación.", priority: "Media", color: "warning", time: "Ayer" }
  ]);

  switch (activeTab) {
    case 'Finanzas y Cobros': return <AdminFinanzas onOpenModal={onOpenModal} morosos={morosos} setMorosos={setMorosos} />;
    case 'Directorio Residentes': return <AdminDirectorio onOpenModal={onOpenModal} residents={residents} setResidents={setResidents} />;
    case 'Comunicados': return <AdminComunicados onOpenModal={onOpenModal} comunicados={comunicados} setComunicados={setComunicados} />;
    case 'Gestión de Áreas': return <AdminAreas onOpenModal={onOpenModal} areas={areas} setAreas={setAreas} />;
    case 'Mantenimiento': return <AdminMantenimiento onOpenModal={onOpenModal} tickets={tickets} setTickets={setTickets} />;
    case 'Configuraciones': return <AdminConfiguraciones onOpenModal={onOpenModal} settings={settings} setSettings={setSettings} />;
    default: return <AdminPanelControl onOpenModal={onOpenModal} transactions={transactions} setTransactions={setTransactions} />;
  }
};

const ResidenteMiDomicilio = ({ onOpenModal, integrantes, setIntegrantes, setPagos, setVisitas, setReservas, setIncidencias }) => {
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
          <div className="col-6"><button className="btn btn-outline-info w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Pagar Mensualidad', 'form-pago', null, () => setPagos(prev => [{ id: Date.now(), periodo: "Mes Actual (Adelanto)", concepto: "Mensualidad", estado: "Procesando", monto: "$150.00", color: "warning" }, ...prev]))}><i className="bi bi-credit-card fs-4 d-block mb-1"></i> Pagar Cuota</button></div>
          <div className="col-6"><button className="btn btn-outline-success w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Autorizar Nueva Visita', 'form-visita', null, (newVis) => setVisitas(prev => [newVis, ...prev]))}><i className="bi bi-person-check fs-4 d-block mb-1"></i> Nueva Visita</button></div>
          <div className="col-6"><button className="btn btn-outline-warning w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Nueva Reserva', 'form-reserva', null, (newRes) => setReservas(prev => [newRes, ...prev]))}><i className="bi bi-calendar-star fs-4 d-block mb-1"></i> Reservar</button></div>
          <div className="col-6"><button className="btn btn-outline-danger w-100 rounded-4 py-3 hover-cyan" onClick={() => onOpenModal('Reportar Problema', 'form-incidencia', null, (newInc) => setIncidencias(prev => [newInc, ...prev]))}><i className="bi bi-exclamation-octagon fs-4 d-block mb-1"></i> Reportar</button></div>
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

const ResidentePagos = ({ onOpenModal, pagos, setPagos }) => (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-lg-4">
        <div className="service-card-elite p-4 p-md-5 h-100 d-flex flex-column justify-content-center text-center shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(25,135,84,0.1), rgba(0,212,255,0.05))', borderColor: 'rgba(25,135,84,0.3)' }}>
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 text-success mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
            <i className="bi bi-check2-circle display-4"></i>
          </div>
          <h2 className="display-5 fw-bold text-white mb-2">$0.00</h2>
          <p className="text-white-50 fs-5 mb-4">No tienes deudas activas.</p>
          <button className="btn btn-outline-success rounded-pill py-3 fw-bold w-100" onClick={() => onOpenModal('Adelantar Pago', 'form-pago', null, () => setPagos([{ id: Date.now(), periodo: "Noviembre 2023 (Adelanto)", concepto: "Mensualidad", estado: "Procesando", monto: "$150.00", color: "warning" }, ...pagos]))}>Adelantar Mensualidad</button>
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
              {pagos.map(p => (
                <tr key={p.id}>
                  <td className="bg-transparent py-3 px-4 text-white fw-medium">{p.periodo}</td>
                  <td className="bg-transparent py-3">{p.concepto}</td>
                  <td className="bg-transparent py-3"><span className={`badge bg-${p.color} bg-opacity-25 text-${p.color} rounded-pill px-3`}>{p.estado}</span></td>
                  <td className="bg-transparent py-3 text-end px-4 fw-bold">{p.monto} <button className="btn btn-sm btn-link text-info p-0 ms-2" title="Descargar Boleta"><i className="bi bi-file-earmark-pdf fs-5"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

const ResidenteVisitas = ({ onOpenModal, visitas, setVisitas }) => (
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

const ResidenteReservas = ({ onOpenModal, reservas, setReservas }) => (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
        <h5 className="text-white mb-0">Mis Reservas</h5>
        <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Nueva Reserva', 'form-reserva', null, (newRes) => setReservas([newRes, ...reservas]))}>
          <i className="bi bi-calendar-plus me-2"></i> Reservar Área
        </button>
      </div>
      <div className="col-12 mt-2">
        <div className="service-card-elite p-0 overflow-hidden">
          <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td className="bg-transparent py-3 px-4"><div className="d-flex align-items-center"><i className={`bi ${r.icon} fs-4 me-3 text-${r.color === 'secondary' ? 'info' : r.color}`}></i><span className="text-white fw-medium">{r.area}</span></div></td>
                  <td className="bg-transparent py-3">{r.date} <small className="d-block opacity-50">{r.time}</small></td>
                  <td className="bg-transparent py-3"><span className={`badge bg-${r.color} bg-opacity-25 text-${r.color === 'secondary' ? 'white-50' : r.color} rounded-pill px-3`}>{r.status}</span></td>
                  <td className="bg-transparent py-3 text-end px-4">
                    <button className="btn btn-sm btn-link text-danger p-0" onClick={() => onOpenModal('Cancelar Reserva', 'confirm-delete', { item: r.area }, () => setReservas(reservas.filter(res => res.id !== r.id)))}><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
              ))}
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

const ResidenteAsambleas = ({ onOpenModal, voted, setVoted }) => (
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
            <button className={`btn btn-${voted ? 'success' : 'premium-unique'} rounded-pill px-5 py-3 fw-bold text-white shadow-lg`} disabled={voted} onClick={() => onOpenModal('Emitir Voto', 'form-voto', null, () => setVoted(true))}>
              <i className={`bi ${voted ? 'bi-check-all' : 'bi-check2-square'} me-2`}></i> {voted ? 'Voto Registrado' : 'Emitir mi Voto'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

const ResidenteIncidencias = ({ onOpenModal, incidencias, setIncidencias }) => (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
        <h5 className="text-white mb-0">Historial de Reportes</h5>
        <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg" onClick={() => onOpenModal('Reportar Problema', 'form-incidencia', null, (newInc) => setIncidencias([newInc, ...incidencias]))}>
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
              {incidencias.map(i => (
                <tr key={i.id}>
                  <td className={`bg-transparent py-3 px-4 text-white fw-medium ${i.status === 'Resuelto' ? 'text-decoration-line-through opacity-50' : ''}`}>{i.asunto}</td>
                  <td className={`bg-transparent py-3 ${i.status === 'Resuelto' ? 'opacity-50' : ''}`}>{i.date}</td>
                  <td className="bg-transparent py-3"><span className={`badge bg-${i.color} bg-opacity-25 text-${i.color} border border-${i.color} border-opacity-50 rounded-pill ${i.status === 'Resuelto' ? 'opacity-75' : ''}`}>{i.status}</span></td>
                  <td className="bg-transparent py-3 text-end px-4">
                    <button className={`btn btn-sm btn-outline-${i.status === 'Resuelto' ? 'secondary' : 'danger'} rounded-pill px-3`} disabled={i.status === 'Resuelto'} onClick={() => onOpenModal('Eliminar Reporte', 'confirm-delete', { item: i.asunto }, () => setIncidencias(incidencias.filter(inc => inc.id !== i.id)))}><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

const ResidenteEstacionamiento = ({ onOpenModal }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  return (
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
          <button className="btn btn-outline-info rounded-pill py-3 w-100 fw-bold mb-3 hover-cyan mt-auto" onClick={() => onOpenModal('Reservar Estacionamiento', 'form-reserva-estacionamiento', null, (sol) => setSolicitudes([sol, ...solicitudes]))}>
            <i className="bi bi-calendar-plus me-2"></i> Reservar para Visita
          </button>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="service-card-elite p-4 h-100 d-flex flex-column" style={{ border: '1px solid rgba(255, 193, 7, 0.2)' }}>
          <h6 className="text-warning text-uppercase small fw-bold mb-4"><i className="bi bi-arrow-left-right me-2"></i>Préstamo entre Vecinos</h6>
          <p className="text-white-50 mb-4 lh-lg">¿Tienes más de una visita o los espacios comunes están llenos? Solicita permiso a un vecino para usar su estacionamiento temporalmente.</p>
          <button className="btn btn-outline-warning rounded-pill py-3 w-100 fw-bold mt-auto hover-cyan" onClick={() => onOpenModal('Solicitar Estacionamiento a Vecino', 'form-permiso-estacionamiento', null, (sol) => setSolicitudes([sol, ...solicitudes]))}>
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
          <button className="btn btn-premium-unique rounded-pill px-5 py-3 fw-bold text-white shadow-lg text-nowrap" onClick={() => onOpenModal('Solicitar Carrito de Carga', 'form-carrito', null, (sol) => setSolicitudes([sol, ...solicitudes]))}>
            <i className="bi bi-cart-plus me-2"></i> Pedir Carrito
          </button>
        </div>
      </div>
      {solicitudes.length > 0 && (
        <div className="col-12 mt-4" style={{ animation: 'fadeInDown 0.3s ease' }}>
          <h6 className="text-white-50 text-uppercase small fw-bold mb-3">Historial de Solicitudes</h6>
          <div className="service-card-elite p-0 overflow-hidden">
            <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
              <tbody>
                {solicitudes.map(s => (
                  <tr key={s.id}>
                    <td className="bg-transparent py-3 px-4"><span className="text-white fw-medium">{s.tipo}</span></td>
                    <td className="bg-transparent py-3">{s.detalle}</td>
                    <td className="bg-transparent py-3"><span className={`badge bg-${s.color} bg-opacity-25 text-${s.color} rounded-pill px-3`}>{s.estado}</span></td>
                    <td className="bg-transparent py-3 text-end px-4">
                      <button className="btn btn-sm btn-link text-danger p-0" onClick={() => onOpenModal('Cancelar Solicitud', 'confirm-delete', { item: s.tipo }, () => setSolicitudes(solicitudes.filter(sol => sol.id !== s.id)))}><i className="bi bi-trash fs-5"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const ResidenteDashboard = ({ activeTab, onOpenModal }) => {
  const [integrantes, setIntegrantes] = useState([
    { id: 1, nombre: 'Laura Mendoza', rol: 'Titular', iniciales: 'LM', color: '' },
    { id: 2, nombre: 'Diego Mendoza', rol: 'Hijo', iniciales: 'DM', color: '#6c757d' }
  ]);
  const [pagos, setPagos] = useState([
    { id: 1, periodo: "Octubre 2023", concepto: "Mantenimiento + Agua", estado: "Pagado", monto: "$150.00", color: "success" },
    { id: 2, periodo: "Septiembre 2023", concepto: "Mantenimiento", estado: "Pagado", monto: "$120.00", color: "success" },
    { id: 3, periodo: "Agosto 2023", concepto: "Mantenimiento + Multa", estado: "Pagado", monto: "$180.00", color: "success" }
  ]);
  const [visitas, setVisitas] = useState([
    { id: 1, name: "Roberto Sánchez", type: "Familiar", date: "Hoy, 15:00 PM", pin: "8492", icon: "bi-person-heart", color: "info" },
    { id: 2, name: "Servicio Técnico Claro", type: "Proveedor", date: "Mañana, 10:00 AM", pin: "5103", icon: "bi-tools", color: "warning" }
  ]);
  const [reservas, setReservas] = useState([
    { id: 1, area: "Zona de Parrillas", date: "15 Nov, 2023", time: "18:00 - 22:00", status: "Aprobada", color: "success", icon: "bi-fire" },
    { id: 2, area: "Salón de Eventos", date: "02 Oct, 2023", time: "10:00 - 14:00", status: "Finalizada", color: "secondary", icon: "bi-music-note-beamed" }
  ]);
  const [incidencias, setIncidencias] = useState([
    { id: 1, asunto: "Fuga de agua en lavadero", date: "10 Nov, 2023", status: "En Revisión", color: "warning" },
    { id: 2, asunto: "Luz de pasillo quemada", date: "02 Nov, 2023", status: "Resuelto", color: "success" }
  ]);
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, tipo: "Reserva de Visita", detalle: "Placa: ABC-123 • Hoy (14:00 a 18:00)", estado: "Aprobada", color: "success" },
    { id: 2, tipo: "Carrito de Compras (Estándar)", detalle: "Por 1 Hora", estado: "En uso", color: "info" }
  ]);
  const [voted, setVoted] = useState(false);

  switch (activeTab) {
    case 'Pagos y Recibos': return <ResidentePagos onOpenModal={onOpenModal} pagos={pagos} setPagos={setPagos} />;
    case 'Control de Visitas': return <ResidenteVisitas onOpenModal={onOpenModal} visitas={visitas} setVisitas={setVisitas} />;
    case 'Reservar Áreas': return <ResidenteReservas onOpenModal={onOpenModal} reservas={reservas} setReservas={setReservas} />;
    case 'Estacionamiento y Carritos': return <ResidenteEstacionamiento onOpenModal={onOpenModal} solicitudes={solicitudes} setSolicitudes={setSolicitudes} />;
    case 'Comunicados': return <ResidenteComunicados />;
    case 'Asambleas y Votaciones': return <ResidenteAsambleas onOpenModal={onOpenModal} voted={voted} setVoted={setVoted} />;
    case 'Reportar Incidencia': return <ResidenteIncidencias onOpenModal={onOpenModal} incidencias={incidencias} setIncidencias={setIncidencias} />;
    default: return <ResidenteMiDomicilio onOpenModal={onOpenModal} integrantes={integrantes} setIntegrantes={setIntegrantes} setPagos={setPagos} setVisitas={setVisitas} setReservas={setReservas} setIncidencias={setIncidencias} />;
  }
};

const SeguridadMonitor = ({ panicoActivo, setPanicoActivo, accesos, camaras }) => {
  const camarasActivas = camaras.filter(c => c.status === 'Grabando').length;
  
  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 mb-2">
        <div className={`alert ${panicoActivo ? 'alert-danger' : 'alert-dark'} bg-transparent ${panicoActivo ? 'border-danger text-danger' : 'border-secondary text-white-50'} d-flex flex-column flex-md-row align-items-center rounded-4 p-4 shadow-lg text-center text-md-start`} style={{ transition: 'all 0.3s ease', animation: panicoActivo ? 'pulse-blue 1.5s infinite' : 'none' }}>
          <i className={`bi ${panicoActivo ? 'bi-shield-fill-exclamation' : 'bi-shield-check'} fs-1 me-md-4 mb-3 mb-md-0`}></i>
          <div className="flex-grow-1 mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">{panicoActivo ? '¡ALERTA DE PÁNICO ACTIVADA!' : 'Sistema Operativo y Seguro'}</h5>
            <span className="small">{panicoActivo ? 'La policía y administración han sido notificadas.' : 'Usa esta función únicamente en caso de emergencia real.'}</span>
          </div>
          <button className={`btn ${panicoActivo ? 'btn-outline-danger' : 'btn-danger'} rounded-pill px-4 py-2 fw-bold shadow`} onClick={() => setPanicoActivo(!panicoActivo)}>
            {panicoActivo ? 'DESACTIVAR ALARMA' : 'ACTIVAR PÁNICO'}
          </button>
        </div>
      </div>
      <div className="col-md-4">
        <div className="service-card-elite p-4 h-100">
          <div className="text-info mb-2"><i className="bi bi-people fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Accesos Hoy</h6>
          <h2 className="text-white fw-bold mb-0">{accesos.length} Registros</h2>
        </div>
      </div>
      <div className="col-md-4">
        <div className="service-card-elite p-4 h-100">
          <div className="text-success mb-2"><i className="bi bi-camera-video fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Cámaras Activas</h6>
          <h2 className="text-white fw-bold mb-0">{camarasActivas} / {camaras.length} En línea</h2>
        </div>
      </div>
      <div className="col-md-4">
        <div className="service-card-elite p-4 h-100">
          <div className="text-warning mb-2"><i className="bi bi-journal-text fs-4"></i></div>
          <h6 className="text-white-50 text-uppercase small fw-bold">Novedades Turno</h6>
          <h2 className="text-white fw-bold mb-0">Sin alertas</h2>
        </div>
      </div>
      <div className="col-12 mt-4">
        <h5 className="text-white mb-3">Vista Previa - Monitoreo Rápido</h5>
        <div className="row g-4">
          {camaras.slice(0, 2).map((c, i) => (
            <div className="col-lg-6" key={c.id}>
              <div className="service-card-elite p-2 position-relative h-100">
                {c.status === 'Grabando' && <div className="position-absolute top-0 start-0 m-4 badge bg-danger rounded-pill" style={{ zIndex: 10, animation: 'pulse-blue 2s infinite' }}>EN VIVO</div>}
                <div className="rounded-4 w-100 bg-dark d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '250px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {c.status === 'Grabando' ? (
                    <img src={i === 0 ? "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800" : "https://images.unsplash.com/photo-1621245051978-0c62ba384638?q=80&w=800"} alt="Cámara" className="img-fluid w-100 h-100" style={{ objectFit: 'cover', filter: 'grayscale(30%) contrast(120%)' }} />
                  ) : (
                    <div className="text-center text-white-50"><i className="bi bi-camera-video-off fs-1 d-block mb-2"></i><small>Señal Perdida</small></div>
                  )}
                </div>
                <div className="mt-3 px-3 d-flex justify-content-between align-items-center pb-2">
                  <span className="text-white fw-bold">{c.name}</span>
                  <span className={`text-${c.color}`}><i className="bi bi-record-circle"></i> {c.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SeguridadAccesos = ({ onOpenModal, accesos, setAccesos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = accesos.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.dptoPlaca?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
        <h5 className="text-white mb-0">Control de Accesos</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar por nombre, placa o dpto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Registrar Acceso', 'form-acceso', null, (nuevo) => setAccesos([nuevo, ...accesos]))}>
            <i className="bi bi-plus-circle me-1"></i> Nuevo Ingreso
          </button>
        </div>
      </div>
      <div className="col-12">
        <div className="service-card-elite p-0 overflow-hidden">
          <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
            <thead>
              <tr>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Identificación</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Tipo de Acción</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Hora de Registro</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(acc => (
                <tr key={acc.id}>
                  <td className="bg-transparent py-3 px-4 d-flex align-items-center">
                    <i className={`bi ${acc.icon} text-${acc.color} fs-3 me-3`}></i>
                    <div><span className="text-white fw-medium d-block">{acc.name}</span>{acc.dptoPlaca && <small className="text-white-50">{acc.dptoPlaca}</small>}</div>
                  </td>
                  <td className="bg-transparent py-3"><span className={`badge bg-${acc.color} bg-opacity-25 text-${acc.color} rounded-pill px-3`}>{acc.action}</span></td>
                  <td className="bg-transparent py-3">{acc.time}</td>
                  <td className="bg-transparent py-3 text-end px-4">
                    <button className="btn btn-sm btn-outline-info rounded-pill px-3 me-2 hover-cyan" onClick={() => onOpenModal('Editar Acceso', 'form-acceso', acc, (updated) => setAccesos(accesos.map(a => a.id === acc.id ? updated : a)))}><i className="bi bi-pencil-square"></i></button>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => onOpenModal('Eliminar Registro', 'confirm-delete', { item: acc.name }, () => setAccesos(accesos.filter(a => a.id !== acc.id)))}><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4" className="bg-transparent py-5 text-center text-white-50"><i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>No se encontraron accesos.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SeguridadCamaras = ({ onOpenModal, camaras, setCamaras }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = camaras.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
        <h5 className="text-white mb-0">Cámaras (CCTV)</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar cámara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Añadir Cámara', 'form-camara', null, (nueva) => setCamaras([...camaras, nueva]))}>
            <i className="bi bi-camera-video me-1"></i> Nueva Cámara
          </button>
        </div>
      </div>
      {filtered.length > 0 ? filtered.map((c) => (
        <div className="col-xl-4 col-md-6" key={c.id}>
          <div className="service-card-elite p-4 h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className={`d-flex align-items-center justify-content-center rounded-3 bg-${c.color} bg-opacity-25 text-${c.color} me-3 shadow-sm`} style={{ width: '50px', height: '50px' }}><i className={`bi ${c.status === 'Grabando' ? 'bi-camera-video' : 'bi-camera-video-off'} fs-4`}></i></div>
              <span className={`badge bg-${c.color} bg-opacity-25 text-${c.color} border border-${c.color} border-opacity-50 rounded-pill px-3`}>{c.status}</span>
            </div>
            <h5 className="text-white fw-bold mb-1">{c.name}</h5>
            <p className="text-white-50 small mb-4"><i className="bi bi-geo-alt me-1"></i> {c.location}</p>
            <div className="d-flex gap-2 mt-auto pt-3 border-top border-secondary border-opacity-25">
              <button className="btn btn-sm btn-outline-info flex-grow-1 rounded-pill" onClick={() => onOpenModal('Configurar Cámara', 'form-camara', c, (updated) => setCamaras(camaras.map(cam => cam.id === c.id ? updated : cam)))}><i className="bi bi-gear-fill me-1"></i> Configurar</button>
              <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => onOpenModal('Eliminar Cámara', 'confirm-delete', { item: c.name }, () => setCamaras(camaras.filter(cam => cam.id !== c.id)))}><i className="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      )) : <div className="col-12 text-center text-white-50 mt-5 py-5"><i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i><p>No se encontraron cámaras.</p></div>}
    </div>
  );
};

const SeguridadBitacora = ({ onOpenModal, bitacora, setBitacora }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = bitacora.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="row g-4" style={{ animation: 'fadeInDown 0.5s ease' }}>
      <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
        <h5 className="text-white mb-0">Bitácora Digital</h5>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div className="input-group" style={{ minWidth: '280px' }}>
            <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none" placeholder="Buscar novedades..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-premium-unique rounded-pill text-white px-4 py-2 fw-bold shadow-lg text-nowrap w-100 w-sm-auto" onClick={() => onOpenModal('Nueva Entrada', 'form-bitacora', null, (nuevo) => setBitacora([nuevo, ...bitacora]))}>
            <i className="bi bi-journal-plus me-1"></i> Añadir Registro
          </button>
        </div>
      </div>
      <div className="col-12">
        <div className="service-card-elite p-0 overflow-hidden">
          <table className="table table-dark table-hover mb-0 bg-transparent text-white-50 align-middle">
            <thead>
              <tr>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 px-4">Asunto / Descripción</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Turno</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3">Fecha y Hora</th>
                <th className="bg-transparent text-white border-bottom border-secondary py-3 text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(b => (
                <tr key={b.id}>
                  <td className="bg-transparent py-3 px-4">
                    <div className="d-flex align-items-center">
                      <span className={`badge bg-${b.color} bg-opacity-25 text-${b.color} rounded-pill me-3 px-2 py-1`}><i className="bi bi-tag-fill me-1"></i>{b.type}</span>
                      <div><span className="text-white fw-bold d-block">{b.title}</span><small className="text-white-50">{b.desc}</small></div>
                    </div>
                  </td>
                  <td className="bg-transparent py-3 text-white-50"><i className="bi bi-person-badge me-1"></i>{b.shift}</td>
                  <td className="bg-transparent py-3">{b.time}</td>
                  <td className="bg-transparent py-3 text-end px-4">
                    <button className="btn btn-sm btn-outline-info rounded-pill px-3 me-2 hover-cyan" onClick={() => onOpenModal('Editar Registro', 'form-bitacora', b, (updated) => setBitacora(bitacora.map(item => item.id === b.id ? updated : item)))}><i className="bi bi-pencil-square"></i></button>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => onOpenModal('Eliminar Registro', 'confirm-delete', { item: b.title }, () => setBitacora(bitacora.filter(item => item.id !== b.id)))}><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4" className="bg-transparent py-5 text-center text-white-50"><i className="bi bi-search fs-1 d-block mb-3 opacity-50"></i>No se encontraron registros.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SeguridadDashboard = ({ activeTab, onOpenModal }) => {
  const [accesos, setAccesos] = useState([
    { id: 1, name: "Juan Pérez", dptoPlaca: "Dpto 402", typeCode: 'peatonal', action: "Ingreso Peatonal", time: "Hoy, 08:30 AM", icon: "bi-person-check-fill", color: "success" },
    { id: 2, name: "Carlos Ramos", dptoPlaca: "Placa ABC-123 (Dpto 105)", typeCode: 'vehiculo', action: "Ingreso Vehicular", time: "Hoy, 09:15 AM", icon: "bi-car-front-fill", color: "info" },
    { id: 3, name: "Repartidor Delivery", dptoPlaca: "Empresa Rappi", typeCode: 'salida', action: "Salida Registrada", time: "Hoy, 09:45 AM", icon: "bi-person-x-fill", color: "warning" }
  ]);
  const [camaras, setCamaras] = useState([
    { id: 1, name: "Cam 01: Ingreso Principal", location: "Lobby Frontal", status: "Grabando", color: "success" },
    { id: 2, name: "Cam 02: Estacionamiento Norte", location: "Sótano 1", status: "Offline", color: "danger" },
    { id: 3, name: "Cam 03: Ascensores", location: "Planta Baja", status: "Grabando", color: "success" }
  ]);
  const [bitacora, setBitacora] = useState([
    { id: 1, title: "Ronda sin novedades", desc: "Se verificó iluminación en sótanos y áreas perimetrales.", type: "Rutina", shift: "Noche", time: "05/11/2023 - 02:00 AM", color: "info" },
    { id: 2, title: "Portón trabado", desc: "El motor de la puerta vehicular presentó fallas al cerrar.", type: "Incidente", shift: "Día", time: "05/11/2023 - 10:30 AM", color: "warning" }
  ]);
  const [panicoActivo, setPanicoActivo] = useState(false);

  switch (activeTab) {
    case 'Control de Accesos': return <SeguridadAccesos onOpenModal={onOpenModal} accesos={accesos} setAccesos={setAccesos} />;
    case 'Cámaras (CCTV)': return <SeguridadCamaras onOpenModal={onOpenModal} camaras={camaras} setCamaras={setCamaras} />;
    case 'Bitácora Digital': return <SeguridadBitacora onOpenModal={onOpenModal} bitacora={bitacora} setBitacora={setBitacora} />;
    default: return <SeguridadMonitor panicoActivo={panicoActivo} setPanicoActivo={setPanicoActivo} accesos={accesos} camaras={camaras} />;
  }
};

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
  const [fileName, setFileName] = useState(''); // Estado global para los archivos adjuntos
  
  const openModal = (title, type, data = null, onConfirm = null) => {
    setFileName(''); // Limpiar archivo al abrir
    setModalConfig({ isOpen: true, title, type, data, onConfirm });
  };
  
  const closeModal = () => {
    setFileName(''); // Limpiar archivo al cerrar
    setModalConfig({ isOpen: false, title: '', type: '', data: null, onConfirm: null });
  };

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
        if (modalConfig.type === 'confirm-pause') return { btn: 'warning', icon: 'bi-pause-circle-fill', text: modalConfig.title === 'Reactivar Operación' ? 'Sí, Reactivar' : 'Pausar Operación' };
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
             modalConfig.type === 'confirm-export' ? <p>Se generará y descargará un documento PDF con los registros actuales.</p> :
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
          const telefono = formData.get('telefono');
          if (nombre && rol && modalConfig.onConfirm) {
            const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            modalConfig.onConfirm({ id: modalConfig.data?.id || Date.now(), nombre, rol, telefono: telefono || '', iniciales, color: modalConfig.data?.color || '#00d4ff' });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre Completo</label><input type="text" name="nombre" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.nombre || ''} placeholder="Ej. Camila Mendoza" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Parentesco</label><input type="text" name="rol" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.rol || ''} placeholder="Ej. Hija" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Teléfono (Opcional)</label><input type="text" name="telefono" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.telefono || ''} placeholder="+51..." /></div>
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
          const dni = formData.get('dni');
          const typeCode = formData.get('type');
          const date = formData.get('date');
          const time = formData.get('time');

          if (name && date && time && modalConfig.onConfirm) {
            // Configurar diseño dependiendo del tipo
            let typeStr = "Familiar"; let icon = "bi-person-heart"; let color = "info";
            if (typeCode === 'prov') { typeStr = "Proveedor"; icon = "bi-tools"; color = "warning"; }
            if (typeCode === 'del') { typeStr = "Delivery"; icon = "bi-box-seam"; color = "success"; }
            
            // Generar un PIN aleatorio de 4 dígitos
            const pin = modalConfig.data?.pin || Math.floor(1000 + Math.random() * 9000).toString();
            
            const dateObj = new Date(date + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
            
            modalConfig.onConfirm({
              id: modalConfig.data?.id || Date.now(),
              name,
              dni: dni || '',
              type: typeStr,
              date: `${date} • ${time}`,
              typeCode,
              // eslint-disable-next-line no-dupe-keys
              date: `${formattedDate} • ${time}`,
              rawDate: date,
              rawTime: time,
              pin,
              icon,
              color
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre o Empresa del Visitante</label><input type="text" name="name" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Roberto Sánchez / Empresa Delivery" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>DNI / Pasaporte</label><input type="text" name="dni" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.dni || ''} placeholder="Nro. Documento" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Visita</label>
              <select name="type" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.typeCode || 'fam'}>
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
                <input type="date" name="date" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} defaultValue={modalConfig.data?.rawDate || ''} min={today} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Estimada</label>
              <div className="position-relative">
                <i className="bi bi-clock position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="time" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} defaultValue={modalConfig.data?.rawTime || ''} />
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
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const area = formData.get('areaReserva');
          const date = formData.get('date');
          const timeStart = formData.get('timeStart');
          const timeEnd = formData.get('timeEnd');
          if (area && date && modalConfig.onConfirm) {
            let icon = 'bi-star';
            if (area === 'Zona de Parrillas') icon = 'bi-fire';
            if (area === 'Salón de Eventos') icon = 'bi-music-note-beamed';
            if (area === 'Piscina Techada') icon = 'bi-water';

            // Formatear la fecha para que se vea elegante en la tabla (Ej. "15 nov 2023")
            const dateObj = new Date(date + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              area, 
              date: formattedDate, 
              time: `${timeStart || '10:00'} - ${timeEnd || '12:00'}`,
              rawDate: date,
              rawTimeStart: timeStart,
              rawTimeEnd: timeEnd,
              status: modalConfig.data?.status || "Aprobada", 
              color: modalConfig.data?.color || "success", 
              icon: modalConfig.data?.icon || icon 
            });
            closeModal();
          }
        }}>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>Seleccionar Área Común</label>
            <div className="d-flex flex-column gap-2">
              
              <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                <input type="radio" name="areaReserva" value="Zona de Parrillas" className="form-check-input mt-0 me-4 shadow-none fs-4" defaultChecked={!modalConfig.data || modalConfig.data.area === 'Zona de Parrillas'} />
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-25 text-warning me-3 shadow-sm" style={{ width: '45px', height: '45px' }}><i className="bi bi-fire fs-5"></i></div>
                <div>
                  <span className="text-white fw-bold d-block">Zona de Parrillas</span>
                  <small className="text-white-50">Aforo: 15 personas</small>
                </div>
              </label>
              
              <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                <input type="radio" name="areaReserva" value="Salón de Eventos" className="form-check-input mt-0 me-4 shadow-none fs-4" defaultChecked={modalConfig.data?.area === 'Salón de Eventos'} />
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-25 text-info me-3 shadow-sm" style={{ width: '45px', height: '45px' }}><i className="bi bi-music-note-beamed fs-5"></i></div>
                <div>
                  <span className="text-white fw-bold d-block">Salón de Eventos</span>
                  <small className="text-white-50">Aforo: 50 personas</small>
                </div>
              </label>

              <label className="d-flex align-items-center p-3 rounded-4 border border-secondary border-opacity-50 transition-all hover-cyan shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                <input type="radio" name="areaReserva" value="Piscina Techada" className="form-check-input mt-0 me-4 shadow-none fs-4" defaultChecked={modalConfig.data?.area === 'Piscina Techada'} />
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
                <input type="date" name="date" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} defaultValue={modalConfig.data?.rawDate || ''} min={today} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Inicio</label>
              <div className="position-relative">
                <i className="bi bi-clock position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="timeStart" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} defaultValue={modalConfig.data?.rawTimeStart || ''} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Fin</label>
              <div className="position-relative">
                <i className="bi bi-clock-history position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="timeEnd" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} defaultValue={modalConfig.data?.rawTimeEnd || ''} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Confirmar Reserva</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-incidencia') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const asunto = formData.get('asunto');
          const tipo = formData.get('tipo');
          const desc = formData.get('desc');
          if (asunto && modalConfig.onConfirm) {
            const today = modalConfig.data?.date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
            modalConfig.onConfirm({ id: modalConfig.data?.id || Date.now(), asunto, tipo, desc, date: today, status: modalConfig.data?.status || "En Revisión", color: modalConfig.data?.color || "warning" });
            closeModal();
          }
        }}>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Problema</label>
              <select name="tipo" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.tipo || 'Plomería / Agua'}>
                <option value="Plomería / Agua">Plomería / Agua</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Áreas Comunes">Áreas Comunes</option>
                <option value="Seguridad">Seguridad</option>
              </select>
            </div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Asunto Breve</label><input type="text" name="asunto" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.asunto || ''} placeholder="Ej. Fuga en lavadero" /></div>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Descripción detallada</label><textarea name="desc" rows="3" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.desc || ''} placeholder="Explica el problema..."></textarea></div>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-2 text-uppercase d-block" style={{ letterSpacing: '1px' }}>Adjuntar Foto (Opcional)</label>
            <label className="border border-secondary border-opacity-50 rounded-3 p-4 text-center text-white-50 d-block transition-all hover-cyan shadow-sm" style={{ background: fileName ? 'rgba(0, 212, 255, 0.05)' : 'rgba(255,255,255,0.02)', borderStyle: fileName ? 'solid' : 'dashed', cursor: 'pointer', borderColor: fileName ? 'var(--accent-cyan)' : '' }}>
              <input type="file" name="foto" className="d-none" accept="image/*" onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
              {fileName ? (
                <>
                  <i className="bi bi-image fs-2 d-block mb-2 text-info"></i>
                  <span className="text-info fw-bold d-block text-truncate px-3">{fileName}</span>
                  <small className="d-block mt-1 text-white-50">Haz clic para cambiar la imagen</small>
                </>
              ) : (
                <>
                  <i className="bi bi-camera fs-2 d-block mb-2"></i>
                  <span className="d-block fw-medium mb-1">Haz clic para subir imagen</span>
                  <small className="text-white-50">Formatos: JPG, PNG (Max 5MB)</small>
                </>
              )}
            </label>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-danger text-white rounded-pill px-4 py-2 fw-bold shadow-lg"><i className="bi bi-send-exclamation me-2"></i>Enviar Reporte</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-residente') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name');
          const depto = formData.get('depto');
          const phone = formData.get('phone');
          if (name && modalConfig.onConfirm) {
            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              name, 
              depto: depto || 'N/A', 
              phone: phone || "No registrado",
              status: modalConfig.data?.status || "Al Día", 
              color: modalConfig.data?.color || "success" 
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre Completo</label><input type="text" name="name" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Juan Pérez" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Departamento</label><input type="text" name="depto" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.depto || ''} placeholder="Ej. 402" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Teléfono</label><input type="text" name="phone" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.phone || ''} placeholder="+51 999 888 777" /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Perfil</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-comunicado') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const title = formData.get('title');
          const scope = formData.get('scope');
          const desc = formData.get('desc');
          if (title && desc && modalConfig.onConfirm) {
            const today = modalConfig.data?.date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
            let type = "info"; if (scope === "torrea" || scope === "torreb") type = "warning";
            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              title, 
              date: today, 
              scope: scope === 'todos' ? 'Todos' : 'Específico', 
              type, 
              desc 
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Título del Anuncio</label><input type="text" name="title" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.title || ''} placeholder="Ej. Mantenimiento Preventivo" /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Alcance (Visibilidad)</label>
            <select name="scope" className="form-select shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.scope || 'todos'}>
              <option value="todos">Todos (Info)</option>
              <option value="torrea">Torre A (Warning)</option>
              <option value="torreb">Torre B (Warning)</option>
            </select>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Descripción / Mensaje</label><textarea name="desc" required rows="3" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.desc || ''} placeholder="Escribe el mensaje aquí..."></textarea></div>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-2 text-uppercase d-block" style={{ letterSpacing: '1px' }}>Adjuntar Archivo / Imagen (Opcional)</label>
            <label className="border border-secondary border-opacity-50 rounded-3 p-4 text-center text-white-50 d-block transition-all hover-cyan shadow-sm" style={{ background: fileName ? 'rgba(0, 212, 255, 0.05)' : 'rgba(255,255,255,0.02)', borderStyle: fileName ? 'solid' : 'dashed', cursor: 'pointer', borderColor: fileName ? 'var(--accent-cyan)' : '' }}>
              <input type="file" name="adjunto" className="d-none" accept="image/*,.pdf,.doc,.docx" onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
              {fileName ? (
                <>
                  <i className="bi bi-file-earmark-check fs-2 d-block mb-2 text-info"></i>
                  <span className="text-info fw-bold d-block text-truncate px-3">{fileName}</span>
                  <small className="d-block mt-1 text-white-50">Haz clic para cambiar el archivo</small>
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-arrow-up fs-2 d-block mb-2"></i>
                  <span className="d-block fw-medium mb-1">Haz clic para subir archivo</span>
                  <small className="text-white-50">Soporta: PDF, Word, JPG, PNG</small>
                </>
              )}
            </label>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Publicar Anuncio</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-area') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name');
          const capacity = formData.get('capacity');
          if (name && modalConfig.onConfirm) {
            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              name, 
              capacity: capacity || "10 personas", 
              status: modalConfig.data?.status || "Activa", 
              color: modalConfig.data?.color || "success",
              icon: modalConfig.data?.icon || "bi-star"
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre del Área / Amenidad</label><input type="text" name="name" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Zona de Parrillas" /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Aforo Máximo Permitido</label><input type="text" name="capacity" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.capacity || ''} placeholder="Ej. 15 personas" /></div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Área</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-ticket' || modalConfig.type === 'form-asignar') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          if (modalConfig.type === 'form-ticket') {
            const asunto = formData.get('asunto');
            const especialidadNode = e.target.elements.especialidad;
            const especialidadName = especialidadNode ? especialidadNode.options[especialidadNode.selectedIndex].text : 'Técnico General';
            
            if (asunto && modalConfig.onConfirm) {
              modalConfig.onConfirm({ id: Date.now(), title: asunto, depto: "Dpto Interno", desc: `Asignado a: ${especialidadName}.`, priority: "Media", color: "warning", time: "Ahora" });
            }
          } else if (modalConfig.type === 'form-asignar') {
            if (modalConfig.onConfirm) modalConfig.onConfirm();
          }
          closeModal();
        }}>
          {modalConfig.type === 'form-asignar' && <div className="alert alert-info bg-transparent border-info text-info mb-4 small rounded-3"><i className="bi bi-info-circle me-2"></i>Asignando técnico para: <strong>{modalConfig.data?.item}</strong></div>}
          {modalConfig.type === 'form-ticket' && <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Asunto del Ticket</label><input type="text" name="asunto" required className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. Filtración de agua" /></div>}
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Especialidad Requerida</label>
            <select name="especialidad" className="form-select shadow-none py-2" style={modalInputStyle}>
              <option value="tec1">Técnico General</option>
              <option value="tec2">Especialista en Plomería</option>
              <option value="tec3">Empresa Externa (Ascensores)</option>
            </select>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Confirmar Técnico</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-pago') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); if (modalConfig.onConfirm) modalConfig.onConfirm(); closeModal(); }}>
          <div className="alert alert-info bg-transparent border-info text-info mb-4 d-flex align-items-center rounded-3"><i className="bi bi-shield-lock-fill fs-4 me-3"></i><small>Transacción encriptada de extremo a extremo.</small></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Monto a Pagar</label><input type="text" className="form-control shadow-none fw-bold fs-5 text-success" style={modalInputStyle} defaultValue="$150.00" readOnly /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Número de Tarjeta</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="0000 0000 0000 0000" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Vencimiento</label><input type="text" className="form-control shadow-none" style={modalInputStyle} placeholder="MM/YY" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>CVV</label><input type="password" className="form-control shadow-none" style={modalInputStyle} placeholder="123" /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-success text-white rounded-pill px-4 py-2 fw-bold shadow-lg"><i className="bi bi-credit-card me-2"></i>Pagar Ahora</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-voto') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); if (modalConfig.onConfirm) modalConfig.onConfirm(); closeModal(); }}>
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
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg"><i className="bi bi-check2-square me-2"></i>Confirmar Voto</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-reserva-estacionamiento') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const placa = formData.get('placa');
          const fecha = formData.get('fecha');
          const horaLlegada = formData.get('horaLlegada');
          const horaSalida = formData.get('horaSalida');
          if (placa && fecha && modalConfig.onConfirm) {
            const dateObj = new Date(fecha + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
            modalConfig.onConfirm({ id: Date.now(), tipo: "Reserva de Visita", detalle: `Placa: ${placa} • ${formattedDate} (${horaLlegada || '10:00'} a ${horaSalida || '12:00'})`, estado: "Aprobada", color: "success" });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Placa del Vehículo</label><input type="text" name="placa" required className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. ABC-123" /></div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Fecha</label>
              <div className="position-relative">
                <i className="bi bi-calendar-event position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="date" name="fecha" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} min={today} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Llegada</label>
              <div className="position-relative">
                <i className="bi bi-box-arrow-in-right position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="horaLlegada" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Salida</label>
              <div className="position-relative">
                <i className="bi bi-box-arrow-right position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="horaSalida" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Confirmar Reserva</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-permiso-estacionamiento') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const dpto = formData.get('dpto');
          const placa = formData.get('placa');
          const horaInicio = formData.get('horaInicio');
          const horaFin = formData.get('horaFin');
          const mensaje = formData.get('mensaje');
          if (dpto && modalConfig.onConfirm) {
            modalConfig.onConfirm({ id: Date.now(), tipo: `Permiso a Dpto ${dpto}`, detalle: `Placa: ${placa || 'N/A'} • De ${horaInicio || '10:00'} a ${horaFin || '12:00'}`, mensaje, estado: "Pendiente", color: "warning" });
            closeModal();
          }
        }}>
          <div className="alert alert-warning bg-transparent border-warning text-warning mb-4 d-flex align-items-center rounded-3 small"><i className="bi bi-info-circle-fill fs-4 me-3"></i>El vecino recibirá una notificación para aprobar tu solicitud.</div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Dpto a Solicitar</label><input type="text" name="dpto" required className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. 502" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Placa Vehículo</label><input type="text" name="placa" className="form-control shadow-none" style={modalInputStyle} placeholder="Ej. XYZ-987" /></div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Inicio</label>
              <div className="position-relative">
                <i className="bi bi-clock position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="horaInicio" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
            <div className="col-6">
              <label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Hora Fin</label>
              <div className="position-relative">
                <i className="bi bi-clock-history position-absolute top-50 start-0 translate-middle-y ms-3 text-info fs-5"></i>
                <input type="time" name="horaFin" required className="form-control shadow-none date-time-premium" style={{...modalInputStyle, paddingLeft: '45px'}} />
              </div>
            </div>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Mensaje (Opcional)</label><input type="text" name="mensaje" className="form-control shadow-none" style={modalInputStyle} placeholder="Hola vecino, ¿podría prestarme su espacio?" /></div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-warning text-dark rounded-pill px-4 py-2 fw-bold shadow-lg"><i className="bi bi-send-fill me-2"></i>Enviar Solicitud</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-carrito') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const tipo = new FormData(e.target).get('tipoCarrito');
          const tiempo = new FormData(e.target).get('tiempo');
          if (tipo && modalConfig.onConfirm) {
            modalConfig.onConfirm({ 
              id: Date.now(), 
              tipo, 
              detalle: `Por ${tiempo}`, 
              estado: "Aprobado", 
              color: "info" 
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Carrito</label>
            <select name="tipoCarrito" className="form-select shadow-none py-2" style={modalInputStyle}>
              <option>Carrito de Compras (Estándar)</option>
              <option>Carrito Plataforma (Carga Pesada)</option>
            </select>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tiempo Estimado</label>
            <select name="tiempo" className="form-select shadow-none py-2" style={modalInputStyle}>
              <option>15 Minutos</option>
              <option>30 Minutos</option>
              <option>1 Hora</option>
            </select>
          </div>
          <p className="text-white-50 small mb-4"><i className="bi bi-exclamation-triangle me-1"></i> Recuerde devolver el carrito en la zona designada en el sótano para evitar penalidades.</p>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-info text-dark rounded-pill px-4 py-2 fw-bold shadow-lg"><i className="bi bi-check2-circle me-2"></i>Confirmar Préstamo</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-transaccion') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const unit = formData.get('unit');
          const concept = formData.get('concept');
          const amountValue = formData.get('amount');
          const type = formData.get('type');
          if (unit && concept && amountValue && modalConfig.onConfirm) {
            const isIncome = type === 'income';
            const formattedAmount = `${isIncome ? '+' : '-'}$${parseFloat(amountValue).toFixed(2)}`;
            const currentDate = new Date();
            const dateString = `${currentDate.getDate()} ${currentDate.toLocaleString('es-ES', { month: 'short' })}, ${currentDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute:'2-digit' })}`;
            
            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              unit, 
              concept, 
              date: modalConfig.data?.date || dateString, 
              amount: formattedAmount, 
              type 
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Unidad / Origen</label><input type="text" name="unit" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.unit || ''} placeholder="Ej. Dpto 402 o Torre A" /></div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Concepto</label><input type="text" name="concept" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.concept || ''} placeholder="Ej. Cuota Mantenimiento" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo</label>
              <select name="type" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.type || 'income'}>
                <option value="income">Ingreso (+)</option>
                <option value="expense">Egreso (-)</option>
              </select>
            </div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Monto ($)</label><input type="number" step="0.01" name="amount" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.amount ? modalConfig.data.amount.replace(/[^0-9.]/g, '') : ''} placeholder="150.00" /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Transacción</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-moroso') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const residente = formData.get('residente');
          const unidad = formData.get('unidad');
          const deudaValue = formData.get('deuda');
          if (residente && unidad && deudaValue && modalConfig.onConfirm) {
            const iniciales = residente.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const formattedDeuda = `$${parseFloat(deudaValue).toFixed(2)}`;
            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              residente, 
              iniciales,
              unidad, 
              deuda: formattedDeuda
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre del Residente</label><input type="text" name="residente" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.residente || ''} placeholder="Ej. Carlos Mendoza" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Unidad / Dpto</label><input type="text" name="unidad" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.unidad || ''} placeholder="Ej. Dpto 801" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Deuda Pendiente ($)</label><input type="number" step="0.01" name="deuda" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.deuda ? modalConfig.data.deuda.replace(/[^0-9.]/g, '') : ''} placeholder="300.00" /></div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Registro</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-acceso') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name');
          const dptoPlaca = formData.get('dptoPlaca');
          const typeCode = formData.get('type');
          if (name && modalConfig.onConfirm) {
            let icon = 'bi-person-check-fill'; let color = 'success'; let action = 'Ingreso Peatonal';
            if (typeCode === 'vehiculo') { icon = 'bi-car-front-fill'; color = 'info'; action = 'Ingreso Vehicular'; }
            if (typeCode === 'salida') { icon = 'bi-person-x-fill'; color = 'warning'; action = 'Salida Registrada'; }
            modalConfig.onConfirm({ 
              id: modalConfig.data?.id || Date.now(), 
              name, 
              dptoPlaca: dptoPlaca || '',
              typeCode,
              action, 
              time: modalConfig.data?.time || 'Ahora mismo', 
              icon, color 
            });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre o Empresa</label><input type="text" name="name" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Juan Pérez" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Dpto o Placa (Opcional)</label><input type="text" name="dptoPlaca" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.dptoPlaca || ''} placeholder="Ej. Dpto 402" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Registro</label>
            <select name="type" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.typeCode || 'peatonal'}>
              <option value="peatonal">Ingreso Peatonal</option>
              <option value="vehiculo">Ingreso Vehicular</option>
              <option value="salida">Registro de Salida</option>
            </select>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Registro</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-camara') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name');
          const location = formData.get('location');
          const status = formData.get('status');
          if (name && modalConfig.onConfirm) {
            let color = 'success';
            if (status === 'Offline') color = 'danger';
            if (status === 'Mantenimiento') color = 'warning';
            modalConfig.onConfirm({ id: modalConfig.data?.id || Date.now(), name, location, status, color });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Nombre / Etiqueta de la Cámara</label><input type="text" name="name" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.name || ''} placeholder="Ej. Cam 04: Pasillo Sur" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Ubicación Física</label><input type="text" name="location" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.location || ''} placeholder="Ej. Planta Baja" /></div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Estado Operativo</label>
              <select name="status" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.status || 'Grabando'}>
                <option value="Grabando">Online / Grabando</option>
                <option value="Offline">Offline / Señal Perdida</option>
                <option value="Mantenimiento">En Mantenimiento</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Registrar</button>
          </div>
        </form>
      );
    }

    if (modalConfig.type === 'form-bitacora') {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const title = formData.get('title');
          const desc = formData.get('desc');
          const type = formData.get('type');
          const shift = formData.get('shift');
          if (title && modalConfig.onConfirm) {
            let color = 'info'; if (type === 'Incidente') color = 'warning'; if (type === 'Emergencia') color = 'danger';
            const currentTime = modalConfig.data?.time || new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit' });
            modalConfig.onConfirm({ id: modalConfig.data?.id || Date.now(), title, desc, type, shift, time: currentTime, color });
            closeModal();
          }
        }}>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Asunto o Novedad</label><input type="text" name="title" required className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.title || ''} placeholder="Ej. Ronda sin novedades" /></div>
          <div className="row g-3 mb-4">
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Tipo de Reporte</label>
              <select name="type" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.type || 'Rutina'}>
                <option value="Rutina">Ronda de Rutina</option>
                <option value="Incidente">Incidente Leve</option>
                <option value="Emergencia">Emergencia / Grave</option>
              </select>
            </div>
            <div className="col-6"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Turno Asignado</label>
              <select name="shift" className="form-select shadow-none py-2" style={modalInputStyle} defaultValue={modalConfig.data?.shift || 'Día'}>
                <option value="Día">Turno Día</option>
                <option value="Noche">Turno Noche</option>
              </select>
            </div>
          </div>
          <div className="mb-4"><label className="text-info small fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>Descripción de los hechos</label><textarea name="desc" required rows="3" className="form-control shadow-none" style={modalInputStyle} defaultValue={modalConfig.data?.desc || ''} placeholder="Escribe el detalle aquí..."></textarea></div>
          <div className="mb-4">
            <label className="text-info small fw-bold mb-2 text-uppercase d-block" style={{ letterSpacing: '1px' }}>Adjuntar Foto / Evidencia (Opcional)</label>
            <label className="border border-secondary border-opacity-50 rounded-3 p-4 text-center text-white-50 d-block transition-all hover-cyan shadow-sm" style={{ background: fileName ? 'rgba(0, 212, 255, 0.05)' : 'rgba(255,255,255,0.02)', borderStyle: fileName ? 'solid' : 'dashed', cursor: 'pointer', borderColor: fileName ? 'var(--accent-cyan)' : '' }}>
              <input type="file" name="foto" className="d-none" accept="image/*" onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
              {fileName ? (
                <>
                  <i className="bi bi-image fs-2 d-block mb-2 text-info"></i>
                  <span className="text-info fw-bold d-block text-truncate px-3">{fileName}</span>
                  <small className="d-block mt-1 text-white-50">Haz clic para cambiar la imagen</small>
                </>
              ) : (
                <>
                  <i className="bi bi-camera fs-2 d-block mb-2"></i>
                  <span className="d-block fw-medium mb-1">Haz clic para adjuntar foto al reporte</span>
                  <small className="text-white-50">Formatos: JPG, PNG (Max 5MB)</small>
                </>
              )}
            </label>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top border-secondary border-opacity-25">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn btn-premium-unique text-white rounded-pill px-4 py-2 fw-bold shadow-lg">Guardar Entrada</button>
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
        {role === 'seguridad' && <SeguridadDashboard activeTab={activeTab} onOpenModal={openModal} />}
        
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