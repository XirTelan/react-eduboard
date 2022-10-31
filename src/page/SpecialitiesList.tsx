import { Button, ListItemButton, ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Formik, useFormik } from 'formik';

export default function SpecialitiesList() {
  return (
    <>
      <Formik initialValues={{ speciality: '1' }} onSubmit={(e) => console.log(e)}>
        <form>
          <TextField fullWidth id="filled-basic" label="Dicipline" variant="filled" />
          <Button variant="contained">Contained</Button>
        </form>
      </Formik>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemButton>
        </ListItem>
      </List>
      <ul className="">
        <li></li>
      </ul>
    </>
  );
}
