import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft } from 'react-icons/md';
import Datepicker from './datepicker';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createSchedule } from './redux/modules/schedule';
import moment from 'moment';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { userState } from "./recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCookies } from 'react-cookie';

const AddSchedule = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    console.log(user)
    if(user===null){
      window.location.href = "/login";
    }
  }, []);

  const [date, setDate] = useState(
    moment().format().split(':')[0] + ':' + moment().format().split(':')[1]
  );
  const [title, setTitle] = useState('');
  const [diaryDetail, setDiaryDetail] = useState('');
  const [titleError, setTitleError] = useState(false);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250,
      textAlign: 'center'
    },
    button: {
      width: '250px',
      backgroundColor: 'skyblue',
      color: 'white'
    }
  }));

  const classes = useStyles();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  console.log('토큰이다', token);

  const onAddSchedule = () => {
    if (checkValid()) {
      const yyyymmdd = date.split('T')[0].replaceAll('-', '');
      const formattedDate = yyyymmdd.slice(0, 4) + '-' + yyyymmdd.slice(4, 6) + '-' + yyyymmdd.slice(6);
      const time = date.split('T')[1].replaceAll(':', '');
      // const data = { date: yyyymmdd, time, title, description };
      const data = { diaryDetail, addDate: formattedDate };
      console.log(data, token);
      dispatch(createSchedule(data, token));

      // navigate('/');
    }
  };

  const checkValid = () => {
    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <MdChevronLeft
          onClick={() => {
            navigate(-1);
          }}
        />
        일정 추가 &nbsp;&nbsp;&nbsp;
        <i />
      </Header>
      <Body>
        <Datepicker setDate={setDate} date={date} />
        <TextField
          id="standard-basic"
          label="어떤 일정이 있나요?"
          error={titleError}
          className={classes.textField}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="간단 메모"
          multiline
          rows={4}
          className={classes.textField}
          variant="outlined"
          onChange={(e) => {
            setDiaryDetail(e.target.value);
          }}
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={onAddSchedule}
        >
          + ADD
        </Button>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background-color: white;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  font-size: 1.5em;

  & * {
    color: #cccccc;
    cursor: pointer;
  }

  /* Mobile Device */
  @media screen and (max-width: 767px) {
    width: 100vw;
  }

  /* Tablet Device */
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 100vw;
  }

  /* Desktop Device */
  @media screen and (min-width: 992px) {
    width: 30vw;
  }
`;

const Body = styled.div`
  background-color: white;
  padding-top: 6vh;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  /* Mobile Device */
  @media screen and (max-width: 767px) {
    width: 100vw;
  }

  /* Tablet Device */
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 100vw;
  }

  /* Desktop Device */
  @media screen and (min-width: 992px) {
    width: 30vw;
  }
`;
export default AddSchedule;