import * as React from 'react';
import styled from 'styled-components';
import { loadStudents } from '../../store/data/actionsCreators';
import { ModalWindow } from '../SimpleComponents/ModalWindow';
import { AddStudent } from './AddStudent';
import { Button } from '../SimpleComponents/Button';
import { EditGroup } from './EditGroup';

const GridLayout = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  height: 100%;
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
  grid-template-columns: 0.4fr 0.6fr 0.3fr 0.4fr 0.4fr 0.4fr 0.6fr 0.4fr 0.1fr;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  height: 62px;
  white-space: pre-wrap;
  border-bottom: 1px solid rgba(16, 16, 16, 0.1);
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  & svg {
    cursor: pointer;
  }
`;

const MoreButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Grid = () => {
  const [modalWindow, setModalWindow] = React.useState({ isActive: false, type: null, params: {} });
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    loadStudents({ setStudents });
  }, []);

  const closeModalWindow = () => setModalWindow({ isActive: false, type: null, params: {} });

  return (
    <GridLayout>
      <AddButton onClick={() => setModalWindow({ isActive: true, type: 'addStudent', params: {} })}>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
          <path
            fill="rgba(16, 16, 16, 0.4)"
            d="M470 750h22V588h162v-22H492V402h-22v164H306v22h164v162Zm10.44 174q-72.908 0-135.732-27.391-62.825-27.392-110.341-74.848-47.515-47.457-74.941-110.276Q132 648.667 132 575.674q0-71.993 27.391-135.392 27.392-63.399 74.848-110.414 47.457-47.016 110.276-74.442Q407.333 228 480.326 228q71.993 0 135.392 27.391 63.399 27.392 110.414 74.348 47.016 46.957 74.442 110.435Q828 503.652 828 575.56q0 72.908-27.391 135.732-27.392 62.825-74.348 110.156-46.957 47.332-110.435 74.942Q552.348 924 480.44 924Zm.06-22Q616 902 711 807t95-231.5Q806 440 711.188 345 616.375 250 480 250q-136 0-231 94.812Q154 439.625 154 576q0 136 95 231t231.5 95Zm-.5-326Z"
          />
        </svg>
        <Button width={300}>Сформировать группы</Button>
      </AddButton>
      <GridContainer>
        {students.length === 0 ? (
          <React.Fragment>Нет данных для отображения</React.Fragment>
        ) : (
          <React.Fragment>
            <GridItem>Логин</GridItem>
            <GridItem>ФИО</GridItem>
            <GridItem>Возраст</GridItem>
            <GridItem>Город</GridItem>
            <GridItem>Направление</GridItem>
            <GridItem>Форма обучения</GridItem>
            <GridItem>Баллы ЕГЭ</GridItem>
            <GridItem>Группа</GridItem>
            <GridItem></GridItem>
            {students.map((student) => (
              <React.Fragment key={student.id}>
                <GridItem>{student.login}</GridItem>
                {/* <GridItem>
                  {student.surname ? `${student.surname}\n` : ''}
                  {student.name ? `${student.name} ` : ''}
                  {student.patronymic ? student.patronymic : ''}
                </GridItem> */}
                <GridItem>{`Студент ${student.id}-${student.login}`}</GridItem>
                <GridItem>{student.age}</GridItem>
                <GridItem>{student.city}</GridItem>
                <GridItem>{student.directing}</GridItem>
                <GridItem>{student.formOfEducation}</GridItem>
                <GridItem>{student.Uses.map((exam) => `${exam.title}: ${exam.mark}\n`)}</GridItem>
                <GridItem>{student.Group?.groupName}</GridItem>
                <GridItem>
                  <MoreButton
                    onClick={() => setModalWindow({ isActive: true, type: 'editGroup', params: { student } })}
                  >
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
      <ModalWindow isActive={modalWindow.isActive} closeModalWindow={closeModalWindow}>
        {modalWindow.type === 'addStudent' ? (
          <AddStudent setStudents={setStudents} closeModalWindow={closeModalWindow} />
        ) : null}
        {modalWindow.type === 'editGroup' ? (
          <EditGroup setStudents={setStudents} closeModalWindow={closeModalWindow} params={modalWindow.params} />
        ) : null}
      </ModalWindow>
    </GridLayout>
  );
};
