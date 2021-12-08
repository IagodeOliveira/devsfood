import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, SignUpArea, Form, LabelInp, Login } from "./styled";
import api from "../../api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const Navigate = useNavigate();

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    let newValue = handleMask(inputValue);
    setPhone(newValue);
  };

  const handleMask = (value: string): string => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    return (value = value.replace(/(\d)(\d{4})$/, "$1-$2"));
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setState('');
    setCity('');
    setAddress('');
    setPhone('');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      name, email, password, state, city, address, phone
    }
    const res = await api.signUp(obj);
    if(res && res.status === 200) {
      reset();
      alert('User registered with success');
      Navigate(-1);
    }
    if(res && res.status === 400) {
      alert(res.msg);
    }
  };

  return (
    <Container>
      <SignUpArea>Sign Up</SignUpArea>
      <Form onSubmit={handleSubmit}>
        <LabelInp>
          <label>
            Name<sup>*</sup>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            Email<sup>*</sup>
          </label>
          <input
            type="email"
            pattern="([a-z]{1,})([_.]{1})?([a-z0-9]{1,})@([a-z0-9]{2,})\.([a-z]{1,})(\.[a-z]{1,})?"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            Password<sup>*</sup>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern=".{6,}"
            placeholder="At least 6 characters"
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            State<sup>*</sup>
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            City<sup>*</sup>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            minLength={3}
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            Address<sup>*</sup>
          </label>
          <input
            type="text"
            placeholder="street x, 000"
            pattern="([a-zA-Z]{2,})\s([a-zA-Z]{2,}),(\s)?\d{1,4}"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            minLength={6}
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            Phone<sup>*</sup>
          </label>
          <input
            type="tel"
            pattern="\(\d{2}\)\s*\d{5}-\d{4}"
            placeholder="() xxxx-xxxx"
            maxLength={15}
            value={phone}
            onChange={handlePhone}
            required
          />
        </LabelInp>

        <input type="submit" value="Submit" />
      </Form>
      <Login>
        <span>Already have an Account?</span>
        <span>
          <Link className="link" to="/login">
            Login
          </Link>
        </span>
      </Login>
    </Container>
  );
};

export default SignUp;
