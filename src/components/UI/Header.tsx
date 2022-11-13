import { Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, buttonText, buttonLink, buttonIcon }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography alignSelf="center" variant="h4" color="primary.main">
          {title}
        </Typography>
        {buttonText && (
          <>
            <Button
              startIcon={buttonIcon}
              onClick={() => navigate(`${buttonLink}`)}
              sx={{ backgroundColor: 'success.light' }}
              className="my-3"
              variant="contained"
              size="large">
              {buttonText}
            </Button>
          </>
        )}
      </div>
      <Divider style={{ margin: '10px 0', width: '100%' }} />
    </>
  );
}

interface HeaderProps {
  title: string;
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
}
