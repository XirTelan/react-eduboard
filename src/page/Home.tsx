import { Box, IconButton } from '@mui/material';
import React from 'react';
import { FaCog } from 'react-icons/fa';
import BgStyle from '../components/UI/BgStyle';
import FlatButton from '../components/UI/FlatButton';
import { dataLinks, mainLinks } from '../data/data';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { auth } = useAuth();
  const flatButtonWidth = 20; //rem
  const date = new Date();
  return (
    <>
      <Box sx={{ display: 'flex', width: 'fil-available' }}>
        <Box
          style={{}}
          className="position-relative overflow-hidden"
          sx={{
            flex: '1 1 0'
          }}>
          <BgStyle>
            <>
              <div className="d-flex w-100  overflow-auto  flex-column  ">
                <div className="position-relative bg-white d-flex align-items-center justify-content-end pe-3 py-1 text-end w-100 mb-1 fs-4 ">
                  <div>
                    <span className="fs-3">{auth.fio}</span>
                    <IconButton color="inherit">
                      <FaCog />
                    </IconButton>
                  </div>
                  <div className="popup position-absolute bg-white p-3 rounded mt-1">
                    <div> Список пользователей</div>
                    <div> Список пользователей</div>
                  </div>
                </div>

                <div className="d-flex h-100 align-items-center justify-content-center">
                  <div className="d-flex   h-fit align-items-center ">
                    <div className="d-flex gap-1  flex-column me-1 ">
                      <div className="d-flex gap-1">
                        <FlatButton {...mainLinks[0]} isWide={true} size={flatButtonWidth} />
                        <FlatButton {...mainLinks[1]} isWide={true} size={flatButtonWidth} />
                      </div>
                      <div className="d-flex gap-1">
                        <FlatButton {...mainLinks[2]} size={flatButtonWidth} />
                        <FlatButton {...mainLinks[3]} size={flatButtonWidth} />
                        <FlatButton {...mainLinks[4]} size={flatButtonWidth} />
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-between gap-1 flex-wrap "
                      style={{ maxWidth: `${flatButtonWidth * 2 + 0.25}rem` }}>
                      {dataLinks.map((link, indx) => (
                        <FlatButton key={indx} {...link} size={flatButtonWidth} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </BgStyle>
        </Box>
      </Box>
    </>
  );
}
