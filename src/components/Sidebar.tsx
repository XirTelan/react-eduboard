import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavListItem from './UI/NavListItem';

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
          <Typography variant='subtitle1'>Основное</Typography>
          <NavListItem to="/attendance" title="Посещяемость" />
          <NavListItem to="/current-controll" title="Текущий контроль" />
          <NavListItem to="/intersessional-controll" title="Межсессионный контроль" />
          <NavListItem to="/intermediate-controll" title="Промежуточная аттестация" />
          <NavListItem to="/entrance-controll" title="Входной контроль" />
          <label>Настройки</label>
          <NavListItem to="/groups" title="Группы" />
          <NavListItem to="/specialities" title="Специальности" />
          <NavListItem to="/discipline" title="Дисциплины" />
          <hr className="w-100 text-secondary" />
        </ul>
      </div>
    </div>
  );
}
