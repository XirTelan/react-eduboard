import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './auth/UserList';

import Attendance from './page/Attendance';
import ControllEntrance from './page/ControllEntrance';
import Login from './auth/Login';
import DiscplinesList from './page/DisciplinesList';
import SpecialitiesList from './page/SpecialitiesList';
import GroupList from './page/GroupList';
import ControllIntersessional from './page/ControllIntersessional';
import ControllIntermediate from './page/ControllIntermediate';
import ControllCurrent from './page/ControllCurrent';
import { Box, CssBaseline } from '@mui/material';
import SpecialityCreate from './page/SpecialityCreate';
import GroupCreate from './page/GroupCreate';
import SpecialityEdit from './page/SpecialityEdit';
import StudentsList from './page/StudentsList';
import Statistic from './page/Statistic';
import StudentEdit from './page/StudentEdit';
import StudentCreate from './page/StudentCreate';
import GroupEdit from './page/GroupEdit';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';
import Register from './auth/Register';
import { getClaims } from './auth/handleJWT';
import Authorized from './auth/Authorized';
import configureInterceptor from './httpinterceptor';
import Layout from './components/Layout';
const drawerWidth = 240;

configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Statistic />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/entrance-controll" element={<ControllEntrance />} />
            <Route path="/intersessional-controll" element={<ControllIntersessional />} />
            <Route path="/intermediate-controll" element={<ControllIntermediate />} />
            <Route path="/current-controll" element={<ControllCurrent />} />
            <Route path="/disciplines" element={<DiscplinesList />} />
            <Route path="/groups" element={<GroupList />} />
            <Route path="/groups/create" element={<GroupCreate />} />
            <Route path="/groups/edit/:id" element={<GroupEdit />} />
            <Route path="/specialities" element={<SpecialitiesList />} />
            <Route path="/specialities/create" element={<SpecialityCreate />} />
            <Route path="/specialities/edit/:id" element={<SpecialityEdit />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/students/create" element={<StudentCreate />} />
            <Route path="/students/edit/:id" element={<StudentEdit />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<Register />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
