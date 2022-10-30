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
              <div className="container mt-2">
                <Routes>
                  <Route path="/" element={<UserList />} />
                  <Route path="/entrance-controll" element={<EntranceControll />} />
                  <Route path="/discipline" element={<DiscplinesList />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/create" element={<CreateUser />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Attendance />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
