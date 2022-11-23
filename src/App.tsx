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
import StudentEdit from './page/StudentEdit';
import StudentCreate from './page/StudentCreate';
const drawerWidth = 240;

function App() {
  const [open, setOpen] = React.useState(true);
  const [isAuthoraized, setIsAuthoraized] = React.useState(true);
  const handleAuthorizePlaceholder = (login: string, password: string) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        if (login === 'admin' && password === 'admin') {
          setIsAuthoraized(true);
          resolve(true);
        } else {
          reject(false);
        }
      }, 3000);
    });
  };

  return (
    <>
      <BrowserRouter>
        {isAuthoraized ? (
          <Box sx={{ display: 'flex', width: 'fil-available' }}>
            <CssBaseline />
            <Sidebar isOpen={open} authorize={setIsAuthoraized} setOpen={setOpen} />
            <Box
              style={{}}
              className="position-relative overflow-hidden"
              sx={{
                flex: '1 1 0'
              }}>
              <Box
                component="main"
                sx={{ overflow: 'auto', maxWidth: '100vw', maxHeight: '100vh' }}>
                <Routes>
                  <Route path="/" element={<Statistic />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/entrance-controll" element={<EntranceControll />} />
                  <Route path="/intersessional-controll" element={<IntersessionalControll />} />
                  <Route path="/intermediate-controll" element={<IntermediateControll />} />
                  <Route path="/current-controll" element={<CurrentControll />} />
                  <Route path="/disciplines" element={<DiscplinesList />} />
                  <Route path="/group" element={<GroupList />} />
                  <Route path="/group/create" element={<GroupCreate />} />
                  <Route path="/specialities" element={<SpecialitiesList />} />
                  <Route path="/specialities/create" element={<SpecialityCreate />} />
                  <Route path="/specialities/edit/:id" element={<SpecialityEdit />} />
                  <Route path="/students" element={<StudentsList />} />
                  <Route path="/students/create" element={<StudentCreate />} />
                  <Route path="/students/edit/:id" element={<StudentEdit />} />

                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/create" element={<CreateUser />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </Box>
              <div
                style={{
                  zIndex: -99,
                  height: '100%',
                  width: '100%',
                  top: 0,
                  left: 0,
                  backgroundColor: 'rgba(0, 212, 255)',
                  background: 'linear-gradient(to top, #2F80ED, #56CCF2)'
                }}
                className="position-absolute overflow-hidden">
                {squreBackground('45deg', '75px', '-12%', undefined, undefined)}
                {squreBackground('225deg', undefined, undefined, '-12%', '75px')}
              </div>
            </Box>
          </Box>
        ) : (
          <div
            style={{
              backgroundColor: 'rgba(0, 212, 255)',
              background: 'linear-gradient(to top, #2F80ED, #56CCF2)'
            }}>
            <Routes>
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
          width: 'auto',
          height: '600px',
          right: rightVal,
          top: topVal,
          bottom: bottomVal,
          left: leftVal,
          columnGap: '10px',
          rowGap: '10px',
          gridTemplateColumns: 'repeat(8,100px)',
          gridTemplateRows: 'repeat(6,100px)',
          transformOrigin: 'center',
          aspectRatio: '1/1',
          rotate: `${deg}`
        }}
        className="position-absolute d-grid">
        <div
          style={{
            gridColumn: '1/ span 2',
            gridRow: 'span 2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />

        <div
          style={{
            gridColumn: '1',
            gridRow: '3',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '3',
            gridRow: '2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '1',
            gridRow: '5',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '4',
            gridRow: '5',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '2 / span 2',
            gridRow: '3 / span 2',
            backgroundColor: 'rgba(0,255,0,0.2)'
          }}
        />

        <div
          style={{
            gridColumn: '1',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '4 / span 4',
            gridRow: '1 / span 4',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
      </div>
    </>
  );
};

export default App;
