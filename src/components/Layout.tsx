import { Box, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BgStyle from './UI/BgStyle';
export default function Layout() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const isOpen = localStorage.getItem('sidebarIsOpen');
    setOpen(isOpen === 'true' ? true : false);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarIsOpen', open.toString());
  }, [open]);
  return (
    <>
      <Box sx={{ display: 'flex', width: 'fil-available' }}>
        {/* <CssBaseline /> */}
        <Sidebar isOpen={open} setOpen={setOpen} />
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
