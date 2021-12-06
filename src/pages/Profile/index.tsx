import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, ProfileArea, Form, LabelInp } from "./styled";
import api from "../../api";

const Profile = () => {
  const dispatch = useDispatch();
  const { address, status } = useSelector((state: User) => state.cart);
  const { email, token } = useSelector((state: User) => state.user);

  const [name, setName] = useState(address[0].name);
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [state, setState] = useState(address[0].state);
  const [city, setCity] = useState(address[0].city);
  const [newAddress, setNewAddress] = useState(address[0].address);
  const [phone, setPhone] = useState(address[0].phone);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem('authToken', "");
    dispatch({
      type: "Reset",
      payload: {}
    });
    dispatch({
      type: "Set_Token",
      payload: ""
    });
  }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(status === 'on') {
      alert("Cannot alter profile during ongoing purchase");
      return;
    }
    const obj = {
      name, email: newEmail, password, state, city, address: newAddress, phone
    }
    const res = await api.newProfile(obj, token, email);
    if(res && res.status === 200) {
      alert('New profile registered with success');
      dispatch({
        type: 'Set_Token',
        payload: res.json.email
      });
      dispatch({
        type: "Set_Address",
        payload: {
          address: 
            {
              name: res.json.name,
              city: res.json.city,
              phone: res.json.phone,
              state: res.json.state,
              address: res.json.address
            }
        }
      });
      navigate('/');
    }
    if(res && res.status === 400) {
      alert("Update Failed. Try again");
    };
    if(res && res.status === 401) {
      navigate('/login');
      handleLogOut();
      alert("Your session expired. Please login again");
    };
  };

  return (
    <Container>
      <ProfileArea>Profile</ProfileArea>
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
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern=".{6,}"
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
            required
          />
        </LabelInp>
        <LabelInp>
          <label>
            Address<sup>*</sup>
          </label>
          <input
            type="text"
            pattern="([a-zA-Z]{2,})\s([a-zA-Z]{2,})-(\s)?\d{1, 4}"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
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
            maxLength={15}
            value={phone}
            onChange={handlePhone}
            required
          />
        </LabelInp>

        <input type="submit" value="Submit" />
      </Form>
    </Container>
  );
};

export default Profile;

