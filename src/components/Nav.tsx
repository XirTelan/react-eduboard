import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
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
          <Link className="nav-item nav-link" to="users">
            Список пользователей
          </Link>
          <Link className="nav-item nav-link" to="login">
            Вход
          </Link>
        </div>
        <div className="fs-5 ps-3 border-start border-dark">Welcome, User</div>
      </div>
    </nav>
  );
}
