import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../SimpleComponents/Button';
import { booleanMarks, marks } from './assets/consts';
import { useDispatch, useSelector } from 'react-redux';
import { createMark, editMark } from '../../store/data/actionsCreators';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 0 0 0;
  & label {
    font-size: 14px;
    line-height: 16px;
    color: rgba(16, 16, 16, 0.5);
    margin-bottom: 6px;
  }
  & input {
    width: 264px;
    height: 49px;
    background: #ffffff;
    border: 1px solid rgba(16, 16, 16, 0.1);
    padding: 15px;
    gap: 10px;
    font-size: 16px;
    line-height: 19px;
    color: rgba(16, 16, 16, 0.5);
    margin-bottom: 20px;
  }
`;

const MarksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  & p {
    border: 1px solid rgba(67, 150, 46, 0.2);
    border-radius: 50vh;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #43962e;
    padding: 0 10px;
    min-width: 40px;
    margin: 0 8px;
    cursor: pointer;
  }
`;

export const MarksEditForm = ({ modalWindow, discipline, closeModalWindow }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const [currentMark, setCurrentMark] = React.useState(modalWindow.params.mark?.grade || '');
  const [marksList, setMarksList] = React.useState(
    discipline.examType === 'Экзамен' || discipline.examType === 'Дифф. Зачёт' ? marks : booleanMarks,
  );

  React.useEffect(() => {
    setMarksList(discipline.examType === 'Экзамен' || discipline.examType === 'Дифф. Зачёт' ? marks : booleanMarks);
  }, [discipline.examType]);

  const handleSave = () => {
    if (modalWindow.params.mark) {
      dispatch(editMark({ markId: modalWindow.params.mark.id, grade: currentMark, professorId: id, closeModalWindow }));
    } else {
      dispatch(
        createMark({
          studentId: modalWindow.params.user.id,
          grade: currentMark,
          professorId: id,
          disciplineId: discipline.id,
          closeModalWindow,
        }),
      );
    }
  };

  return (
    <React.Fragment>
      <p>Выставление оценки</p>
      <Form>
        <label>{`Студент: ${modalWindow.params.user.surname} ${modalWindow.params.user.name}`}</label>
        <label>Выберите оценку:</label>
        <MarksContainer>
          {marksList.map((mark) => (
            <p
              key={mark}
              onClick={() => setCurrentMark(mark)}
              style={mark === currentMark ? { color: '#43962e', borderColor: '#43962e' } : {}}
            >
              {mark}
            </p>
          ))}
        </MarksContainer>
      </Form>
      <Button onClick={handleSave}>Сохранить</Button>
    </React.Fragment>
  );
};
