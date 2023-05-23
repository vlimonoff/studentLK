import * as React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/user/actionsCreators';

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  right: 24px;
`;

const UserInfo = styled.div`
  & h2 {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 4px;
    white-space: pre-wrap;
  }
  & p {
    font-size: 14px;
    line-height: 16px;
    color: rgba(16, 16, 16, 0.5);
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100px;
  right: -24px;
  background-color: #ffffff;
  width: 200px;
  box-shadow: 0px 5px 25px rgba(16, 16, 16, 0.05);
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.show ? '1' : '0')};
`;

const MenuItem = styled.div`
  padding: 16px 24px;
  color: #264796;
  &:hover {
    background: rgba(0, 55, 144, 0.03);
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(16, 16, 16, 0.1);
  overflow: hidden;
  cursor: pointer;
  margin-left: 24px;
`;

function useOutsideAlerter(ref, callback) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
}

export const User = () => {
  const dispatch = useDispatch();
  const { name, patronymic, surname, role, Group, Department } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef(null);
  const handleMenuClose = () => setShowMenu(false);
  useOutsideAlerter(menuRef, handleMenuClose);

  return (
    <UserContainer>
      <UserInfo>
        <h2>
          {surname ? `${surname}\n` : ''}
          {name ? `${name} ` : ''}
          {patronymic ? patronymic : ''}
        </h2>
        <p>
          {role === 'student'
            ? `Группа ${Group.groupName}`
            : role === 'professor'
            ? Department.title
            : role === 'admin'
            ? 'Администратор'
            : ''}
        </p>
      </UserInfo>
      <div ref={menuRef}>
        <Avatar onClick={() => setShowMenu((prev) => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="#ffffff">
            <path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5T731 696q31 14 50 41t19 65v94H160Z" />
          </svg>
        </Avatar>
        {showMenu ? (
          <UserMenu show={showMenu}>
            <MenuItem onClick={() => dispatch(logoutUser())}>Выйти</MenuItem>
          </UserMenu>
        ) : null}
      </div>
    </UserContainer>
  );
};
