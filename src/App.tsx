import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Button from './components/UI/Button';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './page/UserList';
import GenControll from './components/BaseControll';
import Attendance from './page/Attendance';
import EntranceControll from './page/EntranceControll';
import CreateUser from './page/CreateUser';
import Login from './page/Login';
import DiscplinesList from './page/DisciplinesList';
import SpecialitiesList from './page/SpecialitiesList';
import GroupList from './page/GroupList';
import CreateSpeciality from './page/CreateSpeciality';
import IntersessionalControll from './page/IntersessionalControll';
import IntermediateControll from './page/IntermediateControll';
import CurrentControll from './page/CurrentControll';

function App() {
  const isAuthoraized = false;
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <Sidebar />
            <div className="col p-0 bg-light ">
              <Nav />
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/entrance-controll" element={<EntranceControll />} />
                <Route path="/intersessional-controll" element={<IntersessionalControll />} />
                <Route path="/intermediate-controll" element={<IntermediateControll />} />
                <Route path="/current-controll" element={<CurrentControll />} />
                <Route path="/discipline" element={<DiscplinesList />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/specialities" element={<SpecialitiesList />} />
                <Route path="/specialities/create" element={<CreateSpeciality />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
