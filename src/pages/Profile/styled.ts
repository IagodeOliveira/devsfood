import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 87vh;
  margin: auto;
  background-color: #000;
  color: #136713;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const ProfileArea = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 20px;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 15px;

  input[type=submit] {
    width: 100%;
    height: 45px;
    outline: 0;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    color: #FFF;
    font-size: 19px;
    margin: 10px auto;
    background-color: #136713;
  }
`;

export const LabelInp = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  label {
    width: 75px;
    text-align: center;
  }

  input {
    flex: 1;
    margin: 0 8px;
    height: 35px;
    outline: 0;
    border: 0;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 15px;
  }
`;