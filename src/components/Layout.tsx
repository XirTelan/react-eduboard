import { Box, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BgStyle from './UI/BgStyle';
export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Box sx={{ display: 'flex', width: 'fil-available' }}>
        <CssBaseline />
        <Sidebar isOpen={open} setOpen={setOpen} />
        <Box
          style={{}}
          className="position-relative overflow-hidden"
          sx={{
            flex: '1 1 0'
          }}>
          <main>
            <Box component="main" sx={{ overflow: 'auto', maxWidth: '100vw', maxHeight: '100vh' }}>
              <Outlet />
            </Box>
            <BgStyle />
          </main>
        </Box>
      </Box>
    </>
  );
}
