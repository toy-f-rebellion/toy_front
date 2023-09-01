import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdChevronLeft } from 'react-icons/md';
import Datepicker from './datepicker';
import { Button, TextField, makeStyles } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import { createSchedule } from './schedule';
import moment from 'moment';
import {
  CalHeader,
  LogoImg,
  SetImg,
} from '../component_css/calendar_style';

// const AddSchedule = ({ history }) => {
  const AddSchedule = () => {
    const [date, setDate] = useState(
      moment().format().split(':')[0] + ':' + moment().format().split(':')[1]
    );
    console.log(date);
    const [title, setTitle] = useState('');
    console.log(title);
    // const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState(false);
    // const dispatch = useDispatch();

    // Initialize the references here
    const inputTitle = useRef(null);
    const inputDescription = useRef(null);

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
    const navigate = useNavigate();
    const onAddSchedule = () => {
      if (checkValid()) {
        const yyyymmdd = date.split('T')[0].replaceAll('-', '');
        const time = date.split('T')[1].replaceAll(':', '');
        // const data = { date: yyyymmdd, time, title, description };
        const data = { date: yyyymmdd, time, title };

        // dispatch(createSchedule(data));

        // history.push('/');
        navigate('/');
      }
    };

    const checkValid = () => {
      if (title.length === 0 || title.trim().length === 0) {
        setTitleError(true);
        return false;
      }

      return true;
    };
    return (
      <Wrapper>
        <CalHeader>
          <LogoImg src={'img/logo.png'}></LogoImg>
        </CalHeader>
        <Header>
          <MdChevronLeft
            onClick={() => {
              // history.goBack();
              // navigate(-1);
              navigate('/');
            }}
          />
          일기 작성 &nbsp;&nbsp;&nbsp;
          <i />
        </Header>
        <Body>
          <Datepicker setDate={setDate} date={date} />
          <select>
            <option value="행복">행복</option>
            <option value="중립">중립</option>
            <option value="슬픔">슬픔</option>
            <option value="분노">분노</option>
            <option value="놀람">놀람</option>
            <option value="싫음">싫음</option>
            <option value="두려움">두려움</option>
          </select>
             {/* <TextField
            // id="standard-basic"
            // label="어떤 일정이 있나요?"
            // error={titleError}
            // className={classes.textField}
            // onChange={(e) => {
            //   setTitle(e.target.value);
            //   setTitleError(false); // Reset the error state when user starts typing.
            // }}
            // inputRef={inputTitle} // Use the ref here.
          />*/}
          <TextField
            id="outlined-multiline-static"
            label="간단 메모"
            multiline
            rows={4}
            className={classes.textField}
            variant="outlined"
            // onChange={(e) => {
            //   setDescription(e.target.value);
            // }}
            // inputRef={inputDescription} // Use the ref here.
          />
          <Button
            className={classes.button}
            variant="contained"
            // onClick={onAddSchedule}
            onClick={() => {
              // history.goBack();
              // navigate(-1);
              navigate('/calendar');
            }}
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