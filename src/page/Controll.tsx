import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import BaseControll from '../components/Form/BaseControll';
import Header from '../components/UI/Header';
import { urlControllTypes } from '../endpoints';
import useAxios from '../hooks/useAxios';

export default function Controll() {
  const { id } = useParams();
  const axiosPrivate = useAxios();
  const navigate = useNavigate();
  const [typeData, setTypeData] = useState<{ id: number; period: string; name: string }>();

  const [selectedYear, setSelectedYear] = useState<string>('0000');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);

  function updateParams(groupId: number, year: string, month: number) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedGroupId(groupId);
  }

  async function loadData() {
    setTypeData(undefined);
    updateParams(0, '', 0);
    try {
      const response = await axiosPrivate.get(`${urlControllTypes}/${id}`);
      setTypeData(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status == 404) {
        navigate('/404');
      }
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <>
      {typeData && (
        <>
          <Header title={typeData.name} />
          <Filter isYearSelectable period={typeData.period as period} onSubmit={updateParams} />
          <BaseControll
            typeId={typeData.id}
            groupId={selectedGroupId}
            month={selectedMonth}
            year={selectedYear}
          />
        </>
      )}
    </>
  );

  type period = 'none' | 'half' | 'monthly';
}
