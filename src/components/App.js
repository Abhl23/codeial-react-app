import {useEffect, useState} from 'react';
import {getPosts} from '../api';

import { Routes, Route } from 'react-router-dom';

import { Home, Login } from '../pages';
import {Loader, Navbar} from './';

const About = () => {
  return (
    <h1>About</h1>
  );
};

const UserInfo = () => {
  return (
    <h1>User</h1>
  );
};

const Page404 = () => {
  return (
    <h1>404 : Page not found.</h1>
  );
};

function App() {

  const [posts, setPosts]=useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response=await getPosts();

      console.log(response);

      if(response.success){
        setPosts(response.data.posts);
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  if(loading){
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </div>
  );
}

export default App;
