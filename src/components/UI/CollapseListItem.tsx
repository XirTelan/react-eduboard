import { IconButton, Collapse, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState } from 'react';

export default function CollapseListItem(props: CollapleListItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <h3> {props.name} </h3>
        <div>
          <IconButton color="secondary" onClick={() => setIsChecked(!isChecked)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary">
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
