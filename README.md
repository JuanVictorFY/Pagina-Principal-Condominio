# 🏢 Domus - Sistema Inteligente de Gestión de Condominios

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-FF0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)

**Domus** es una moderna plataforma SaaS (Software as a Service) diseñada para revolucionar la administración, seguridad y convivencia en edificios y condominios. 

Construido con **React** y un diseño premium basado en *glassmorphism*, Domus ofrece una experiencia de usuario (UX) inmersiva, rápida y 100% responsiva.

---

## ✨ Características Principales

El sistema cuenta con una arquitectura Multi-Rol que adapta la interfaz y las funciones según el usuario que inicia sesión:

### 👑 Módulo Administrador
- **Panel Financiero:** Control de recaudación, egresos y fondo de reserva.
- **Gestión de Morosidad:** Seguimiento de deudas y botones de acción rápida para enviar recordatorios por WhatsApp.
- **Generación de Reportes PDF:** Exportación corporativa de estados de cuenta usando `jsPDF` y `autoTable`.
- **Directorio y Comunicados:** Tablón de anuncios segmentado y gestión de residentes.
- **Mantenimiento y Áreas:** Gestión de tickets de incidencias y aforo de zonas comunes.

### 🏠 Módulo Residente
- **Mi Domicilio:** Gestión de integrantes del hogar y vehículos.
- **Pagos y Recibos:** Visualización del estado de cuenta y botones de simulación de pago.
- **Control de Visitas:** Autorización de visitas generando códigos PIN de acceso temporal.
- **Reservas Interactivas:** Solicitud de áreas comunes (parrillas, piscina) y carritos de carga.
- **Participación:** Votaciones de asambleas virtuales y reportes de incidencias con subida de fotos.

### 🛡️ Módulo Seguridad
- **Monitor Principal:** Dashboard de CCTV simulado y un botón de pánico de emergencia.
- **Control de Accesos:** Registro detallado de ingresos peatonales y vehiculares.
- **Bitácora Digital:** Registro inmutable de rondas, incidentes y novedades del turno.

---

## 🚀 Tecnologías Utilizadas

A continuación se detallan las tecnologías principales junto con el comando exacto para instalarlas de forma individual desde la terminal:

- **Frontend Core:** React.js, React Router DOM v6
  ```bash
  npm install react-router-dom
  ```
- **Estilos & UI:** Bootstrap 5, CSS3 Custom (Glassmorphism, CSS Variables)
  ```bash
  npm install bootstrap
  ```
- **Iconografía:** Bootstrap Icons
  ```bash
  npm install bootstrap-icons
  ```
- **Animaciones:** AOS (Animate On Scroll), CSS Keyframes
  ```bash
  npm install aos
  ```
- **Componentes Extra:** 
  - `react-slick` & `slick-carousel` (Carrusel interactivo avanzado)
    ```bash
    npm install react-slick slick-carousel
    ```
  - `jspdf` & `jspdf-autotable` (Generación de documentos PDF)
    ```bash
    npm install jspdf jspdf-autotable
    ```

---

## 📸 Vistas del Proyecto

*(Agrega aquí tus capturas de pantalla)*

1. **Landing Page / Home:** Diseño moderno enfocado en la conversión, con animaciones fluidas y una simulación interactiva del dashboard (`DashboardPreview.jsx`).
2. **Dashboard:** Menú lateral (Sidebar) colapsable, tablas responsivas y modales dinámicos inteligentes para el sistema CRUD.

---

## 🛠️ Instalación y Uso Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/domus-condominios.git
   ```

2. **Navegar al directorio del frontend:**
   ```bash
   cd domus-condominios/frontend
   ```

3. **Instalar las dependencias:**
   Asegúrate de tener Node.js instalado.
   ```bash
   npm install
   ```
   *Nota: Si utilizas yarn o pnpm, ejecuta `yarn install` o `pnpm install` respectivamente.*

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *(O `npm start` dependiendo si usas Vite o Create React App)*

5. **Probar el sistema (Login Demo):**
   Ve a la ruta de Login y utiliza los botones rápidos de Demo, o ingresa manualmente:
   - **Admin:** `admin@domus.com` / `123`
   - **Residente:** `residente@domus.com` / `123`
   - **Seguridad:** `seguridad@domus.com` / `123`

---

## 📂 Estructura Principal del Proyecto

```text
domus-condominios/
 ├── frontend/                 # Todo el ecosistema de React (UI, Vistas y Estilos)
 │    ├── src/
 │    │   ├── components/      # Componentes reusables
 │    │   ├── App.jsx          # Enrutador principal
 │    │   └── ... 
 │    ├── public/              # Recursos estáticos e imágenes
 │    ├── package.json         # Dependencias del frontend
 │    └── vite.config.js       # Configuración del empaquetador
 │
 └── backend/                  # (Próximamente) Código de tu API y Servidor
```

---

## 🤝 Contribución

¡Las sugerencias y pull requests son bienvenidos! Si deseas contribuir, por favor abre un *issue* primero para discutir los cambios que te gustaría realizar.

---

*Desarrollado con ❤️ para transformar la vida en comunidad.*