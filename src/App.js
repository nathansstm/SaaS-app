import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './layouts/App';
import AppApp from './pages/AppApp';
<<<<<<< HEAD
import AppAppApp from './pages/AppAppApp';
=======
>>>>>>> origin/main
import Login from './pages/Login';
import Logout from './pages/Logout';
import AdminPayments from './pages/AdminPayments';
import Payments from './pages/Payments';
import Dashboard from './pages/Dashboard';
import Github from './pages/Github';
import Settings from './pages/Settings';
<<<<<<< HEAD
import Saas from './pages/Saas';
=======
import Seo from './pages/Seo';
>>>>>>> origin/main


// A wrapper component that combines App layout and the actual page content
const AppLayout = ({ children }) => {
  return (
    <App>
      {children}
    </App>
  );
};

const ProtectedRoute = ({ element: Component }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/authorize', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Unauthorized');
      })
      .then(() => {
        setIsAuthorized(true);
      })
      .catch(() => {
        setIsAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/app/login" />;
  }

  return <Component />;
};

function MainApp() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/app" element={<AppLayout><AppAppApp /></AppLayout>} />
=======
        <Route path="/app" element={<AppLayout><AppApp /></AppLayout>} />
>>>>>>> origin/main
        <Route path="/app/dashboard" element={<AppLayout><ProtectedRoute element={Dashboard} /></AppLayout>} />
        <Route path="/app/payments" element={<AppLayout><ProtectedRoute element={Payments} /></AppLayout>} />
        <Route path="/app/admin" element={<AppLayout><ProtectedRoute element={AdminPayments} /></AppLayout>} />
        <Route path="/app/login" element={<AppLayout><Login /></AppLayout>} />
        <Route path="/app/logout" element={<AppLayout><Logout /></AppLayout>} />
        <Route path="/app/github" element={<AppLayout><Github /></AppLayout>} />
        <Route path="/app/settings" element={<AppLayout><Settings /></AppLayout>} />
<<<<<<< HEAD
        <Route path="/app/about" element={<AppLayout><AppAppApp /></AppLayout>} />
        <Route path="/app/contact" element={<AppLayout><AppAppApp /></AppLayout>} />
        <Route path="/app/app" element={<AppLayout><AppApp /></AppLayout>} />
        <Route path="/app/saas" element={<AppLayout><Saas /></AppLayout>} />
=======
        <Route path="/app/about" element={<AppLayout><AppApp /></AppLayout>} />
        <Route path="/app/contact" element={<AppLayout><AppApp /></AppLayout>} />
        <Route path="/app/web" element={<AppLayout><AppApp /></AppLayout>} />
        <Route path="/app/seo" element={<AppLayout><Seo /></AppLayout>} />
>>>>>>> origin/main
        <Route path="*" element={<Navigate to="/app" />} />
      </Routes>
    </Router>
  );
}

export default MainApp;

