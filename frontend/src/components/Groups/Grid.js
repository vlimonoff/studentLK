import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../SimpleComponents/Button';
import { arr1, arr2 } from './assets/consts';

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  height: 100%;
  margin-left: 24px;
  padding: 24px;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 24px; /* ширина scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: none; /* цвет дорожки */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(16, 16, 16, 0.1); /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
    border: 10px solid #ffffff; /* padding вокруг плашки */
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 6fr 4fr 4fr;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  height: 62px;
  white-space: pre-wrap;
  border-bottom: 1px solid rgba(16, 16, 16, 0.1); pointer;
  ${(props) => {
    if (props.variant === 'mark') {
      return `
      & p {
        border: 1px solid rgba(16, 16, 16, 0.2);
        border-radius: 50vh;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(16, 16, 16, 0.7);
        padding: 0 10px;
        min-width: 40px;
        cursor: pointer;
      }
      `;
    }
  }}
`;

export const Grid = ({ groups, currentItem, currentOption }) => {
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <Button width={360}>Предсказать результаты ГИА и ВКР</Button>
      </div>
      <GridContainer>
        <GridItem></GridItem>
        <GridItem>ФИО</GridItem>
        <GridItem>{`Государственная\nитоговая аттестация`}</GridItem>
        <GridItem>{`Выпускная\nквалификационная работа`}</GridItem>
        {groups[currentItem]?.Users.map((user, i) => (
          <React.Fragment key={user.id}>
            <GridItem></GridItem>
            <GridItem>{`Студент ${user.id}-${user.login}`}</GridItem>
            <GridItem variant="mark"><p>{arr1[i]}</p></GridItem>
            <GridItem variant="mark"><p>{arr2[i]}</p></GridItem>
          </React.Fragment>
        ))}
      </GridContainer>
    </Container>
  );
};
