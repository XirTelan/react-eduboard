import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useToggle from '../hooks/useToggle';
import Sidebar from './Sidebar';
import BgStyle from './UI/BgStyle';
export default function Layout() {
  const { isOpen, toggle } = useToggle();

  useEffect(() => {
    const storageValue = localStorage.getItem('sidebarIsOpen');
    if (storageValue === 'true' && !isOpen) toggle();
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarIsOpen', isOpen.toString());
  }, [isOpen]);
  return (
    <>
      <Box sx={{ display: 'flex', width: 'fil-available' }}>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Box
          style={{}}
          className="position-relative overflow-hidden"
          sx={{
            flex: '1 1 0'
          }}>
          <BgStyle>
            <div className="d-flex flex-grow-1 overflow-auto flex-column">
              <Outlet />
            </div>
          </BgStyle>
        </Box>
      </Box>
    </>
  );
}
