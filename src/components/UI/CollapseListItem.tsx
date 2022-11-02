import { IconButton, Collapse, Divider } from '@mui/material';
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
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <h3> {props.name} </h3>
        <div>
          <IconButton color="success" onClick={() => setIsChecked(!isChecked)}>
            {isChecked ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton color="primary" onClick={() => navigate(`specialities/${1}`)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteForeverSharpIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={isChecked}>
        <Divider />
        <h5>Дисциплины:</h5>
        <ul className="list-group">
          {props.specialities.map((elem, indx) => (
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
  specialities: string[];
}
