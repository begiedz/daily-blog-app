import { useState } from 'react';
import { handleLogin, handleRegister } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isRegister) {
      setError('');
      await handleLogin({ username, password, setError });
      navigate('/');
    } else {
      setError('');
      await handleRegister({ username, email, password, setError });
      if (!error) window.location.reload();
    }
  };

  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">
        {isRegister ? 'Register' : 'Log in'}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-md max-w-full border p-8"
      >
        <div>
          <label className="fieldset-label">Username</label>
          <input
            type="text"
            placeholder="John"
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
            className="input validator w-full"
          />
          <div className="validator-hint">Enter valid username</div>
        </div>
        {isRegister && (
          <div>
            <label className="fieldset-label">E-mail</label>
            <input
              type="email"
              placeholder="john.doe@blog.pl"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="input validator w-full"
            />
            <div className="validator-hint">Enter valid email</div>
          </div>
        )}
        <div>
          <label className="fieldset-label">Password</label>
          <input
            type="password"
            placeholder="•••••••"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="input validator w-full"
          />
          <div className="validator-hint">Enter valid password</div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isRegister ? 'Register' : 'Log in'}
        </button>
      </form>
      <p>
        {(isRegister ? 'Already have an account?' : "Don't have an account?") +
          ' '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="link"
        >
          {isRegister ? 'Log in' : 'Register'}
        </button>
      </p>
    </>
  );
};

export default Login;
