import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/Form/StudentForm';
import Header from '../components/UI/Header';
import { urlStudents } from '../endpoints';
import { studentCreationDTO } from '../types';

export default function StudentCreate() {
  const navigate = useNavigate();
  
  async function create(student: studentCreationDTO) {
    try {
      await axios.post(urlStudents, student);
      navigate('/specialities');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Header title="Добавить студента" />
      <StudentForm
        model={{ firstName: '', secondName: '', middleName: '' }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
}
