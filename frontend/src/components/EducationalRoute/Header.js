import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../SimpleComponents/Button';

const Container = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 0.3fr 2fr;
  grid-template-rows: 1.2fr 1fr;
  grid-template-areas:
    'left top'
    'left bottom';
  gap: 0px 0px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 24px;
  margin: 0 0 24px 24px;
  & .left-container {
    grid-area: left;
    justify-self: center;
    align-self: center;
  }
  & .top-container {
    grid-area: top;
    align-self: center;
    display: grid;
    grid-template-columns: 0.8fr 0.2fr;
    grid-template-rows: 0.3fr 0.7fr;
    grid-template-areas:
      'title text'
      'title count';
    & h3 {
      grid-area: title;
      font-size: 36px;
      line-height: 44px;
    }
    & p {
      grid-area: text;
      font-size: 16px;
      line-height: 19px;
      color: rgba(16, 16, 16, 0.5);
      justify-self: center;
    }
    & h4 {
      grid-area: count;
      font-size: 36px;
      line-height: 44px;
      color: #264796;
      justify-self: center;
    }
  }
  & .bottom-container {
    grid-area: bottom;
    display: grid;
    grid-template-columns: 0.8fr 0.2fr;
    grid-template-areas:
      'text button';

    & p {
      font-size: 16px;
      line-height: 19px;
      color: rgba(16, 16, 16, 0.5);
    }
    & button {
      grid-area: button;
      justify-self: center;
    }
  }
`;

export const Header = () => {
  return (
    <Container>
      <div className="left-container">
        <svg width="95" height="85" viewBox="0 0 95 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M41.0398 1.78748C47.442 -1.76295 55.5861 0.569794 59.1638 6.91485L93.3876 66.3111C94.1408 68.0839 94.4704 69.5256 94.5645 71.0232C94.7528 74.5223 93.5289 77.9234 91.128 80.5408C88.7272 83.1488 85.479 84.6884 81.9483 84.875H13.0299C11.5706 84.7864 10.1112 84.4551 8.74606 83.9419C1.92013 81.1893 -1.37515 73.4446 1.4023 66.7309L35.8615 6.87286C37.0384 4.76872 38.8272 2.95385 41.0398 1.78748ZM47.4891 57.9085C45.2295 57.9085 43.3465 59.7747 43.3465 62.0188C43.3465 64.2536 45.2295 66.1244 47.4891 66.1244C49.7487 66.1244 51.5847 64.2536 51.5847 61.9675C51.5847 59.7327 49.7487 57.9085 47.4891 57.9085ZM47.4891 28.8006C45.2295 28.8006 43.3465 30.6155 43.3465 32.8596V46.0582C43.3465 48.2976 45.2295 50.1685 47.4891 50.1685C49.7487 50.1685 51.5847 48.2976 51.5847 46.0582V32.8596C51.5847 30.6155 49.7487 28.8006 47.4891 28.8006Z"
            fill="#264796"
          />
        </svg>
      </div>
      <div className="top-container">
        <h3>Уравнения математической физики</h3>
        <p>Ожидаемая оценка</p>
        <h4>4</h4>
        <p></p>
      </div>
      <div className="bottom-container">
        <p>
          В этом семестре изучается дисциплина “Уравнения математической физики”, с которой у Вас могут возникнуть
          трудности. Посмотрите наши рекомендации по улучшению успеваемости.
        </p>
        <Button width={150}>Подребнее</Button>
      </div>
    </Container>
  );
};
