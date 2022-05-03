import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Latest from './components/Latest';
import { BASE_URL } from './constants'
import Home from './components/Home'

function App() {
  const [user, setUser] = useState(null);
  console.log(user)

  let navigate = useNavigate();

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return (
    <Routes>
      <Route path='/' element={<Login setUser={setUser} />}>
      </Route>
      <Route path='/signup' element={<Signup setUser={setUser} />}>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>);

  return (
    <div className="App">
      <h1>I am a blog site</h1>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/latest' element={<Latest />} />
        <Route path="*" element={<Navigate to="/" />} />



      </Routes>


    </div>
  );
}

export default App;
