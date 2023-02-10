import { Box, IconButton } from '@mui/material';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BgStyle from '../components/UI/BgStyle';
import FlatButton from '../components/UI/FlatButton';
import { dataLinks, mainLinks } from '../data/data';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useToggle from '../hooks/useToggle';

export default function Home() {
  const { auth } = useAuth();
  const flatButtonWidth = 20; //rem
  const logout = useLogout();
  const { isOpen, toggle } = useToggle();
  const navigate = useNavigate();
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
                  <div className="d-flex align-items-center">
                    <span className="fs-3">{auth.fio}</span>
                    <IconButton color="inherit" onClick={toggle}>
                      <FaCog />
                    </IconButton>
                  </div>
                  {isOpen && (
                    <div className="popup d-flex flex-column position-absolute bg-white p-3 fs-6 rounded  ">
                      {auth.roles.includes('Admin') && (
                        <button
                          className="flat-button z-20 p-2 rounded"
                          onClick={() => navigate('/users')}>
                          Список пользователей
                        </button>
                      )}
                      <button className="flat-button z-20 p-2 rounded" onClick={logout}>
                        Выход
                      </button>
                    </div>
                  )}
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-flex mobile-column h-fit align-items-center gap-1 ">
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex mobile-column gap-1">
                        <FlatButton {...mainLinks[0]} isWide={true} size={flatButtonWidth} />
                        <FlatButton {...mainLinks[1]} isWide={true} size={flatButtonWidth} />
                      </div>
                      <div className="d-flex mobile-column gap-1">
                        <FlatButton {...mainLinks[2]} size={flatButtonWidth} />
                        <FlatButton {...mainLinks[3]} size={flatButtonWidth} />
                        <FlatButton {...mainLinks[4]} size={flatButtonWidth} />
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-center gap-1 flex-wrap "
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
