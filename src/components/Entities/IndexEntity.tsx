import { Box, MenuItem, Select } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../UI/Header';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Pagination from '../UI/Pagination';

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>();
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page, recordsPerPage]);
  function fetchData() {
    axios
      .get(props.urlEntity, {
        params: { page, recordsPerPage }
      })
      .then((response: AxiosResponse<T[]>) => {
        const responseHeader = response.headers['totalamountofrecords'];
        const totalAmountOfRecords = parseInt(responseHeader ? responseHeader : '', 10);
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setEntities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.urlEntity}/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
        
        <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
          <ul className="p-0">{entities ? props.children(entities!, deleteEntity) : 'Loading'}</ul>
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

interface indexEntityProps<T> {
  urlEntity: string;
  children(entities: T[], deleteEntity: (id: number) => void): React.ReactElement;
}
