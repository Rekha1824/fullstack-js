import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();

  const handle = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/register', {
        username: user,
        password: pass
      });
      alert('User created! You can log in.');
      nav('/login');
    } catch (e) {
      alert('Username already exists');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
      <button onClick={handle}>Register</button>
    </div>
  );
}
