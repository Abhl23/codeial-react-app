import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <h1>404 : Page not found</h1>;
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  if (auth.user) {
    return children;
  }

  return <Navigate replace to="/login" />;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
