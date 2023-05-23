import * as React from 'react';
import styled from 'styled-components';
import { Chart } from '../components/EducationalRoute/Chart';
import { Header } from '../components/EducationalRoute/Header';
import { Navigation } from '../components/EducationalRoute/Navigation';

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  grid-template-rows: 0.3fr 1fr;
  gap: 0px 0px;
  height: 720px;
  width: 100%;
  grid-template-areas:
    'navigation chart'
    'navigation chart';
`;

export const EducationalRoute = () => {
  return (
    <GridLayout>
      <Navigation />
      {/* <Header /> */}
      <Chart />
    </GridLayout>
  );
};
