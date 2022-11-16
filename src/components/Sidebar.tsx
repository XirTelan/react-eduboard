import { Divider, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavListItem from './UI/NavListItem';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TocIcon from '@mui/icons-material/Toc';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

interface SidebarProps {
  isOpen: boolean;
  handleSidebar: () => void;
  authorize: (state: boolean) => void;
}

export default function Sidebar({ isOpen, handleSidebar, authorize }: SidebarProps) {
  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 ">
        <div className="d-flex gap-2 align-items-center   mx-auto me-md-auto text-decoration-none">
          <AccountCircleIcon />
          {isOpen && (
            <span className="ms-1 fw-bold d-flex align-content-center d-sm-inline">
              Имя Отчество
              <br /> Роль: Админ
            </span>
          )}
          <IconButton color='primary' aria-label="logout" onClick={() => authorize(false)}>
            <LogoutIcon />
          </IconButton>
        </div>

        <hr className="w-100 text-secondary" />
        <ul
          className="nav nav-pills w-100 flex-column mb-sm-auto mb-0 align-text-center align-items-center align-items-sm-start"
          id="menu">
          <NavListItem isOpen={isOpen} to="/attendance" title="Посещяемость">
            <CalendarMonthIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} to="/current-controll" title="Текущий контроль">
            <EventRepeatIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} to="/intersessional-controll" title="Межсессионный контроль">
            <TodayIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} to="/intermediate-controll" title="Промежуточная аттестация">
            <EventIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} to="/entrance-controll" title="Входной контроль">
            <EventAvailableIcon />
          </NavListItem>
          <Divider className="w-100" color="primary.main" />
          <NavListItem isOpen={isOpen} to="/group" title="Группы">
            <GroupIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} to="/students" title="Студенты">
            <GroupsIcon />
          </NavListItem>
          <Divider className="w-100" color="primary.main" />
          <NavListItem isOpen={isOpen} to="/specialities" title="Специальности">
            <ListAltIcon />
          </NavListItem>
          <NavListItem isOpen={isOpen} to="/discipline" title="Дисциплины">
            <TocIcon />
          </NavListItem>
          <hr className="w-100 text-secondary" />
        </ul>
        <IconButton onClick={handleSidebar}>
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </>
  );
}
