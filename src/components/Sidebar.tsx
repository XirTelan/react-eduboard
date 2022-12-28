import { Divider, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NavListItem from './UI/NavListItem';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import TodayIcon from '@mui/icons-material/Today';
import ViewListIcon from '@mui/icons-material/ViewList';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TocIcon from '@mui/icons-material/Toc';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import './Sidebar.css';
import React, { useContext, useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';

interface SidebarProps {
  isOpen: boolean;
  setOpen: (setState: React.SetStateAction<boolean>) => void;
}

export default function Sidebar({ isOpen, setOpen }: SidebarProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();
  const userRole = getUserRole();

  function getUserName(): string {
    return '';
  }
  function getUserRole(): string {
    return '';
  }
  async function signOut() {
    await logout();
    navigate('/login');
  }
  useEffect(() => {
    promiseAnimated(isOpen).then((val) => {
      setIsAnimated(val);
    });
  }, [isOpen]);

  const promiseAnimated = (isOpen: boolean) => {
    return new Promise<boolean>((resolve) => {
      if (isOpen)
        setTimeout(() => {
          resolve(false);
        }, 200);
      else {
        resolve(false);
      }
    });
  };

  function handleSidebar() {
    setIsAnimated(true);
    setOpen(!isOpen);
  }
  return (
    <>
      <div
        id="sidebar"
        className={`d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 ${
          isOpen ? '' : 'active'
        } `}>
        <div
          className={`d-flex gap-2 align-items-center flex-column  mx-auto me-md-auto text-decoration-none ${
            isOpen && ''
          }`}>
          <>
            <AccountCircleIcon />
            {isOpen && !isAnimated && (
              <span className="ms-1 fw-bold d-flex align-content-center ">
                <>{getUserName()}</>
              </span>
            )}
            <div className={`d-flex align-items-center ${!isOpen && 'flex-column '}`}>
              {userRole === 'admin' && (
                <>
                  <Link to="/users">
                    <ViewListIcon />
                  </Link>
                </>
              )}
              <IconButton color="primary" aria-label="logout" onClick={() => signOut()}>
                <LogoutIcon />
              </IconButton>
            </div>
          </>
        </div>

        <hr className="w-100 text-secondary" />
        <ul
          className="nav nav-pills w-100 flex-column gap-1 mb-sm-auto mb-0 align-text-center align-items-center align-items-sm-start"
          id="menu">
          <NavListItem
            isOpen={isOpen}
            isAnimated={isAnimated}
            to="/attendance"
            title="Посещяемость">
            <CalendarMonthIcon />
          </NavListItem>
          <NavListItem
            isOpen={isOpen}
            isAnimated={isAnimated}
            to="/current-controll"
            title="Текущий контроль">
            <EventRepeatIcon />
          </NavListItem>
          <NavListItem
            isOpen={isOpen}
            isAnimated={isAnimated}
            to="/intersessional-controll"
            title="Межсессионный контроль">
            <TodayIcon />
          </NavListItem>
          <NavListItem
            isOpen={isOpen}
            isAnimated={isAnimated}
            to="/intermediate-controll"
            title="Промежуточная аттестация">
            <EventIcon />
          </NavListItem>
          <NavListItem
            isOpen={isOpen}
            isAnimated={isAnimated}
            to="/entrance-controll"
            title="Входной контроль">
            <EventAvailableIcon />
          </NavListItem>
          <Divider className="w-100" color="primary.main" />
          <NavListItem isOpen={isOpen} isAnimated={isAnimated} to="/groups" title="Группы">
            <GroupIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} isAnimated={isAnimated} to="/students" title="Студенты">
            <GroupsIcon />
          </NavListItem>
          <Divider className="w-100" color="primary.main" />
          <NavListItem
            isOpen={isOpen}
            isAnimated={isAnimated}
            to="/specialities"
            title="Специальности">
            <ListAltIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} isAnimated={isAnimated} to="/disciplines" title="Дисциплины">
            <TocIcon />
          </NavListItem>
          <Divider className="w-100" color="primary.main" />
        </ul>
        <IconButton onClick={handleSidebar}>
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </>
  );
}
