import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Latest from './components/Latest';
import Home from './components/Home'
import CreatePost from './components/CreatePost'

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
    <div>
      <h1>Momentary Muse</h1>
      <Routes>

        <Route path='/' element={<Login setUser={setUser} />}>
        </Route>
        <Route path='/signup' element={<Signup setUser={setUser} />}>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <h1>Momentary Muse</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/latest' element={<Latest />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path="*" element={<Navigate to="/" />} />



      </Routes>


    </div>
  );
}

export default App;
