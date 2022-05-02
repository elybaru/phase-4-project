import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <h1>I am a blog site</h1>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/login' element={<Login />}>
          <Route path='/signup' element={<Signup />}>
          </Route>
        </Route>
      </Routes>


    </div>
  );
}

export default App;
