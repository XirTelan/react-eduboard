import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DragDropFile from '../components/DragDropFile';
import Header from '../components/UI/Header';
import { Loading } from 'notiflix';
import { DirectoryInfo } from '../data/types';
import { urlFileshare } from '../endpoints';
import { showAxiosErrorToast, showSuccessToast } from '../utils/notificationToast';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useAxios from '../hooks/useAxios';
import { DirectoryObj } from '../components/UI/FileShare/DirectoryObj';
import { Breadcrumb } from '../components/UI/FileShare/Breadcrumb';

export const FileShare = () => {
  const [dir, setDir] = useState<DirectoryInfo[]>([]);
  const [addField, setField] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<DirectoryInfo>();
  const [breadcrumb, setBreadcrumb] = useState<DirectoryInfo[]>([]);
  const axiosPrivate = useAxios();

  useEffect(() => {
    console.log('Trigger');
    console.log('Selected folder', selectedFolder);
    if (selectedFolder == null || selectedFolder == undefined) {
      loadRootDirectory();
      return;
    }
    loadDirectoryTree(selectedFolder.id);
    if (breadcrumb.includes(selectedFolder)) {
      const indx = breadcrumb.indexOf(selectedFolder);
      setBreadcrumb((prevVal) => prevVal.filter((dir) => prevVal.indexOf(dir) <= indx));
    } else {
      setBreadcrumb((prevVal) => [...prevVal, selectedFolder]);
    }
  }, [selectedFolder]);

  const loadRootDirectory = async () => {
    loadDirectoryTree(0);
    setBreadcrumb([]);
  };

  const loadDirectoryTree = async (id: number) => {
    try {
      const response =
        id === 0
          ? await axiosPrivate.get(`${urlFileshare}`)
          : await axiosPrivate.get(`${urlFileshare}/${id}`);
      console.log(response.data);
      setDir(response.data);
    } catch (error) {
      showAxiosErrorToast(error);
    }
  };

  const downloadFile = async (dir: DirectoryInfo) => {
    try {
      const response = await axiosPrivate.get(`${urlFileshare}/download/${dir.id}`, {
        responseType: 'blob'
      });
      console.log('dir', dir);
      const link = document.createElement('a');
      const url = URL.createObjectURL(response.data);
      console.log(url);
      link.href = url;
      link.setAttribute('download', dir.systemName);
      link.click();
    } catch (error) {
      console.log(error);
      showAxiosErrorToast(error);
    }
  };

  const handleClick = (dir: DirectoryInfo) => {
    if (dir.isFolder) setSelectedFolder(dir);
    else downloadFile(dir);
  };

  const backToParentFolder = (folder: DirectoryInfo) => {
    console.log('Back to parent', folder);
    console.log('Selected folder', selectedFolder);
    setSelectedFolder(breadcrumb[breadcrumb.length - 2]);
  };

  const uploadFile = async (file: File) => {
    Loading.standard();
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (selectedFolder !== undefined)
        formData.append('parentFolderId', selectedFolder.id.toString());
      const response = await axiosPrivate.post(`${urlFileshare}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      showSuccessToast(response.data);
    } catch (error) {
      showAxiosErrorToast(error);
    } finally {
      Loading.remove();
      loadDirectoryTree(selectedFolder === undefined ? 0 : selectedFolder.id);
    }
  };
  const deleteDirectoryObjInfo = async (id: number) => {
    try {
      await axiosPrivate.delete(`${urlFileshare}/${id}`);
      loadRootDirectory();
    } catch (error) {
      showAxiosErrorToast(error);
    }
  };

  const createFolder = async (name: string) => {
    Loading.standard();
    setField(false);
    try {
      const formData = new FormData();
      formData.append('displayName', name);
      formData.append('isFolder', 'true');
      if (selectedFolder !== undefined)
        formData.append('parentFolderId', selectedFolder.id.toString());
      const response = await axiosPrivate.post(`${urlFileshare}`, formData);

      showSuccessToast(response.data);
    } catch (error) {
      showAxiosErrorToast(error);
    } finally {
      Loading.remove();
    }
    loadDirectoryTree(selectedFolder ? selectedFolder.id : 0);
    Loading.remove();
  };

  const showDirectoryTree = () => (
    <>
      {dir.map((dir, indx) => (
        <DirectoryObj
          key={indx}
          id={dir.id}
          displayName={dir.displayName}
          isFolder={dir.isFolder}
          onClick={() => handleClick(dir)}
          handleDelete={deleteDirectoryObjInfo}
        />
      ))}
    </>
  );
  return (
    <div>
      <Header title={'Файлы'} />
      <Box className="bg-white p-3  mx-2 mb-1 rounded">
        <>
          <div className="d-flex gap-1 mb-3">
            <Button
              variant="contained"
              color="success"
              component="label"
              onClick={() => setField(true)}>
              Создать папку
            </Button>
            <DragDropFile title="Загрузить файл" handleFiles={uploadFile} />
          </div>
          <div className="d-flex bg-light user-select-none p-2">
            <div className="d-flex align-items-center">
              <button
                onClick={() => {
                  setSelectedFolder(undefined);
                  setBreadcrumb([]);
                }}>
                Главная
              </button>
              <div className="mx-1">/</div>
            </div>
            {breadcrumb.length > 0 &&
              breadcrumb.map((dir, indx) => (
                <Breadcrumb key={indx} directoryObj={dir} clickHandler={() => handleClick(dir)} />
              ))}
          </div>
          <div className="d-flex gap-1 flex-column bg-light mt-1 p-4">
            {selectedFolder !== undefined && selectedFolder.parentFolderId !== null && (
              <button className="mb-2" onClick={() => backToParentFolder(selectedFolder)}>
                <div className="d-flex">
                  <ArrowBackIosNewIcon />
                  <div>Назад</div>
                </div>
              </button>
            )}
            {addField && (
              <div className="d-flex align-items-center ">
                <FolderIcon />
                <input
                  autoFocus
                  onBlur={(e) => createFolder(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      console.log('key', e.currentTarget.value);
                      createFolder(e.currentTarget.value);
                    }
                  }}
                  type="text"
                />
              </div>
            )}
            {dir.length > 0 ? (
              showDirectoryTree()
            ) : (
              <div className="text-center text-muted my-3">Данная папка пуста</div>
            )}
          </div>
        </>
      </Box>
    </div>
  );
};
