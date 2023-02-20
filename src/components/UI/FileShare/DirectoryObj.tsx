import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { IconButton } from '@mui/material';
import { TiDelete } from 'react-icons/ti';

export const DirectoryObj = (props: DirectoryObjProps) => {
  const { id, displayName, isFolder, onClick, handleDelete } = props;
  const [isOver, setIsOver] = useState(false);
  return (
    <button
      onClick={onClick}
      className="bg-white p-4 rounded"
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}>
      <div className="d-flex align-items-center  justify-content-between  ">
        <div className="d-flex ">
          <div className="me-1">{isFolder ? <FolderIcon /> : <DescriptionIcon />}</div>
          <span>{displayName}</span>
        </div>
        <div style={{ height: '25px', width: '25px' }}>
          {isOver && (
            <IconButton
              aria-label="delete"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}>
              <TiDelete />
            </IconButton>
          )}
        </div>
      </div>
    </button>
  );
};

type DirectoryObjProps = {
  id: number;
  displayName: string;
  isFolder: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (id: number) => void;
};
