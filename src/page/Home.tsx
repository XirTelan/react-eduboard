import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import BgStyle from '../components/UI/BgStyle';
import FlatButton from '../components/UI/FlatButton';
import { dataLinks, mainLinks } from '../data/data';

export default function Home() {
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
            <div className="d-flex  overflow-auto align-items-center justify-content-center ">
              <div className="d-flex   h-fit align-items-center ">
                <div className="d-flex gap-1  flex-column me-3 ">
                  <div className="d-flex gap-1">
                    <FlatButton {...mainLinks[0]} wide={true} />
                    <FlatButton {...mainLinks[1]} wide={true} />
                  </div>
                  <div className="d-flex gap-1">
                    <FlatButton {...mainLinks[2]} />
                    <FlatButton {...mainLinks[3]} />
                    <FlatButton {...mainLinks[4]} />
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between gap-1 flex-wrap "
                  style={{ maxWidth: '364px' }}>
                  {dataLinks.map((link, indx) => (
                    <FlatButton key={indx} {...link} />
                  ))}
                </div>
              </div>
            </div>
          </BgStyle>
        </Box>
      </Box>
    </>
  );
}
