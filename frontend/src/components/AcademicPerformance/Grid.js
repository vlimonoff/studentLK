import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ModalWindow } from '../SimpleComponents/ModalWindow';
import { MarksEditForm } from './MarksEdit';
import { checkDateEntrance } from './assets/checkDateEntrance';
import { prognoses } from './assets/consts';

const GridLayout = styled.div`
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
  grid-template-columns: 6fr 2fr 2fr 0.5fr;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  height: 62px;
  white-space: pre-wrap;
  border-bottom: 1px solid rgba(16, 16, 16, 0.1); pointer;
  }
  ${(props) => {
    if (props.variant === 'mark') {
      return `
      & p {
        border: 1px solid rgba(67, 150, 46, 0.2);
        border-radius: 50vh;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #43962E;
        padding: 0 10px;
        min-width: 40px;
        cursor: pointer;
      }
      `;
    }
  }}
`;

const MoreButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Grid = ({ currentItem, currentOption }) => {
  const { disciplines } = useSelector((state) => state.data);
  const [modalWindow, setModalWindow] = React.useState({ isActive: false, type: null, params: {} });

  const [actualDisciplines, setActualDisciplines] = React.useState(
    currentOption === 0
      ? disciplines.filter((discipline) => checkDateEntrance(discipline.examDate.slice(0, 10)))
      : disciplines.filter((discipline) => !checkDateEntrance(discipline.examDate.slice(0, 10))),
  );

  React.useEffect(() => {
    setActualDisciplines(
      currentOption === 0
        ? disciplines.filter((discipline) => checkDateEntrance(discipline.examDate.slice(0, 10)))
        : disciplines.filter((discipline) => !checkDateEntrance(discipline.examDate.slice(0, 10))),
    );
  }, [currentOption, disciplines]);

  const closeModalWindow = () => setModalWindow({ isActive: false, type: null, params: {} });

  return (
    <React.Fragment>
      <GridLayout>
        <GridContainer>
          {currentItem === -1 ? (
            <React.Fragment>
              <GridItem>Данные отсутствуют</GridItem>
              <GridItem />
              <GridItem />
              <GridItem />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <GridItem>ФИО студента</GridItem>
              <GridItem>Прогноз</GridItem>
              <GridItem>Итог</GridItem>
              <GridItem />
              {actualDisciplines[currentItem]?.Group.Users.map((user, i) => (
                <React.Fragment key={user.id}>
                  {/* <GridItem>
                    {user.surname ? `${user.surname} ` : ''}
                    {user.name ? `${user.name} ` : ''}
                    {user.patronymic ? user.patronymic : ''}
                  </GridItem> */}
                  <GridItem>{`Студент ${user.id}-${user.login}`}</GridItem>
                  <GridItem variant="mark">
                    <p style={{ border: '1px solid rgba(16, 16, 16, 0.2)', color: 'rgba(16, 16, 16, 0.7)' }}>
                      {prognoses[i]}
                    </p>
                  </GridItem>
                  <GridItem variant="mark">
                    <p
                      onClick={() =>
                        setModalWindow({
                          isActive: true,
                          type: 'editMark',
                          params: {
                            mark: actualDisciplines[currentItem].Marks.find((mark) => mark.studentId === user.id),
                            user,
                          },
                        })
                      }
                    >
                      {actualDisciplines[currentItem].Marks.find((mark) => mark.studentId === user.id)?.grade}
                    </p>
                  </GridItem>
                  <GridItem>
                    <MoreButton>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 96 960 960"
                        width="24"
                        fill="rgba(16, 16, 16, 0.5)"
                      >
                        <path d="M480.571 934q-29.571 0-50.57-20.884-21-20.884-21-50.21 0-28.838 20.835-50.372 20.835-21.533 50.093-21.533 30.071 0 50.571 21.503 20.499 21.503 20.499 50.499 0 28.997-20.429 49.997t-49.999 21Zm0-287.001q-29.571 0-50.57-20.835-21-20.835-21-50.093 0-30.071 20.835-50.571 20.835-20.499 50.093-20.499 30.071 0 50.571 20.429 20.499 20.429 20.499 49.999 0 29.571-20.429 50.571-20.429 20.999-49.999 20.999Zm0-286q-29.571 0-50.57-21.212-21-21.213-21-51t20.835-50.62q20.835-20.833 50.093-20.833 30.071 0 50.571 20.927 20.499 20.928 20.499 50.715 0 29.787-20.429 50.905-20.429 21.118-49.999 21.118Z" />
                      </svg>
                    </MoreButton>
                  </GridItem>
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </GridContainer>
      </GridLayout>
      <ModalWindow isActive={modalWindow.isActive} closeModalWindow={closeModalWindow}>
        {modalWindow.type === 'editMark' ? (
          <MarksEditForm
            modalWindow={modalWindow}
            discipline={actualDisciplines[currentItem]}
            closeModalWindow={closeModalWindow}
          />
        ) : null}
      </ModalWindow>
    </React.Fragment>
  );
};
