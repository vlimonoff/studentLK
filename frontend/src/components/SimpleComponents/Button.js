import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 35px;
  gap: 10px;
  background: ${(props) => (props.variant ? props.variant : '#003790')};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: 50px;
  transition: background-color 0.1s;
  &:hover {
    background: #bababa;
  }
`;
