import './App.css';
import './styles.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Latest from './components/Latest';
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import Authors from './components/Authors'
import Author from './components/Author'
import FullBlogPost from './components/FullBlogPost';
import CurrentUserPosts from './components/CurrentUserPosts'

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
    <div className="wrapper">
      
      <div className="header">
      <div className="item">
      <h1 className="logo">Momentary Muse</h1>
      </div>
      <div className="item">
      <button>Placeholder login</button>
      </div>
      </div>
      <Routes>

        <Route path='/' element={<Login setUser={setUser} />}>
        </Route>
        <Route path='/signup' element={<Signup setUser={setUser} />}>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>);

  return (
    <div className="wrapper">
    <div className="header">
    <div className="item">
    <h1 className="logo">Momentary Muse</h1>
    </div>
    <div className="item">
    <span className="greeting">Hello, {user.username}</span>
    <button>Placeholder logout</button>
    </div>
    </div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/latest' element={<Latest />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/:id' element={<Author />} />
        <Route path='/posts/:id' element={<FullBlogPost user={user}/>} />
        <Route path='/users/:id' element={<Author user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />



      </Routes>


    </div>
  );
}

export default App;
