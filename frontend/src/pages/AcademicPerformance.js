import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from '../components/AcademicPerformance/Navigation';
import { Grid } from '../components/AcademicPerformance/Grid';

const AcademicPerformanceContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  height: 920px;
  width: 100%;
  & * {
    box-sizing: border-box;
  }
`;

export const AcademicPerformance = () => {
  const [currentItem, setCurrentItem] = React.useState(-1);
  const [currentOption, setCurrentOption] = React.useState(0);

  return (
    <AcademicPerformanceContainer>
      <Navigation
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
      />
      <Grid currentItem={currentItem} currentOption={currentOption} />
    </AcademicPerformanceContainer>
  );
};
