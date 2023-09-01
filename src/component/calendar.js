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
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   readSchedule,
//   setIsFilter,
//   openEditPopup
// } from './schedule';
import Day from './day';
import EditSchedule from './editschedule';


// const Calendar = ({ history }) => {
  const Calendar = () => {
  // const { thisMonth, isOpenEditPopup, isFilter } = useSelector(
  //   (state) => state.schedule
  // );
  // const { thisMonth, isOpenEditPopup, isFilter } = useSelector(
  //   state => state.someReducer
  // );
  const [isOpenEditPopup, setIsOpenEditPopup] = useState(false);
  // Function to open the popup
  const openPopup = () => {
    setIsOpenEditPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsOpenEditPopup(false);
  };

  const [isEditPopupOpen, setEditPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setEditPopupOpen(false); // 상태 변경 함수 호출
  };

  // Dummy reducer
  const thisMonth = [
    { id: 1, date: "20230901", title: "Event1", description: "This is event1" },
    { id: 2, date: "20230902", title: "Event2", description: "This is event2" },
  ];
  
  // const isOpenEditPopup = false;
  
  const isFilter = false;

  const [current, setCurrent] = useState(moment());
  const [schedules, setSchedules] = useState(thisMonth);

  // ============================ 필터 관련 이벤트 ============================
  // useEffect(() => {
  //   const startDay = current.clone().startOf('month').format('YYYYMMDD');
  //   const endDay = current.clone().endOf('month').format('YYYYMMDD');

  //   // Filter the schedules based on the current month
  //   const filteredSchedules = thisMonth.filter(schedule =>
  //     schedule.startDay >= startDay && schedule.endDay <= endDay
  //   );

  //   setSchedules(filteredSchedules);
    
  //  }, [current, isOpenEditPopup, isFilter]);
  
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const startDay = current.clone().startOf('month').format('YYYYMMDD');
  //   const endDay = current.clone().endOf('month').format('YYYYMMDD');
  //   // dispatch(readSchedule({ startDay, endDay }));
  // }, [current, dispatch, isOpenEditPopup, isFilter]);

  const movePrevMonth = () => {
    setCurrent(current.clone().subtract(1, 'month'));
  };

  const moveNextMonth = () => {
    setCurrent(current.clone().add(1, 'month'));
  };
  const navigate = useNavigate();
  const goToAddSchedule = () => {
    // history.push('/addSchedule');
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

  const onFilter = (isFilter) => {
    // dispatch(setIsFilter(isFilter));
  };

  // // ======================================================== rest api 받아오기 ========================================================
  // const [data, setData] = useState(null);
  
  // useEffect(() => {
  //   const checkEmail = async () => {
  //     const payload = { check: "use3311@email.com" };
      
  //     try {
  //       const response = await axios.post('http://13.209.16.226:8080/api/auth/emailCheck', payload);
  //       console.log(response.data); 
  //       setData(response.data); // 응답 데이터를 state 변수에 저장
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   checkEmail();
  // }, []); // 빈 배열을 dependency로 전달하여 마운트 시 한 번만 실행되도록 함
  // console.log(data);

  return (
    <div>
      <CalHeader>
        <LogoImg src={'img/logo.png'}></LogoImg>
        <SetImg src={'img/setting.png'}></SetImg>
      </CalHeader>
      <CalendarWrapper>
          {/* Button to open the popup */}
        {/* <button onClick={openPopup}>Open Popup</button> */}

        {/* Button to close the popup (this could be inside EditSchedule component) */}
        {/* {isOpenEditPopup && <button onClick={closePopup}>Close Popup</button>} */}
        {/* {isOpenEditPopup && <EditSchedule />} */}
        {isOpenEditPopup && (
        <ModalWrapper>
          <ModalOverlay onClick={openPopup} />
          <ModalContent>
            <EditSchedule onClose={openPopup} />
          </ModalContent>
        </ModalWrapper>
      )}
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
      <ButtonWrapper onClick={handleButtonClick}
        // onClick={() => {
          // dispatch(openEditPopup(false));
        // }}
      >
        {/* {isFilter ? (
          <MdCheck
            onClick={() => onFilter(false)}
            className={'filterBtn subBtn'}
          />
        ) : (
          <MdDoneAll
            onClick={() => onFilter(true)}
            className={'filterBtn subBtn'}
          />
        )} */}
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