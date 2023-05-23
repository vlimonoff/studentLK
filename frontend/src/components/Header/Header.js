import * as React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.jpg';
import { Navigation } from './Navigation';
import { User } from './User';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const HeaderContainer = styled.div`
  height: 90px;
  background-color: #ffffff;
  border-radius: 15px;
  max-width: 1720px;
  width: 90%;
  display: flex;
  align-items: center;
  position: sticky;
  top: -15px;
`;

const Logo = styled.img`
  padding: 0 38px 0 24px;
`;

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <HeaderContainer>
      <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
      {isAuthenticated ? (
        <React.Fragment>
          <Navigation />
          <User />
        </React.Fragment>
      ) : null}
    </HeaderContainer>
  );
};
