import axios, { AxiosError, AxiosResponse } from 'axios';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';

import CollapseListItem from '../components/UI/CollapseListItem';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Header from '../components/UI/Header';
import { disciplines, specialities } from '../data/data';
import { disciplineDTO, specialityDTO } from '../types';
import { useEffect, useState } from 'react';
import { urlSpecialities } from '../endpoints';
import Pagination from '../components/UI/Pagination';

export default function SpecialitiesList() {
  const [specialities, setSpecialities] = useState<specialityDTO[]>();
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(urlSpecialities, {
        params: { page, recordsPerPage }
      })
      .then((response: AxiosResponse<specialityDTO[]>) => {
        const responseHeader = response.headers['totalamountofrecords'];
        const totalAmountOfRecords = parseInt(responseHeader ? responseHeader : '', 10);
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setSpecialities(response.data);
      });
  }, [page, recordsPerPage]);

  return (
    <>
      <Header
        title="Специальности"
        buttonLink="create"
        buttonText="Создать специальность"
        buttonIcon={<PlaylistAddIcon />}
      />
      <Box sx={{ overflow: 'hidden', overflowY: 'auto' }} className="bg-white mx-2 p-1 rounded">
        <ul className="p-0">
          {specialities &&
            specialities.map((elem) => {
              return (
                <CollapseListItem
                  key={elem.id}
                  customWidth="50%"
                  displayName={elem.name}
                  items={disciplines}
                />
              );
            })}
        </ul>
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
