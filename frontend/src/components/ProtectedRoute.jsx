import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('domus_token');
  const userString = localStorage.getItem('domus_user');

  // 1. Si no hay token, significa que no ha iniciado sesión -> Lo mandamos al Login
  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  // 2. (Opcional) Si la ruta requiere un rol específico y el usuario no lo tiene -> Denegado
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // O puedes redirigirlo al dashboard general
  }

  // 3. Si todo está bien, le permitimos ver el componente hijo (Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;