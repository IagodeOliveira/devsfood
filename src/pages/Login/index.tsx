import React, { useState } from "react";
import { Container, LoginArea, Form, SignUp } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import api from '../../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const reset = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await api.login(email, password);
    if(res && res.status === 201) {
      reset();
      dispatch({
        type: 'Set_Token',
        payload: res.email
      });
      const address = await api.address(email);
      dispatch({
        type: "Set_Address",
        payload: {
          address
        }
      });
      navigate("/");
    }
    if(res && res.status === 400) {
      alert(res.msg);
    }

    return () => {

    };
  };


  return (
    <Container>
      <LoginArea>
        Login
      </LoginArea>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          pattern="([a-z]{1,})([_.]{1})?([a-z0-9]{1,})@([a-z0-9]{2,})\.([a-z]{1,})(\.[a-z]{1,})?"
          placeholder="Enter email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern=".{6,}"
          placeholder="Enter password* (at least 6 characters)"
          required
        />
        <input type="submit" value="Submit" />
      </Form>
      <SignUp>
        <span>New at DevsFood?</span>
        <span>
          <Link className="link" to="/signup">Sign Up</Link>
        </span>
      </SignUp>
    </Container>
  )
}

export default Login
