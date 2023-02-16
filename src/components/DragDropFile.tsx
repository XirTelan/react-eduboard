import { Button } from '@mui/material';
import { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function DragDropFile(props: dragDropFileProps) {
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.handleFiles(e.target.files[0]);
    }
  };

  const handleDrop = async function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.handleFiles(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      id="form-file-upload"
      className="position-relative d-block"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}>
      <Button variant="contained" color="success" component="label">
        <input hidden accept=".xlsx,.xls" type="file" onChange={handleChange} />
        <FileUploadIcon /> {props.title}
      </Button>

      {dragActive && (
        <div
          id="drag-file-element"
          style={{
            width: 'calc(100% + 30px)',
            height: 'calc(100% + 30px)',
            top: -15,
            left: -15,
            zIndex: 1000
          }}
          className="position-absolute d-flex justify-content-center align-items-center text-white "
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}></div>
      )}
    </div>
  );
}

type dragDropFileProps = {
  title: string;
  handleFiles: (e: File) => Promise<any>;
};
