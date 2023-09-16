import './App.css';
// import { firestore } from './component/firebase';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./component/home";
import Login from "./component/login";
import Redirection from "./component/redirection";
import Calendar from './component/calendar';
import AddSchedule from './component/addschedule';
import EditSchedule from './component/editschedule';
import Chatting from './component/chatting';
import Mypage from './component/mypage';
import STTTTS from './component/stt-tts';
import GPTchat from './component/gptchat';
import { RecoilRoot } from 'recoil';
// import { withRouter } from 'react-router';
// import { useSelector } from 'react-redux';



// function App() {
// const App = ({ history }) => {
  const App = () => {
  // const { isOpenEditPopup } = useSelector((state) => state.schedule);
  // const { isOpenEditPopup } = useSelector(state => state.someReducer);
  useEffect(() => {
    // console.log(firestore);
  });

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <RecoilRoot>
        <BrowserRouter>
          {/* <GlobalStyles/>           */}
            {/* <Header /> */}
              <Routes>
                {/* 루트 */}
                <Route exact path="/" element={<Calendar />}/>
                {/* 로그인 */}
                <Route exact path="login" element={<Login />}/>
                {/* 카카오 리다이렉션 */}
                <Route exact path='/kakao/callback' element={<Redirection />} />
                {/* 캘린더 */}
                <Route exact path="calendar" element={<Calendar />}/>
                {/* 스케줄추가 */}
                <Route exact path="addschedule" element={<AddSchedule />}/>
                {/* 스케줄추가 */}
                <Route exact path="editschedule" element={<EditSchedule />}/>
                
                {/* 채팅 */}
                <Route exact path="chatting" element={<Chatting />}/>
                {/* 마이페이지 */}
                <Route exact path="mypage" element={<Mypage />}/>
                {/* stt/tts */}
                <Route exact path="stt-tts" element={<STTTTS />}/>
                {/* GPT */}
                <Route exact path="gptchat" element={<GPTchat />}/>
              </Routes>
              {/* <a><Footer /></a> */}
        </BrowserRouter> 
      </RecoilRoot>
    </div>
  );
};

export default App;
{/* // export default withRouter(App); */}
