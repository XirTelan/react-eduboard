import { NavLink } from 'react-router-dom';

interface NavListItemProps {
  isOpen: boolean;
  isAnimated?: boolean;
  to: string;
  title: string;
  icon?: React.ReactNode;
}

export default function NavListItem({ to, title, icon, isOpen, isAnimated }: NavListItemProps) {
  return (
    <li className="nav-item w-100">
      <NavLink
        to={to}
        className={`nav-link px-0${
          isOpen ? 'ps-1 align-middle' : 'align-middle d-flex justify-content-center'
        }`}>
        {icon}
        {isOpen && !isAnimated && <span className="px-1 d-none d-sm-inline">{title}</span>}
      </NavLink>
    </li>
  );
}
