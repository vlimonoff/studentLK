import * as React from 'react';
import styled from 'styled-components';
import { Grid } from '../components/Abiturients/Grid';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 920px;
  width: 100%;
`;

export const Abiturients = () => {
  return (
    <Container>
      <Grid />
    </Container>
  );
};
