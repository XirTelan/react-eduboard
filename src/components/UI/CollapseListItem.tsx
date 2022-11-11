import { IconButton, Collapse, Divider, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { disciplineDTO, groupDTO, specialityDTO, StudentDTO } from '../../types';

export default function CollapseListItem({
  displayName,
  customWidth,
  items,
  children
}: CollapleListItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <li className="list-group-item shadow-sm rounded m-1">
      <div className="d-flex justify-content-between ">
        <Typography
          sx={{
            backgroundColor: 'primary.main',
            color: 'common.white',
            fontSize: '1rem'
          }}
          width={customWidth === undefined ? '30%' : customWidth}
          maxWidth="100%"
          textAlign="center"
          borderRadius={1}
          padding={1}
          fontSize="24px"
          alignSelf="center"
          variant="caption"
          
          >
          {displayName}
        </Typography>
        <div className="align-self-center">
          <IconButton color="primary" onClick={() => setIsChecked(!isChecked)}>
            {isChecked ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton color="success" onClick={() => navigate(`edit/${1}`)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteForeverSharpIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={isChecked}>
        <div className="my-2">{children}</div>

        <ul className="list-group m-3">
          {items.map((elem) => (
            <li className="list-group-item" key={elem.id}>
              {elem.name}
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
}

interface CollapleListItemProps {
  displayName: string;
  items: StudentDTO[] | disciplineDTO[];
  children?: React.ReactNode;
  customWidth?: string;
}
