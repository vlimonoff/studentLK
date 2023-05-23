import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

import './styles/index.css';
import './styles/reset.css';

import store from './store';

import { Main } from './Layouts/Main';
import { Error } from './pages/Error';
import { Login } from './pages/Login';
import { navigation } from './components/Header/assets/consts';

export const Routings = () => {
  const { role } = useSelector((state) => state.user);

  const [routes, setRoutes] = React.useState(navigation[role] || []);

  React.useEffect(() => {
    setRoutes(navigation[role] || []);
  }, [role]);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {routes.map((page, index) => {
          const Component = page.Component;
          return <Route path={page.path} element={<Component />} key={index + page.path} />;
        })}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routings />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
