import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import {
  CalHeader,
  LogoImg,
  SetImg,
  ButtonWrapper,
  CalendarWrapper,
  Header,
  DateContainer,
  Weekend,
  Dow,
} from '../component_css/calendar_style';
import {
  MdChevronLeft,
  MdChevronRight,
  MdDehaze,
  MdCheck,
  MdDoneAll,
  MdEdit
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  readSchedule,
  setIsFilter,
  openEditPopup
} from './redux/modules/schedule';
import Day from './day';
import EditSchedule from './editschedule';

  const Calendar = () => {

  const { thisMonth, isOpenEditPopup, isFilter } = useSelector(
    (state) => state.schedule
  );
  const [current, setCurrent] = useState(moment());

  const dispatch = useDispatch();
  useEffect(() => {
    const startDay = current.clone().startOf('month').format('YYYYMMDD');
    const endDay = current.clone().endOf('month').format('YYYYMMDD');
    dispatch(readSchedule({ startDay, endDay }));
  }, [current, dispatch, isOpenEditPopup, isFilter]);

  const movePrevMonth = () => {
    setCurrent(current.clone().subtract(1, 'month'));
  };

  const moveNextMonth = () => {
    setCurrent(current.clone().add(1, 'month'));
  };
  const navigate = useNavigate();
  const goToAddSchedule = () => {
    navigate('/addSchedule');
  };
  const generate = () => {
    // 일년은 52주
    const startWeek = current.clone().startOf('month').week();
    const endWeek =
      current.clone().endOf('month').week() === 1
        ? 53
        : current.clone().endOf('month').week();

    // 날짜
    let calendar = [];

    for (let w = startWeek; w <= endWeek; w++) {
      calendar.push(
        <Weekend key={w}>
          {Array(7)
            .fill(0)
            .map((n, idx) => {
              const noFormatDate = current
                .clone()
                .startOf('year')
                .week(w)
                .startOf('week')
                .add(idx, 'day');

              const day = noFormatDate.format('D');
              const fullDate = noFormatDate.format('l').replaceAll('.', '');
              const isToday =
                noFormatDate.format('YYYYMMDD') === moment().format('YYYYMMDD')
                  ? 'today'
                  : '';
              const isGrayed =
                noFormatDate.format('MM') === current.format('MM')
                  ? ''
                  : 'grayed';

              const currentSch = thisMonth.filter((s) => {
                return s.date === fullDate;
              });

              const dateInfo = { day, fullDate, dow: idx, currentSch };
              return (
                <Day
                  key={n + idx}
                  dateInfo={dateInfo}
                  className={`${isGrayed} ${isToday}`}
                />
              );
            })}
        </Weekend>
      );
    }
    return calendar;
  };

  return (
    <div>
      <CalHeader>
        <LogoImg src={'img/logo.png'}></LogoImg>
        <SetImg src={'img/setting.png'}></SetImg>
      </CalHeader>
      <CalendarWrapper>
        {isOpenEditPopup && <EditSchedule />}
        <Header>
          <MdChevronLeft
            className="dir"
            onClick={movePrevMonth}
          ></MdChevronLeft>
          <span>{current.format('MMMM')}</span>
          <MdChevronRight
            className="dir"
            onClick={moveNextMonth}
          ></MdChevronRight>
        </Header>
        <DateContainer>
          <Weekend className="row">
            <Dow color="#ff4b4b">
              <span>S</span>
            </Dow>
            <Dow>
              <span>M</span>
            </Dow>
            <Dow>
              <span>T</span>
            </Dow>
            <Dow>
              <span>W</span>
            </Dow>
            <Dow>
              <span>T</span>
            </Dow>
            <Dow>
              <span>F</span>
            </Dow>
            <Dow color="#4b87ff">
              <span>S</span>
            </Dow>
          </Weekend>
          {generate()}
        </DateContainer>
      </CalendarWrapper>
      <ButtonWrapper
        onClick={() => {
          dispatch(openEditPopup(false));
      }}>
        <MdEdit onClick={goToAddSchedule} className={'writeBtn subBtn'} />
        <MdDehaze className={'menuBtn'} />
      </ButtonWrapper>
    </div>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
   height:100%;
   display:flex;
   justify-content:center;
   align-items:center;
`;

const ModalOverlay = styled.div`
   position:absolute;
   top:0px;
   left:0px; 
   width:100%;
   height:100%;
   background-color:black; 
   opacity:.5; 
`;

const ModalContent = styled.div`
    background-color:white; 
    padding :20px; 
`;

export default Calendar;