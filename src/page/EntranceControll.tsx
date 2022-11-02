import { Box, Typography } from '@mui/material';
import GenControll from '../components/BaseControll';
import Filter from '../components/Filter';

export default function EntranceControll() {
  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Typography variant="h3" color="primary.main">
        Входной контроль
      </Typography>
      <Filter />
      <GenControll />
    </Box>
  );
}
