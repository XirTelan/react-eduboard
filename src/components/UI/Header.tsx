import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, buttonText, buttonLink, buttonIcon }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <Box className="p-3 d-flex align-items-center justify-content-between mt-2 mb-1 mx-2 rounded bg-white">
        <Typography variant="h5" color="primary.main">
          {title}
        </Typography>
        {buttonText && (
          <>
            <Button
              startIcon={buttonIcon}
              onClick={() => navigate(`${buttonLink}`)}
              sx={{ backgroundColor: 'success.light' }}
              variant="contained"
              size="large">
              {buttonText}
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

interface HeaderProps {
  title: string;
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
}
