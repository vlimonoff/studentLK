import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
`;

const Window = styled.div`
  position: relative;
  background-color: #ffffff;
  box-shadow: 0px 5px 25px rgba(16, 16, 16, 0.05);
  min-width: 312px;
  min-height: 224px;
  padding: 24px;
`;

const CloseButton = styled.svg`
  position: absolute;
  top: 22px;
  right: 25px;
  cursor: pointer;
`;

export const ModalWindow = ({ children, isActive, closeModalWindow }) => {
  return isActive ? (
    <Container>
      <Window>
        <CloseButton
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
          fill="rgba(16, 16, 16, 0.5)"
          onClick={closeModalWindow}
        >
          <path d="m252.615 838.768-35.383-35.383L444.616 576 217.232 348.615l35.383-35.383L480 540.616l227.385-227.384 35.383 35.383L515.384 576l227.384 227.385-35.383 35.383L480 611.384 252.615 838.768Z" />
        </CloseButton>
        {children}
      </Window>
    </Container>
  ) : null;
};
