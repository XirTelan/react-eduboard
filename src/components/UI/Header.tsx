import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header({
  title,
  buttonText,
  buttonLink,
  buttonIcon,
  children
}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <Box className="box-main d-flex align-items-center mobile-column  justify-content-between mt-2 mb-1 ">
        <Typography variant="h5" color="primary.main">
          {title}
        </Typography>
        <div className="d-flex gap-3 mobile-column">
          {children}
          {buttonText && (
            <Button
              startIcon={buttonIcon}
              onClick={() => navigate(`${buttonLink}`)}
              color="success"
              variant="contained">
              {buttonText}
            </Button>
          )}
        </div>
      </Box>
    </>
  );
}

interface HeaderProps {
  title: string;
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  children?: React.ReactElement;
}
