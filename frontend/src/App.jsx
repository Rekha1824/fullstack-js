import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Tasks from './Tasks';
import Register from './Register';


export default function App() {
  const loggedIn = !!localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={loggedIn ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={loggedIn ? "/tasks" : "/login"} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
