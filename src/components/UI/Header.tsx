import { Button, Typography } from '@mui/material';

export default function Header({ title, buttonText, buttonLink }: HeaderProps) {
  return (
    <div className="d-flex justify-content-between">
      <Typography alignSelf="center" variant="h4" color="primary.main">
        {title}
      </Typography>
      {buttonText && (
        <Button
          href={buttonLink}
          sx={{ backgroundColor: 'success.light' }}
          className="my-3"
          variant="contained"
          size="large">
          {buttonText}
        </Button>
      )}
    </div>
  );
}

interface HeaderProps {
  title: string;
  buttonText?: string;
  buttonLink?: string;
}
