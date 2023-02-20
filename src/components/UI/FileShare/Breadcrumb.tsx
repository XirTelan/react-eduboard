import React from 'react';
import { DirectoryInfo } from '../../../data/types';

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { directoryObj, clickHandler } = props;
  return (
    <div className="d-flex align-items-center">
      <button onClick={clickHandler}>{directoryObj.displayName}</button>
      <div className="mx-1">/</div>
    </div>
  );
};

type BreadcrumbProps = {
  directoryObj: DirectoryInfo;
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
