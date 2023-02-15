import React from 'react';

export const File = (props: FileProps) => {
  const handleClick = () => {
    console.log('click');
  };

  return <button>{props.title}</button>;
};

type FileProps = {
  title: string;
};
