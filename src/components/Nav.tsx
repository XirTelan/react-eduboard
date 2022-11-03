import { AppBar, Divider, Toolbar } from '@mui/material';
import { color } from '@mui/system';
import { Link } from 'react-router-dom';
interface NavProps {
  position?: string;
  open?: boolean;
  children?: React.ReactNode;
}
export default function Nav({ children }: NavProps) {
  return (
    <Toolbar
      sx={{ backgroundColor: 'primary.main' }}
      className="navbar navbar-expand-lg mb-3 navbar-light text-white">
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
      <div className="collapse navbar-collapse p-1 justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link text-white" to="users">
            Список пользователей
          </Link>
          <Link className="nav-item nav-link text-white" to="login">
            Вход
          </Link>
        </div>
        <Divider
          orientation="vertical"
          flexItem
        />
        <div className="fs-5 ps-3">Welcome, User</div>
      </div>
    </Toolbar>
  );
}
