import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from '../UI/Pagination';
import { displayErrorToast, displaySuccessToast, Toast } from '../../utils/swalToast';
import useAxios from '../../hooks/useAxios';

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const axiosPrivate = useAxios();
  const debounceFn = useCallback(_debounce(fetchData, 1000), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [entities, setEntities] = useState<T[]>();
  const [query, setQuery] = useState('');
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query == null || query.trim() === '')
      fetchData({ url: props.urlEntity, params: { page, recordsPerPage } });
    else debounceFn({ url: `${props.urlEntity}/filter`, params: { page, recordsPerPage, query } });
  }, [page, recordsPerPage, query]);

  async function fetchData({ url, params }: fetchDataProps) {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(url, {
        params: params
      });
      const responseHeader = response.headers['totalamountofrecords'];
      const totalAmountOfRecords = parseInt(responseHeader ? responseHeader : '', 10);
      setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
      setEntities(response.data);
    } catch (error) {
      displayErrorToast(error);
    }
    setIsLoading(false);
  }

  async function deleteEntity(id: number) {
    try {
      await axiosPrivate.delete(`${props.urlEntity}/${id}`);
      fetchData({ url: props.urlEntity, params: { page, recordsPerPage } });
      displaySuccessToast();
    } catch (error) {
      displayErrorToast(error);
    }
  }
  return (
    <>
      <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
        {props.filterIsEnabled && (
          <>
            <div className="d-flex position-relative mx-2 p-1">
              <TextField
                fullWidth
                label="Поиск..."
                variant="standard"
                value={query}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                }}
              />
              {query == null || query.trim() === '' ? (
                ''
              ) : (
                <>
                  <IconButton
                    color="error"
                    className="position-absolute end-0"
                    onClick={() => setQuery('')}>
                    <ClearIcon />
                  </IconButton>
                </>
              )}
            </div>
          </>
        )}

        <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
          {isLoading ? (
            <CircularProgress />
          ) : props.isCustom ? (
            <>{entities ? props.children(entities!, deleteEntity) : 'Loading'}</>
          ) : (
            <>
              <ul className="p-0">
                {entities ? props.children(entities!, deleteEntity) : 'Loading'}
              </ul>
            </>
          )}
        </Box>
        <div className="d-flex gap-3 my-1 justify-content-center">
          <Pagination
            currentPage={page}
            totalAmountOfPages={totalAmountOfPages}
            onChange={(newPage) => setPage(newPage)}
          />
          <Select
            variant="standard"
            size="small"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(e.target.value as number);
              setPage(1);
            }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </div>
      </Box>
    </>
  );
}

interface fetchDataProps {
  url: string;
  params: any;
}

interface indexEntityProps<T> {
  urlEntity: string;
  isCustom?: boolean;
  filterIsEnabled?: boolean;
  children(entities: T[], deleteEntity: (id: number) => void): React.ReactElement;
}

IndexEntity.defaultProps = {
  isCustom: false,
  filterIsEnabled: true
};
