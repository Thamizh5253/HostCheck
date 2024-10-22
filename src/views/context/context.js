import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('Guest');
  const [role, setRole] = useState('');
  const [dbUrl, setDbUrl] = useState(
    // 'http://localhost:5000'
  'https://servnow-server.onrender.com'
    );
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get(`${dbUrl}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setAuth(true);
          setUsername(res.data.name);
          setRole(res.data.role);
        } else {
          setAuth(false);
        }
      })
      .then((err) => console.log(err));
  }, [auth]);

  return (
    <UsernameContext.Provider value={{ auth, setAuth, username, setUsername, profile, setProfile, role, setRole, dbUrl, setDbUrl }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContext;
