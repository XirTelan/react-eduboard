import { IconButton } from '@mui/material';
import React from 'react';
import useToggle from '../../hooks/useToggle';

import { MdAddCircle } from 'react-icons/md';

export const ContextButton = (props: ContextButtonProps) => {
  const { isOpen, toggle } = useToggle();
  const { children } = props;
  return (
    <div className="position-relative">
      <IconButton
        color="success"
        onClick={toggle}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) toggle();
        }}>
        <MdAddCircle />
        {isOpen && (
          <div className="position-absolute start-100 shadow-sm p-1 rounded top-0">{children}</div>
        )}
      </IconButton>
    </div>
  );
};

type ContextButtonProps = {
  children: React.ReactNode;
};
