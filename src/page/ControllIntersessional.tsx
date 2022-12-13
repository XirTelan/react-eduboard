import { Box, Typography } from '@mui/material';
import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function ControllIntersessional() {
  return (
    <>
      <Header title=" Межсессионный контроль" />
      <BaseControll period="half" type={2} />
    </>
  );
}
