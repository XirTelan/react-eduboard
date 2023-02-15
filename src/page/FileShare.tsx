import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import Header from '../components/UI/Header';
import { urlFileshare } from '../endpoints';
import { showAxiosErrorToast } from '../utils/notificationToast';
export const FileShare = () => {
  const [dir, setDir] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [path, setPath] = useState<string>('');

  const loadData = async (path: string) => {
    try {
      const response = await axiosPrivate.get(`${urlFileshare}/lsdir/${path}`);
      console.log(JSON.parse(response.data));
      setDir(JSON.parse(response.data));
      console.log(dir);
    } catch (error) {
      showAxiosErrorToast(error);
    }
  };
  const handleClick = (name: string) => {
    setPath((prevValue) => prevValue.concat(`${name}/`));
  };
  useEffect(() => {
    loadData(path);
  }, [path]);

  return (
    <div>
      <Header title={'FileShare'} />
      <Box className="bg-white p-3  mx-2 mb-1 rounded">{`Главная/${path}`}</Box>
      <Box className="bg-white p-3  mx-2 mb-1 rounded">
        <div>Folders</div>
        <div className="display-flex gap-1  ">
          {dir.length > 0 && (
            <div>
              {dir.map((d, indx) => (
                <button key={indx} onClick={() => handleClick(d)}>
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      </Box>
      <Box className="bg-white p-3  mx-2 rounded">
        <div>Files</div>
        <div>
          {files.length > 0 && (
            <div className="display-flex  ">
              {files.map((file, indx) => (
                <button key={indx} className="">
                  {file}
                </button>
              ))}
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};
