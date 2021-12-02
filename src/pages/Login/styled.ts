import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  height: 400px;
  margin: auto;
  background-color: #000;
  color: #136713;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const LoginArea = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;

  input {
    margin: 10px 0;
    width: 90%;
    height: 40px;
    outline: 0;
    border: 0;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 17px;
  }

  input[type=submit] {
    cursor: pointer;
    color: #FFF;
    width: 70%;
    font-size: 19px;
    margin: 10px auto;
    background-color: #136713;
  }
`;

export const SignUp = styled.div`
  justify-self: end;
  flex: 1;
  text-align: center;
  padding: 20px 0;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111111;
  margin-top: 20px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  .link {
    display: block;
    cursor: pointer;
    font-size: 18px;
    color: #FFF;
    margin-top: 7px;
    width: 100px;
    text-decoration: none;
  }
`;