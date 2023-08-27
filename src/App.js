import './App.css';
import { firestore } from './component/firebase';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./component/home";
import Login from "./component/login";
import Redirection from "./component/redirection";
import Calendar from './component/calendar';
import EditSchedule from './component/editschedule';
import AddSchedule from './component/addschedule';
import DatePicker from './component/datepicker';
import Day from './component/day';
import Schedule from './component/schedule';
// import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

// function App() {
// const App = ({ history }) => {
  const App = () => {
  const { isOpenEditPopup } = useSelector((state) => state.schedule);
  useEffect(() => {
    console.log(firestore);
  });
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <BrowserRouter>
        {/* <GlobalStyles/>           */}
          {/* <Header /> */}
            <Routes>
              {/* 루트 */}
              <Route exact path="/" element={<Login />}/>
              {/* 로그인 */}
              <Route exact path="login" element={<Login />}/>
              {/* 카카오 리다이렉션 */}
              <Route exact path='/kakao/callback' element={<Redirection />} />
              {/* 캘린더 */}
              <Route exact path="calendar" element={<Calendar />}/>
              {/* 스케줄추가 */}
              <Route exact path="addschedule" element={<AddSchedule />}/>
              {/* 스케줄편집 */}
              <Route exact path="editschedule" element={<EditSchedule />}/>
              
              {/* 날짜피커 */}
              <Route exact path="datepicker" element={<DatePicker />}/>
              {/* 날짜 */}
              <Route exact path="day" element={<Day />}/>
              {/* 스케줄 */}
              <Route exact path="schedule" element={<Schedule />}/>
            </Routes>
            {/* <a><Footer /></a> */}
      </BrowserRouter> 
    </div>
  );
}

export default App;
// export default withRouter(App);
