import { Abiturients } from '../../../pages/Abiturients';
import { AcademicPerformance } from '../../../pages/AcademicPerformance';
import { EducationalPerformance } from '../../../pages/EducationalPerformance';
import { EducationalRoute } from '../../../pages/EducationalRoute';
import { Groups } from '../../../pages/Groups';
import { MainPage } from '../../../pages/MainPage';
import { Profile } from '../../../pages/Profile';
import { Schedule } from '../../../pages/Schedule';

export const navigation = {
  student: [
    {
      path: '/',
      title: 'Главная',
      Component: MainPage,
    },
    {
      path: '/profile',
      title: 'Профиль',
      Component: Profile,
    },
    {
      path: '/educational-route',
      title: 'Индивидуальный образовательный маршрут',
      Component: EducationalRoute,
    },
    {
      path: '/schedule',
      title: 'Расписание',
      Component: Schedule,
    },
    {
      path: '/educational-performance',
      title: 'Текущая успеваемость',
      Component: EducationalPerformance,
    },
  ],
  professor: [
    {
      path: '/',
      title: 'Успеваемость и посещаемость',
      Component: AcademicPerformance,
    },
    {
      path: '/profile',
      title: 'Профиль',
      Component: Profile,
    },
    {
      path: '/schedule',
      title: 'Расписание',
      Component: Schedule,
    },
    {
      path: '/groups',
      title: 'Группы',
      Component: Groups,
    },
  ],
  admin: [
    {
      path: '/',
      title: 'Группы',
      Component: Groups,
    },
    {
      path: '/abiturients',
      title: 'Абитуриенты',
      Component: Abiturients,
    },
  ],
};