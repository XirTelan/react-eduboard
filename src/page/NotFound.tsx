import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BgStyle from '../components/UI/BgStyle';
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <BgStyle position="center">
      <div className="d-flex flex-column align-items-center ">
        <div
          className="text-center"
          style={{ fontSize: '12rem', fontWeight: '700', lineHeight: '12rem' }}>
          <span>404</span>
          <div style={{ fontSize: '8rem' }}>Страница не найдена</div>
        </div>
        <Button className="fs-2" onClick={() => navigate('/')} variant="contained" color="success">
          Вернуться на главную
        </Button>
      </div>
    </BgStyle>
  );
}
