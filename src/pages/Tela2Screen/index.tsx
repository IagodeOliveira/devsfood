import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Titulo } from "./styled";
import React from "react";
import { User } from "../../reducer";

const Tela2Screen = () => {
  const navigate = useNavigate();

  let { nome } = useParams();

  const token = useSelector((state: User) => state.user.token);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  return (
    <Container>
      <Titulo>Tela2 de {nome}</Titulo>

      <input type="text" value={token} onChange={handleTextChange} />

      <button onClick={() => navigate(-1)}>go back</button>
    </Container>
  );
};

export default Tela2Screen;
