import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from '../components/Groups/Navigation';
import { Grid } from '../components/Groups/Grid';
import { loadGroups } from '../store/data/actionsCreators';

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  height: 920px;
  width: 100%;
  & * {
    box-sizing: border-box;
  }
`;

export const Groups = () => {
  const [currentItem, setCurrentItem] = React.useState(-1);
  const [currentOption, setCurrentOption] = React.useState(0);
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    if (groups.length === 0) {
      setCurrentItem(-1);
    } else {
      setCurrentItem(0);
    }
  }, [groups.length]);

  React.useEffect(() => {
    loadGroups({ setGroups });
  }, []);

  return (
    <Container>
      <Navigation
        groups={groups}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
      />
      <Grid groups={groups} currentItem={currentItem} currentOption={currentOption} />
    </Container>
  );
};
