import { Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import NavListItem from './UI/NavListItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ViewListIcon from '@mui/icons-material/ViewList';
import LogoutIcon from '@mui/icons-material/Logout';

import './Sidebar.css';
import React, { useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { dataLinks, mainLinks } from '../data/data';
import { Roles } from '../data/enums';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();

  function getUserName(): string {
    return auth.fio;
  }

  useEffect(() => {
    promiseAnimated(isOpen).then((val) => {
      setIsAnimated(val);
    });
  }, [isOpen]);

  const promiseAnimated = (isOpen: boolean) => {
    return new Promise<boolean>((resolve) => {
      if (isOpen)
        setTimeout(() => {
          resolve(false);
        }, 200);
      else {
        resolve(false);
      }
    });
  };

  function handleSidebar() {
    setIsAnimated(true);
    toggle();
  }

  const showLinksList = (isOpen: boolean) => {
    return (
      <ul
        className="nav nav-pills w-100 flex-column gap-1 mb-sm-auto mb-0 align-text-center align-items-center align-items-sm-start"
        id="menu">
        {mainLinks.map((link, indx) => (
          <NavListItem key={indx} isOpen={isOpen} isAnimated={isAnimated} {...link} />
        ))}
        <Divider className="w-100" color="primary.main" />
        {dataLinks.map((link, indx) => (
          <NavListItem key={indx} isOpen={isOpen} isAnimated={isAnimated} {...link} />
        ))}
        <Divider className="w-100" color="primary.main" />
      </ul>
    );
  };

  const dashboarButton = () => {
    return (
      <>
        <Link to="/">
          <AccountCircleIcon />
        </Link>
        {isOpen && !isAnimated && (
          <span className="ms-1 fw-bold d-flex align-content-center ">
            <>{getUserName()}</>
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <div
        id="mobile-sidebar"
        className="z-10 py-2 bg-white shadow position-fixed w-100 align-items-center">
        <div className="d-flex w-100 px-2 justify-content-between">
          <button onClick={() => setOpenBurger((prevVal) => !prevVal)}>
            <div
              className={`burger  d-flex flex-column gap-1 p-1  justify-content-between ${
                openBurger ? 'active' : ''
              }`}
              style={{ width: '2rem' }}>
              <div style={{ height: '0.25rem' }}></div>
              <div style={{ height: '0.25rem' }}></div>
              <div style={{ height: '0.25rem' }}></div>
            </div>
          </button>
          <div>{dashboarButton()}</div>
        </div>
        {openBurger && (
          <div
            className="position-absolute  vw-100 bg-white"
            onClick={() => setOpenBurger((prevVal) => !prevVal)}
            style={{ top: '100%' }}>
            <>{showLinksList(true)}</>
          </div>
        )}
      </div>

      <div
        id="sidebar"
        className={` flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 ${
          isOpen ? '' : 'active'
        } `}>
        <div
          className={`d-flex gap-2 align-items-center flex-column  mx-auto me-md-auto text-decoration-none ${
            isOpen && ''
          }`}>
          <>
            {dashboarButton()}
            <div className={`d-flex align-items-center ${!isOpen && 'flex-column '}`}>
              {auth.roles.includes(Roles.ADMIN) && (
                <>
                  <Link to="/users">
                    <ViewListIcon />
                  </Link>
                </>
              )}
              <IconButton color="primary" aria-label="logout" onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </div>
          </>
        </div>

        <hr className="w-100 text-secondary" />
        <>{showLinksList(isOpen)}</>
        <IconButton onClick={handleSidebar}>
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </>
  );
}
