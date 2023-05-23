import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../SimpleComponents/Button';
import { createStudent } from '../../store/data/actionsCreators';

const Form = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;

  & input {
    background: #ffffff;
    border: 1px solid rgba(16, 16, 16, 0.1);
    padding: 15px;
    gap: 10px;
    margin-bottom: 10px;
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
      min-width: 40px;
      cursor: pointer;
      margin: 0 0 0 16px;
    }
  }
`;

export const AddStudent = ({ setStudents, closeModalWindow }) => {
  const [login, setLogin] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [patronymic, setPatronymic] = React.useState('');
  const [age, setAge] = React.useState('');
  const [city, setCity] = React.useState('');
  const [formOfEducation, setFormOfEducation] = React.useState('');
  const [directing, setDirecting] = React.useState('01.03.02');
  const [isMale, setIsMale] = React.useState(true);
  const [exam1, setExam1] = React.useState({ title: 'Математика', mark: null });
  const [exam2, setExam2] = React.useState({ title: 'Русский язык', mark: null });
  const [exam3, setExam3] = React.useState({
    title: directing === '01.03.02' ? 'Информатика и ИКТ' : 'Обществознание',
    mark: null,
  });

  React.useEffect(() => {
    setExam3({
      title: directing === '01.03.02' ? 'Информатика и ИКТ' : 'Обществознание',
      mark: null,
    });
  }, [directing]);

  const handleSave = (e) => {
    e.preventDefault();
    if (login.trim() !== '' && name.trim() !== '' && surname.trim() !== '') {
      createStudent({
        login,
        name,
        surname,
        patronymic,
        isMale,
        age,
        city,
        formOfEducation,
        directing,
        setStudents,
        closeModalWindow,
        exams: [exam1, exam2, exam3],
      });
    }
  };

  return (
    <React.Fragment>
      <p>Добавление студента</p>
      <Form>
        <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input type="text" placeholder="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Отчество" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
        <input type="text" placeholder="Возраст" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="Город" value={city} onChange={(e) => setCity(e.target.value)} />
        <input
          type="text"
          placeholder="Форма обучения"
          value={formOfEducation}
          onChange={(e) => setFormOfEducation(e.target.value)}
        />
        <div>
          <p>Направление:</p>
          <p
            className="select"
            onClick={() => setDirecting('01.03.02')}
            style={directing === '01.03.02' ? { color: '#43962e', borderColor: '#43962e' } : {}}
          >
            01.03.02
          </p>
          <p
            className="select"
            onClick={() => setDirecting('44.03.01')}
            style={directing === '44.03.01' ? { color: '#43962e', borderColor: '#43962e' } : {}}
          >
            44.03.01
          </p>
        </div>
        <p style={{ marginBottom: 10 }}>Баллы ЕГЭ:</p>
        <input
          type="text"
          placeholder="Математика"
          value={exam1.mark}
          onChange={(e) => setExam1((prev) => ({ ...prev, mark: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Русский язык"
          value={exam2.mark}
          onChange={(e) => setExam2((prev) => ({ ...prev, mark: e.target.value }))}
        />
        <input
          type="text"
          placeholder={directing === '01.03.02' ? 'Информатика и ИКТ' : 'Обществознание'}
          value={exam3.mark}
          onChange={(e) => setExam3((prev) => ({ ...prev, mark: e.target.value }))}
        />
        <div>
          <p>Пол:</p>
          <p
            className="select"
            onClick={() => setIsMale(true)}
            style={isMale ? { color: '#43962e', borderColor: '#43962e' } : {}}
          >
            Мужской
          </p>
          <p
            className="select"
            onClick={() => setIsMale(false)}
            style={isMale ? {} : { color: '#43962e', borderColor: '#43962e' }}
          >
            Женский
          </p>
        </div>
        <Button onClick={handleSave}>Сохранить</Button>
      </Form>
    </React.Fragment>
  );
};
