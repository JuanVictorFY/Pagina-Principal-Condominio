import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares principales
app.use(cors()); // Permite peticiones desde el frontend (React)
app.use(express.json()); // Permite a Express entender JSON en las peticiones (req.body)

// --- RUTAS DE LA API ---
app.use('/api/auth', authRoutes);

// Ruta raíz (Mensaje de bienvenida para no ver "Cannot GET /")
app.get('/', (req, res) => {
  res.send('🏢 Bienvenido a la API del Backend de Domus');
});

// Ruta de prueba (Health Check)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor de Domus funcionando correctamente 🚀',
    timestamp: new Date().toISOString()
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});