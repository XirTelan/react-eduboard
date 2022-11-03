import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavListItemProps {
    to: string,
    title: string,
    children?: React.ReactNode
}

export default function NavListItem({to,title,children}:NavListItemProps ) {
  return (
    <li className="nav-item w-100">
      <NavLink to={to} className="nav-link  px-0 align-middle">
        {children} <span className="me-3 d-none d-sm-inline">{title}</span>
      </NavLink>
    </li>
  )
}
