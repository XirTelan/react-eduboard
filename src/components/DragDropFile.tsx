import { Button } from '@mui/material';
import { useState } from 'react';
import { read, utils, writeFileXLSX } from 'xlsx';
import { excelImport } from '../utils/handleExcel';
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
    console.log('handleChangeTrigger');
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = async function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log('drop');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleFile = async function (file: File) {
    try {
      const result = await props.handleFiles(file);
      console.log('Resolve', result);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div
      id="form-file-upload"
      className="position-relative d-block"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}>
      <Button variant="contained" color="success" component="label">
        <input hidden accept=".xlsx,.xls" multiple type="file" onChange={handleChange} />
        <FileUploadIcon /> Импорт
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
  handleFiles: (e: File) => Promise<any>;
};
