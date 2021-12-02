import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkArea, LinkIcon } from './styled';
import { Props } from './interfaces';

import LoginIcon from '@mui/icons-material/Login';

const MenuItem = ({ icon, link, title }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  let active = location.pathname === link;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(link);
  }

  return (
    <LinkArea data-tip={title} data-for="tip-right" bg={active} href={link} onClick={handleLinkClick}>
      {icon.length > 0 && <LinkIcon src={icon} alt="icon" />}
      {icon.length === 0 && <LoginIcon className="loginIcon" />}
    </LinkArea>
  );
}

export default MenuItem;