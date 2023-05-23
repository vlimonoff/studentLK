import * as React from 'react';
import styled from 'styled-components';
import { options, filters, recomendations } from './assets/consts';
import { Archive } from './Archive';

const NavigationContainer = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  height: 100%;
  grid-area: navigation;
`;

const NavigationButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 44px;
  margin: 24px 24px 0 24px;
`;

const NavigationButton = styled.div`
  color: rgba(16, 16, 16, 0.5);
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${(props) => {
    if (props.variant === 'active')
      return `
        border-bottom: 1px solid #264796;
        color: #264796;
      `;
    if (props.variant === 'basic')
      return `
        border-bottom: 1px solid rgba(16, 16, 16, 0.1);
        &:hover {
          border-bottom: 1px solid #264796;
          color: #264796;
          cursor: pointer;
        }
      `;
  }}
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 24px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  gap: 16px;
  height: 49px;
  border: 1px solid rgba(16, 16, 16, 0.2);
  border-radius: 10px;
  position: relative;
  & svg {
    position: absolute;
    right: 16px;
  }
`;

const Menu = styled.div``;

const MenuItem = styled.div`
  white-space: pre-wrap;
  padding: 12px 24px 0 24px;
  background: ${(props) => {
    if (props.variant === 'active') return 'rgba(0, 55, 144, 0.03);';
    if (props.variant === 'basic') return '#ffffff;';
  }}
  display: grid; 
  grid-template-columns: 0.2fr 1.3fr; 
  grid-template-rows: 0.3fr 0.3fr 1.1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "icon title"
    "icon subtitle"
    "text text";
  & svg {
    justify-self: center;
    grid-area: icon; 
  }
  & h3 {
    grid-area: title; 
    align-self: center; 
    font-size: 16px;
    line-height: 19px;
    color: #101010;
    margin-bottom: 4px;
  }
  & h4 {
    grid-area: subtitle;  
    align-self: center; 
    font-size: 14px;
    line-height: 16px;
    color: #264796;
    margin-bottom: 6px;
  }
  & p {
    grid-area: text; 
    font-size: 16px;
    line-height: 19px;
    color: rgba(16, 16, 16, 0.5);
    height: 72px;
    border-bottom: 1px solid rgba(16, 16, 16, 0.1);
  }
  &:hover {
    background: rgba(0, 55, 144, 0.03);
    cursor: pointer;
  }
`;

export const Navigation = () => {
  const [currentOption, setCurrentOption] = React.useState(0);

  return (
    <NavigationContainer>
      <NavigationButtonsContainer>
        {options.map((option, index) => (
          <NavigationButton
            key={option}
            variant={index === currentOption ? 'active' : 'basic'}
            onClick={() => setCurrentOption(index)}
          >
            {option}
          </NavigationButton>
        ))}
      </NavigationButtonsContainer>
      {currentOption === 0 ? (
        <React.Fragment>
          <FiltersContainer>
            {filters.map((filter, index) => (
              <Filter key={filter}>
                {filter}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0.5L6 5.5L11 0.5" stroke="#101010" strokeOpacity="0.5" />
                </svg>
              </Filter>
            ))}
          </FiltersContainer>
          <Menu>
            {recomendations.map((recomendation, index) => (
              <MenuItem key={index + recomendation.title} variant={'basic'}>
                <svg width="40" height="36" viewBox="0 0 95 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M41.0398 1.78748C47.442 -1.76295 55.5861 0.569794 59.1638 6.91485L93.3876 66.3111C94.1408 68.0839 94.4704 69.5256 94.5645 71.0232C94.7528 74.5223 93.5289 77.9234 91.128 80.5408C88.7272 83.1488 85.479 84.6884 81.9483 84.875H13.0299C11.5706 84.7864 10.1112 84.4551 8.74606 83.9419C1.92013 81.1893 -1.37515 73.4446 1.4023 66.7309L35.8615 6.87286C37.0384 4.76872 38.8272 2.95385 41.0398 1.78748ZM47.4891 57.9085C45.2295 57.9085 43.3465 59.7747 43.3465 62.0188C43.3465 64.2536 45.2295 66.1244 47.4891 66.1244C49.7487 66.1244 51.5847 64.2536 51.5847 61.9675C51.5847 59.7327 49.7487 57.9085 47.4891 57.9085ZM47.4891 28.8006C45.2295 28.8006 43.3465 30.6155 43.3465 32.8596V46.0582C43.3465 48.2976 45.2295 50.1685 47.4891 50.1685C49.7487 50.1685 51.5847 48.2976 51.5847 46.0582V32.8596C51.5847 30.6155 49.7487 28.8006 47.4891 28.8006Z"
                    fill="#264796"
                  />
                </svg>
                <h3>{recomendation.title}</h3>
                <h4>{recomendation.subtitle}</h4>
                <p>{recomendation.text}</p>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      ) : (
        <Archive />
      )}
    </NavigationContainer>
  );
};
