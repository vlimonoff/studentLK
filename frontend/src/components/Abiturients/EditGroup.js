import * as React from 'react';
import { editGroup, loadGroups } from '../../store/data/actionsCreators';
import styled from 'styled-components';
import { Button } from '../SimpleComponents/Button';

const Form = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  & label {
    font-size: 14px;
    line-height: 16px;
    color: rgba(16, 16, 16, 0.5);
    margin-bottom: 6px;
  }
  & div {
    display: flex;
    align-items: center;
    margin: 16px 0 24px 0;
    & .select {
      border: 1px solid rgba(67, 150, 46, 0.2);
      border-radius: 50vh;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #43962e;
      padding: 0 16px;
      min-width: 8px;
      cursor: pointer;
      margin: 0 0 0 16px;
    }
  }
`;

export const EditGroup = ({ setStudents, closeModalWindow, params }) => {
  const [groups, setGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState('');

  React.useEffect(() => {
    loadGroups({ setGroups });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    editGroup({
      studentId: params.student.id,
      groupId: groups.find((group) => group.groupName === currentGroup).id,
      setStudents,
      closeModalWindow,
    });
  };

  return (
    <React.Fragment>
      <p>Изменение группы</p>
      <Form>
        <label>{`Студент: ${params.student.surname} ${params.student.name}`}</label>
        <div>
          <p
            style={
              '' === currentGroup ? { color: '#43962e', borderColor: '#43962e', marginLeft: 0 } : { marginLeft: 0 }
            }
            className="select"
            onClick={() => setCurrentGroup('')}
          ></p>
          {groups
            .filter((group) => group.kurs === 1)
            .map((group, idx) => (
              <p
                className="select"
                style={group.groupName === currentGroup ? { color: '#43962e', borderColor: '#43962e' } : {}}
                key={idx}
                onClick={() => setCurrentGroup(group.groupName)}
              >
                {group.groupName}
              </p>
            ))}
        </div>
        <Button onClick={handleSave}>Добавить в группу</Button>
      </Form>
    </React.Fragment>
  );
};
