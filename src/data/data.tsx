import { linkInfo } from '../types';
import React from 'react';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TocIcon from '@mui/icons-material/Toc';
import { FaRegCalendarAlt } from 'react-icons/fa';

import GroupIcon from '@mui/icons-material/Group';

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

export const mainLinks: linkInfo[] = [
  {
    to: '/attendance',
    title: 'Посещяемость',
    icon: <FaRegCalendarAlt />
  },
  {
    to: '/controll/1',
    title: 'Текущий контроль',
    icon: <EventRepeatIcon />
  },
  {
    to: '/controll/2',
    title: 'Межсессионный контроль',
    icon: <TodayIcon />
  },
  {
    to: '/controll/3',
    title: 'Промежуточная аттестация',
    icon: <EventIcon />
  },
  {
    to: '/controll/4',
    title: 'Входной контроль',
    icon: <EventAvailableIcon />
  }
];
export const dataLinks: linkInfo[] = [
  {
    to: '/groups',
    title: 'Группы',
    icon: <GroupIcon />
  },
  {
    to: '/students',
    title: 'Студенты',
    icon: <GroupsIcon />
  },
  {
    to: '/specialities',
    title: 'Специальности',
    icon: <ListAltIcon />
  },
  {
    to: '/disciplines',
    title: 'Дисциплины',
    icon: <TocIcon />
  }
];
