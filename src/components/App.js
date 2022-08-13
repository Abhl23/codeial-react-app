import { Routes, Route } from 'react-router-dom';

import { Home, Login } from '../pages';
import {Loader, Navbar} from './';
import { useAuth } from '../hooks';


const Page404 = () => {
  return (
    <h1>404 : Page not found</h1>
  );
};

function App() {

  const auth=useAuth();

  if(auth.loading){
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </div>
  );
}

export default App;
