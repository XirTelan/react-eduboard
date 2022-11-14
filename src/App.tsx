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
import StudentsList from './page/StudentsList';
import Statistic from './page/Statistic';
const drawerWidth = 240;

function App() {
  const [open, setOpen] = React.useState(true);
  const [isAuthoraized, setIsAuthoraized] = React.useState(true);
  const handleAuthorizePlaceholder = (login: string, password: string) => {
    if (login === 'admin' && password === 'admin') setIsAuthoraized(true);
  };
  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <BrowserRouter>
        {isAuthoraized ? (
          <Box sx={{ display: 'flex', width: 'fil-available' }}>
            <CssBaseline />
            <Sidebar isOpen={open} handleSidebar={handleSidebar} />
            <Box
              style={{
                backgroundColor: 'rgba(0, 212, 255)',
                background: 'linear-gradient(to top, #2F80ED, #56CCF2)'
              }}
              className="overflow-hidden"
              sx={{
                flex: '1 1 0',
                backgroundColor: 'grey.100'
              }}>
              {squreBackground('45deg', '0', '50px')}
              {squreBackground('225deg', undefined, undefined, 0, 0)}
              <Nav />
              <Box component="main" sx={{ overflow: 'auto', maxWidth: '100vw', maxHeight: '89vh' }}>
                <Routes>
                  <Route path="/" element={<Statistic />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/entrance-controll" element={<EntranceControll />} />
                  <Route path="/intersessional-controll" element={<IntersessionalControll />} />
                  <Route path="/intermediate-controll" element={<IntermediateControll />} />
                  <Route path="/current-controll" element={<CurrentControll />} />
                  <Route path="/discipline" element={<DiscplinesList />} />
                  <Route path="/group" element={<GroupList />} />
                  <Route path="/group/create" element={<GroupCreate />} />
                  <Route path="/specialities" element={<SpecialitiesList />} />
                  <Route path="/specialities/create" element={<SpecialityCreate />} />
                  <Route path="/specialities/edit/:id" element={<SpecialityEdit />} />
                  <Route path="/students" element={<StudentsList />} />

                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/create" element={<CreateUser />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </Box>
            </Box>
          </Box>
        ) : (
          <div
            style={{
              backgroundColor: 'rgba(0, 212, 255)',
              background: 'linear-gradient(to top, #2F80ED, #56CCF2)'
            }}>
            <Routes>
              {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
              <Route path="*" element={<Login onChange={handleAuthorizePlaceholder} />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export const squreBackground = (
  deg: string,
  topVal?: string | number,
  rightVal?: string | number,
  leftVal?: string | number,
  bottomVal?: string | number
) => {
  return (
    <>
      <div
        style={{
          width: '600px',
          height: '500px',
          right: rightVal,
          top: topVal,
          bottom: bottomVal,
          left: leftVal,
          // backgroundColor: 'white',
          columnGap: '10px',
          rowGap: '10px',
          gridTemplateColumns: 'repeat(10,100px)',
          gridTemplateRows: 'repeat(6,100px)',
          transformOrigin: 'center',
          aspectRatio: '1/1',
          rotate: `${deg}`
        }}
        className="overflow-hidden position-absolute d-grid">
        <div
          style={{
            gridColumn: '3/ span 2',
            gridRow: 'span 2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />

        <div
          style={{
            gridColumn: '3',
            gridRow: '3',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '5',
            gridRow: '2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '3',
            gridRow: '5',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '6',
            gridRow: '5',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '4 / span 2',
            gridRow: '3 / span 2',
            backgroundColor: 'rgba(0,255,0,0.2)'
          }}
        />

        <div
          style={{
            gridColumn: '2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '6 / span 4',
            gridRow: '1 / span 4',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
      </div>
    </>
  );
};

export default App;
