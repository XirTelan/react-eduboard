import {  Divider, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
interface NavProps {
  position?: string;
  open?: boolean;
  children?: React.ReactNode;
}
export default function Nav({ children }: NavProps) {
  return (
    <Toolbar
      sx={{ backgroundColor: '1fe0' , right: 0 }}
      className="position-absolute navbar navbar-expand-lg  navbar-light text-white">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-1 justify-content-end " id="navbarNavAltMarkup">
        <div className="navbar-nav rounded bg-black">
          <Link className="nav-item nav-link  text-white" to="users">
            Список пользователей
          </Link>
          <Link className="nav-item nav-link text-white" to="login">
            Вход
          </Link>
          <Divider orientation="vertical" flexItem />
          <div className="fs-5 ps-3">Welcome, User</div>
        </div>
      </div>
    </Toolbar>
  );
}
