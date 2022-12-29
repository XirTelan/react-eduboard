import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import BaseControll from '../components/Form/BaseControll';
import Header from '../components/UI/Header';
import { urlControllTypes } from '../endpoints';

export default function Controll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [typeData, setTypeData] = useState<{ id: number; period: string; name: string }>();

  async function loadData() {
    try {
      const response = await axios.get(`${urlControllTypes}/${id}`);
      console.log('????', response);
      setTypeData(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response!.status == 404) {
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
          <BaseControll period={typeData.period as period} type={typeData.id} />
        </>
      )}
    </>
  );

  type period = 'none' | 'half' | 'monthly';
}
