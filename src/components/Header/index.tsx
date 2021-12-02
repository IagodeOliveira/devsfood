// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "./styled";

type Prop = {
  search: string;
  onSearch: (e: string) => void;
}

const Header = ({ search, onSearch }: Prop) => {
  // const navigate = useNavigate();
  const [inputActive, setInputActive] = useState(search === '' ? false : true);

  const handleBlur = () => {
    if(search === '') {
      setInputActive(false);
    }
  }

  return (
    <Container active={inputActive}>
      <img src="/assets/logo.png" alt="Logo" />
      <input 
        type="text"
        placeholder="Type a product..."
        value={search}
        onBlur={handleBlur}
        onFocus={() => setInputActive(true)}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Container>
  );
};

export default Header;
