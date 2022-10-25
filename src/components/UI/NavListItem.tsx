import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavListItemProps {
    to: string,
    title: string
}

export default function NavListItem({to,title}:NavListItemProps ) {
  return (
    <li className="nav-item w-100">
      <NavLink to={to} className="nav-link  px-0 align-middle">
        <span className="m-3 d-none d-sm-inline">{title}</span>
      </NavLink>
    </li>
  )
}
