import { Box, IconButton, MenuItem, Select, TextField } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from '../UI/Pagination';

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const debounceFn = useCallback(_debounce(fetchData, 1000), []);

  const [entities, setEntities] = useState<T[]>();
  const [query, setQuery] = useState('');
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('trigger useEffect');
    console.log(query);
    if (query == null || query.trim() === '')
      fetchData({ url: props.urlEntity, params: { page, recordsPerPage } });
    else debounceFn({ url: `${props.urlEntity}/filter`, params: { page, recordsPerPage, query } });
  }, [page, recordsPerPage, query]);

  async function fetchData({ url, params }: fetchDataProps) {
    try {
      const response = await axios.get(url, {
        params: params
      });
      const responseHeader = response.headers['totalamountofrecords'];
      const totalAmountOfRecords = parseInt(responseHeader ? responseHeader : '', 10);
      setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
      setEntities(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.urlEntity}/${id}`);
      fetchData({ url: props.urlEntity, params: { page, recordsPerPage } });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
        <div className="d-flex position-relative mx-2 p-1">
          <TextField
            fullWidth
            label="Поиск..."
            variant="standard"
            value={query}
            onChange={(e) => {
              console.log('trigger setQuery');
              setQuery(e.target.value);
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
        <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
          {props.isCustom ? (
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
            onChange={(e) => setRecordsPerPage(e.target.value as number)}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
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
  children(entities: T[], deleteEntity: (id: number) => void): React.ReactElement;
}

IndexEntity.defaultProps = {
  isCustom: false
};
