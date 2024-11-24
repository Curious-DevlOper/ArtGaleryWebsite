import './App.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';

import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/layout/UserProfile';
import AdminProfile from './components/layout/AdminProfile';
import ArtistProfile from './components/layout/ArtistProfile';

import { navigationActions } from './store/navigate-slice';

const App = () => {
  const dispatch = useDispatch();

  // Access auth and navigation states from Redux
  const { isAuthenticated: isAuth, user } = useSelector((state) => state.auth);
  const redirect = useSelector((state) => state.navigation.redirect);

  // Handle navigation based on the redirect state in a useEffect
  useEffect(() => {
    if (redirect) {
      // Clear the redirect after navigating to avoid any further redirects
      dispatch(navigationActions.clearRedirect());
    }
  }, [redirect, dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            {!isAuth && <Route path="/login" element={<Login />} />}

            {/* Role-based protected routes */}
            {isAuth && user.role === 'user' && (
              <Route path="/user-profile" element={<UserProfile />} />
            )}
            {isAuth && user.role === 'admin' && (
              <Route path="/admin-dashboard" element={<AdminProfile />} />
            )}
            {isAuth && user.role === 'artist' && (
              <Route path="/artist-dashboard" element={<ArtistProfile />} />
            )}

            {/* Fallback for unmatched paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          
          {/* Handle the redirect here */}
          {redirect && <Navigate to={redirect} replace />}
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
