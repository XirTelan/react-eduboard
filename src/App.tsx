import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Button from './components/UI/Button';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './page/UserList';

import Attendance from './page/Attendance';
import EntranceControll from './page/EntranceControll';
import CreateUser from './page/CreateUser';
import Login from './page/Login';
import DiscplinesList from './page/DisciplinesList';
import SpecialitiesList from './page/SpecialitiesList';
import GroupList from './page/GroupList';
import IntersessionalControll from './page/IntersessionalControll';
import IntermediateControll from './page/IntermediateControll';
import CurrentControll from './page/CurrentControll';
import { Box, CssBaseline } from '@mui/material';
import SpecialityCreate from './page/SpecialityCreate';
import GroupCreate from './page/GroupCreate';
import SpecialityEdit from './page/SpecialityEdit';
const drawerWidth = 240;

function App() {
  const [open, setOpen] = React.useState(true);

  const handleSidebar = () => {
    setOpen(!open);
  };

  const isAuthoraized = false;
  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: 'flex', width: 'fil-available' }}>
          <CssBaseline />
          <Sidebar isOpen={open} handleSidebar={handleSidebar} />
          <Box sx={{ flex: '1 1 0', backgroundColor: 'grey.100' }}>
            <Nav />
            <Box component="main">
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/entrance-controll" element={<EntranceControll />} />
                <Route path="/intersessional-controll" element={<IntersessionalControll />} />
                <Route path="/intermediate-controll" element={<IntermediateControll />} />
                <Route path="/current-controll" element={<CurrentControll />} />
                <Route path="/discipline" element={<DiscplinesList />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/group/create" element={<GroupCreate />} />
                <Route path="/specialities" element={<SpecialitiesList />} />
                <Route path="/specialities/create" element={<SpecialityCreate />} />
                <Route path="/specialities/edit/:id" element={<SpecialityEdit />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </Box>
          </Box>
        </Box>
        {/* <div className="container-fluid">
          <div className="row flex-nowrap">
            <Sidebar />
            <div className="col p-0 bg-light ">
              <Nav />
              
            </div>
          </div>
        </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;
