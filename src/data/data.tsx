import { LinkInfo } from './types';
import React from 'react';
import { FaUserGraduate, FaUsers } from 'react-icons/fa';
import { TfiLayoutListThumbAlt, TfiList, TfiFiles } from 'react-icons/tfi';
import {
  BsCalendar3,
  BsCalendarRange,
  BsCalendar2Week,
  BsCalendarCheck,
  BsCalendar3Event
} from 'react-icons/bs';

export const months = [
  { id: 9, label: 'Сентябрь' },
  { id: 10, label: 'Октябрь' },
  { id: 11, label: 'Ноябрь' },
  { id: 12, label: 'Декабрь' },
  { id: 1, label: 'Январь' },
  { id: 2, label: 'Февраль' },
  { id: 3, label: 'Март' },
  { id: 4, label: 'Апрель' },
  { id: 5, label: 'Май' }
];

export const mainLinks: LinkInfo[] = [
  {
    to: '/attendance',
    title: 'Посещяемость',
    icon: <BsCalendar3 />
  },
  {
    to: '/controll/1',
    title: 'Текущий контроль',
    icon: <BsCalendar3Event />
  },
  {
    to: '/controll/2',
    title: 'Межсессионный контроль',
    icon: <BsCalendarRange />
  },
  {
    to: '/controll/3',
    title: 'Промежуточная аттестация',
    icon: <BsCalendar2Week />
  },
  {
    to: '/controll/4',
    title: 'Входной контроль',
    icon: <BsCalendarCheck />
  },
  {
    to: '/fileshare/',
    title: 'Файлы',
    icon: <TfiFiles />
  }
];
export const dataLinks: LinkInfo[] = [
  {
    to: '/groups',
    title: 'Группы',
    icon: <FaUsers />
  },
  {
    to: '/students',
    title: 'Студенты',
    icon: <FaUserGraduate />
  },
  {
    to: '/specialities',
    title: 'Специальности',
    icon: <TfiLayoutListThumbAlt />
  },
  {
    to: '/disciplines',
    title: 'Дисциплины',
    icon: <TfiList />
  }
];
