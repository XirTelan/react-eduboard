import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface NavListItemProps {
  isOpen: boolean;
  to: string;
  title: string;
  children?: React.ReactNode;
}

export default function NavListItem({ to, title, children, isOpen }: NavListItemProps) {
  return (
    <li className="nav-item w-100">
      <NavLink
        to={to}
        className={
          isOpen
            ? 'nav-link  ps-1 px-0 align-middle'
            : 'nav-link  px-0 align-middle d-flex justify-content-center'
        }>
        {children}
        {isOpen && <span className="px-1 d-none d-sm-inline">{title}</span>}
      </NavLink>
    </li>
  );
}
