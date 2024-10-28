import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './layouts/App';
import AppApp from './pages/AppApp';
import AppAppApp from './pages/AppAppApp';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AdminPayments from './pages/AdminPayments';
import Payments from './pages/Payments';
import Dashboard from './pages/Dashboard';
import Github from './pages/Github';
import Settings from './pages/Settings';
import Read from './pages/Read';
import Saas from './pages/Saas';
import Carousel from './pages/Carousel';
import AppOpen from './AppOpen';

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
        <Route path="/app" element={<AppLayout><AppOpen><AppAppApp /></AppOpen></AppLayout>} />
        <Route path="/app/dashboard" element={<AppLayout><AppOpen><ProtectedRoute element={Dashboard} /></AppOpen></AppLayout>} />
        <Route path="/app/payments" element={<AppLayout><AppOpen><ProtectedRoute element={Payments} /></AppOpen></AppLayout>} />
        <Route path="/app/admin" element={<AppLayout><AppOpen><ProtectedRoute element={AdminPayments} /></AppOpen></AppLayout>} />
        <Route path="/app/login" element={<AppLayout><AppOpen><Login /></AppOpen></AppLayout>} />
        <Route path="/app/logout" element={<AppLayout><AppOpen><Logout /></AppOpen></AppLayout>} />
        <Route path="/app/github" element={<AppLayout><AppOpen><Github /></AppOpen></AppLayout>} />
        <Route path="/app/settings" element={<AppLayout><AppOpen><Settings /></AppOpen></AppLayout>} />
        <Route path="/app/about" element={<AppLayout><AppOpen><AppAppApp /></AppOpen></AppLayout>} />
        <Route path="/app/contact" element={<AppLayout><AppOpen><AppAppApp /></AppOpen></AppLayout>} />
        <Route path="/app/read" element={<AppLayout><AppOpen><Read /></AppOpen></AppLayout>} />
        <Route path="/app/app" element={<AppLayout><AppOpen><AppApp /></AppOpen></AppLayout>} />
        <Route path="/app/saas" element={<AppLayout><AppOpen><Saas /></AppOpen></AppLayout>} />
        <Route path="/app/carousel" element={<AppLayout><AppOpen><Carousel /></AppOpen></AppLayout>} />
        <Route path="*" element={<Navigate to="/app" />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
