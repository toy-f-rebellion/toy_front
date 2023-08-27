// hooks
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { DiaryDispatchContext } from "./../App";

// components
// import MyHeader from "./MyHeader";
// import MyButton from "./MyButton";
import EmotionItem from "./emotionitem";
import {
    MyHeader,
    MyButton,
} from './../component_css/diary_style';

// EmotionItem의 img 불러오기 (1~5개의 감정 배열)
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id : 1,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript : '완전 좋음'
  },
  {
    emotion_id : 2,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript : '좋음'
  },
  {
    emotion_id : 3,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript : '그럭저럭'
  },
  {
    emotion_id : 4,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript : '나쁨'
  },
  {
    emotion_id : 5,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript : '끔찍함'
  },
]

// 날짜 표시는 YYYY-MM-DD 형태의 9개의 문자열 반환(toISOString)
// date 객체를 전달받음
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const Diary = () => {
  const [emotion, setEmotion] = useState(3); // 그럭저럭 감정(3) 기본값
  const [date, setDate] = useState(getStringDate(new Date())); // new Date 오늘 날짜 초기값
  const [content, setContent] = useState(); // textarea 상태 변화 
  const contentRef = useRef(); // textarea 참조

// EmotionItem 클릭 시 해당 state로 변화
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

// 작성완료 시 App.js에 전달
  // const {onCreate} = useContext(DiaryDispatchContext);
  
// 아무 것도 작성하지 않았다면(1글자 미만) textarea 참조받아 focusing
  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

	// 일기 작성 시 날짜, 내용, 감정 onCreate의 인자로
    // onCreate(date, content, emotion);
    
    // 작성완료 시 home 화면 이동
    // 일기 작성 옵션 뒤로가기 막기(replace:true)
    navigate('/', {replace:true});
  };

// 경로 이동
  const navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="inputBox">
            <input
              className="inputDate"
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)} />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="inputBox emotionListWrapper">
            {emotionList.map((it)=>(
            
            // EmotionItem 컴포넌트
            // 클릭하여 선택한 감정 id와 감정이 맞는지
              <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion} />
              // <div key={it.emotion_id}>{it.emotion_descript}</div>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="inputBox textWrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="controlBox">
            <MyButton text={"취소하기"} onClick={()=>navigate(-1)} />
            <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Diary;