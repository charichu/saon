import { useState} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const Signup = () => {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const { doRequest, errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();
    
    doRequest();
  };

  return (
    <div className="bg-dark text-white">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <br></br>
        <div className="form-group">
          <label>Email Address:</label>
          <input 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control bg-dark text-white" 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            value = {password}
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            className="form-control bg-dark text-white" 
          />
        </div>
        {errors}
        <button className="btn btn-secondary">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;