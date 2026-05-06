import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares principales
app.use(cors()); // Permite peticiones desde el frontend (React)
app.use(express.json()); // Permite a Express entender JSON en las peticiones (req.body)

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