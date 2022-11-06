import { IconButton, Collapse, Divider, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CollapseListItem(props: CollapleListItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  console.log(isChecked);
  return (
    <li className="list-group-item shadow-sm rounded m-1">
      <div className="d-flex justify-content-between ">
        <Typography
          sx={{
            backgroundColor: 'primary.main',
            color: 'common.white'
          }}
          width="30%"
          maxWidth="50%"
          textAlign="center"
          borderRadius={1}
          padding={1}
          fontSize="24px"
          alignSelf="center"
          variant="caption">
          {props.name}
        </Typography>
        <div className="align-self-center">
          <IconButton color="primary" onClick={() => setIsChecked(!isChecked)}>
            {isChecked ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton color="success" onClick={() => navigate(`specialities/${1}`)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteForeverSharpIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={isChecked}>
        <div className="my-2">{props.children}</div>

        <ul className="list-group m-3">
          {props.items.map((elem, indx) => (
            <li className="list-group-item" key={indx}>
              {elem}
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
}

interface CollapleListItemProps {
  name: string;
  items: string[];
  children?: React.ReactNode;
}
