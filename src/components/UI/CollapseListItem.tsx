import { IconButton, Collapse, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAlert } from '../../utils/utils';

export default function CollapseListItem(props: CollapleListItemProps) {
  const {
    id,
    displayName,
    onDelete,
    isOpen = false,
    customWidth,
    items,
    children,
    additionalInfo
  } = props;
  const [isChecked, setIsChecked] = useState(isOpen);
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
          variant="caption">
          {displayName}
        </Typography>
        {additionalInfo && (
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: '1rem'
            }}
            width={customWidth === undefined ? '30%' : customWidth}
            maxWidth="100%"
            textAlign="center"
            borderRadius={1}
            padding={1}
            fontSize="24px"
            variant="caption">
            {additionalInfo}
          </Typography>
        )}
        <div className="align-self-center">
          <IconButton color="primary" onClick={() => setIsChecked(!isChecked)}>
            {isChecked ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton color="success" onClick={() => navigate(`edit/${id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => customAlert(`Удалить ${displayName}?`, 'Удалить', () => onDelete(id))}>
            <DeleteForeverSharpIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={isChecked}>
        <div className="my-2">{children}</div>

        {items && items.length > 0 ? (
          <div className="d-flex ">
            <ul className="list-group d-flex m-3">
              {items.map((elem, indx) => (
                <li className="list-group-item d-inline" key={elem.id}>
                  {indx + 1}-{elem.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Список пуст</p>
        )}
      </Collapse>
    </li>
  );
}

interface CollapseListInnerListModel {
  id: number;
  name: string;
}

interface CollapleListItemProps {
  id: number;
  displayName: string;
  additionalInfo?: string;
  onDelete(id: number): void;
  isOpen?: boolean;
  items?: CollapseListInnerListModel[];
  children?: React.ReactNode;
  customWidth?: string;
}
