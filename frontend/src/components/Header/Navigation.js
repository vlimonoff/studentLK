import * as React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';

import { navigation } from './assets/consts';
import { useSelector } from 'react-redux';

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  & * {
    box-sizing: border-box;
  }
`;

const NavigationButton = styled.div`
  display: flex;
  align-items: center;
  color: rgba(16, 16, 16, 0.5);
  height: 100%;
  margin: 0 28px;
  transition: all 0.1s ease-in-out;
  ${(props) => {
    if (props.variant === 'active')
      return `
        border-bottom: 1px solid #264796;
        color: #264796;
      `;
    if (props.variant === 'basic')
      return `
        border-bottom: 1px solid #ffffff;
        &:hover {
            border-bottom: 1px solid #264796;
            color: #264796;
            cursor: pointer;
        }
      `;
  }}
`;

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useSelector((state) => state.user);

  const [routes, setRoutes] = React.useState(navigation[role] || []);

  React.useEffect(() => {
    setRoutes(navigation[role] || []);
  }, [role]);

  return (
    <NavigationContainer>
      {routes.map((page) => (
        <NavigationButton
          key={page.path}
          onClick={() => navigate(page.path)}
          variant={location.pathname === page.path ? 'active' : 'basic'}
        >
          {page.title}
        </NavigationButton>
      ))}
    </NavigationContainer>
  );
};
