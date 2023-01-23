import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserList from './auth/UserList';

import Attendance from './page/Attendance';
import Login from './auth/Login';
import DiscplinesList from './page/DisciplinesList';
import SpecialitiesList from './page/SpecialitiesList';
import GroupList from './page/GroupList';
import SpecialityCreate from './page/SpecialityCreate';
import GroupCreate from './page/GroupCreate';
import SpecialityEdit from './page/SpecialityEdit';
import StudentsList from './page/StudentsList';
import StudentEdit from './page/StudentEdit';
import StudentCreate from './page/StudentCreate';
import GroupEdit from './page/GroupEdit';
import Register from './auth/Register';
import Authorized from './auth/Authorized';
import Layout from './components/Layout';
import PersistLogin from './auth/PersistLogin';
import Controll from './page/Controll';
import NotFound from './page/NotFound';
import Home from './page/Home';
import { Roles } from './data/enums';
import UserEdit from './auth/UserEdit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Authorized requiredRoles={[Roles.USER]} />}>
            <Route path="/" element={<Home />} />
            <Route element={<Layout />}>
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/controll/:id" element={<Controll />} />
              <Route path="/disciplines" element={<DiscplinesList />} />
              <Route path="/groups" element={<GroupList />} />
              <Route path="/specialities" element={<SpecialitiesList />} />
              <Route path="/students" element={<StudentsList />} />
              <Route element={<Authorized requiredRoles={[Roles.ADMIN]} />}>
                <Route path="/groups/create" element={<GroupCreate />} />
                <Route path="/groups/edit/:id" element={<GroupEdit />} />
                <Route path="/specialities/create" element={<SpecialityCreate />} />
                <Route path="/specialities/edit/:id" element={<SpecialityEdit />} />
                <Route path="/students/create" element={<StudentCreate />} />
                <Route path="/students/edit/:id" element={<StudentEdit />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
