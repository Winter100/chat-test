import { useState } from 'react';
import { saveTokenToSession } from '../utils/sessionStorageUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}/api/v1/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      saveTokenToSession(data?.token?.accessToken);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <div>
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default Login;
