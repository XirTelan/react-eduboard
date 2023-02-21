import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FlatButton(props: flatButtonProps) {
  const { title, to, icon, isWide, size } = props;
  const navigate = useNavigate();

  const style = isWide
    ? { height: `${size}rem`, flexBasis: '50%' }
    : { width: `${size}rem`, height: `${size}rem`, flexShrink: '1' };

  return (
    <button
      className=" flat-button   rounded position-relative"
      onClick={() => navigate(to)}
      style={style}>
      <div
        className="d-flex flex-column  position-absolute  align-items-center justify-content-center"
        style={{ inset: 0 }}>
        <div className="d-flex p-4 " style={{ fontSize: `${size / 6}rem` }}>
          {icon}
        </div>
        <div
          className="text-center w-100 px-1 fw-bold text-decoration-none"
          style={{ fontSize: `${size / 16}rem` }}>
          {title.toUpperCase()}
        </div>
      </div>
    </button>
  );
}
type flatButtonProps = {
  title: string;
  to: string;
  size: number;
  icon: React.ReactElement;
  isWide?: boolean;
};

FlatButton.defaultProps = {
  isWide: false,
  size: 18
};
