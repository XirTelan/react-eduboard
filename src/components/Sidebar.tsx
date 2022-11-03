import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavListItem from './UI/NavListItem';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TocIcon from '@mui/icons-material/Toc';
export default function Sidebar() {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white ">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 shadow">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 mx-auto me-md-auto text-decoration-none">
          <span className="fs-2 fw-bold d-none d-sm-inline">Menu</span>
        </a>
        <hr className="w-100 text-secondary" />
        <ul
          className="nav nav-pills w-100 flex-column mb-sm-auto mb-0 align-text-center align-items-center align-items-sm-start"
          id="menu">
          <Typography variant="subtitle1">Основное</Typography>
          <NavListItem to="/attendance" title="Посещяемость">
            <CalendarMonthIcon />
          </NavListItem>
          <NavListItem to="/current-controll" title="Текущий контроль">
            <EventRepeatIcon />
          </NavListItem>
          <NavListItem to="/intersessional-controll" title="Межсессионный контроль">
            <TodayIcon />
          </NavListItem>
          <NavListItem to="/intermediate-controll" title="Промежуточная аттестация">
            <EventIcon />
          </NavListItem>
          <NavListItem to="/entrance-controll" title="Входной контроль">
            <EventAvailableIcon />
          </NavListItem>
          <label>Настройки</label>
          <NavListItem to="/groups" title="Группы">
            <GroupsIcon />
          </NavListItem>
          <NavListItem to="/specialities" title="Специальности">
            <ListAltIcon />
          </NavListItem>
          <NavListItem to="/discipline" title="Дисциплины">
            <TocIcon />
          </NavListItem>
          <hr className="w-100 text-secondary" />
        </ul>
      </div>
    </div>
  );
}
