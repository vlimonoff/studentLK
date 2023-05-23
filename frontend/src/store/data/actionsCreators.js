import axios from 'axios';
import { SET_DISCIPLINES } from './actionsTypes';

export const setDisciplines = (payload) => ({ type: SET_DISCIPLINES, payload });

export function loadDisciplines(professorId) {
  return (dispatch) => {
    try {
      axios
        .post('http://localhost:4000/api/professor/disciplines', { professorId })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setDisciplines(response.data));
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
}

export function editMark({ markId, grade, professorId, closeModalWindow }) {
  return (dispatch) => {
    axios
      .put('http://localhost:4000/api/mark', { markId, grade })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadDisciplines(professorId));
          closeModalWindow();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createMark({ studentId, grade, professorId, disciplineId, closeModalWindow }) {
  return (dispatch) => {
    axios
      .post('http://localhost:4000/api/mark', { studentId, grade, professorId, disciplineId })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadDisciplines(professorId));
          closeModalWindow();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loadStudents({ setStudents }) {
  try {
    axios
      .get('http://localhost:4000/api/admin/users/students')
      .then((response) => {
        if (response.status === 200) {
          setStudents(response.data);
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
}

export function createStudent({
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
  exams,
}) {
  try {
    axios
      .post('http://localhost:4000/api/admin/users/students', {
        login,
        name,
        surname,
        patronymic,
        isMale,
        age,
        city,
        formOfEducation,
        directing,
      })
      .then((response) => {
        if (response.status === 200) {
          Promise.allSettled(
            exams.map((exam) =>
              axios.post('http://localhost:4000/api/admin/users/exam', { ...exam, studentId: response.data.id }),
            ),
          ).then((responses) => {
            if (responses.every((response) => response.status === 200)) {
              loadStudents({ setStudents });
              closeModalWindow();
            }
          });
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
}

export function loadGroups({ setGroups }) {
  try {
    axios
      .get('http://localhost:4000/api/admin/users/groups')
      .then((response) => {
        if (response.status === 200) {
          setGroups(response.data);
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
}

export function editGroup({ studentId, groupId, setStudents, closeModalWindow }) {
    try {
    axios
      .put('http://localhost:4000/api/admin/users/group', { studentId, groupId })
      .then((response) => {
        if (response.status === 200) {
          loadStudents({ setStudents });
          closeModalWindow();
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
}