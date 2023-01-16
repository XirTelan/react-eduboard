import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FlatButton(props: flatButtonProps) {
  const { title, to, icon, wide } = props;
  const navigate = useNavigate();

  const style = wide ? { height: '180px', flexBasis: '50%' } : { width: '180px', height: '180px' };
  return (
    <button className="btn bg-white  rounded" onClick={() => navigate(to)} style={style}>
      <div className="d-flex flex-column  h-100 align-items-center justify-content-center">
        <div className="d-flex p-4 fs-1 ">{icon}</div>
        <div className="text-center fw-bold text-decoration-none">{title.toUpperCase()}</div>
      </div>
    </button>
  );
}
type flatButtonProps = {
  title: string;
  to: string;
  icon: React.ReactElement;
  wide?: boolean;
};

FlatButton.defaultProps = {
  wide: false
};
