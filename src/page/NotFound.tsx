import { Box } from '@mui/material';
import React from 'react';
import BgStyle from '../components/UI/BgStyle';
export default function NotFound() {
  return (
    <div className="vh-100 vw-100 d-flex overflow-hidden align-items-center position-relative justify-content-center">
      <div className="d-flex flex-column align-items-center ">
        <span style={{ fontSize: '12rem', fontWeight: '700', color: '' }}>404</span>
        <h2>Страница не найдена</h2>
      </div>
      <BgStyle />
    </div>
  );
}
