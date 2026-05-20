import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/registro" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirigir si la ruta requiere admin y el usuario no lo es
    return <Navigate to="/milab" replace />;
  }

  return children;
};

export default ProtectedRoute;
