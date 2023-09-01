import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../component_css/login.css';
import {
    LoginWrapper,
    LoginTitle,
    LoginContent,
    IdInput,
    PasswordInput,
    LoginBtn,
    SocialContent,
    GoogleBtn,
    NaverBtn,
    KakaoeBtn,
} from '../component_css/login_style';

const Login = () => {
  // 카카오 소셜 로그인
  const REST_API_KEY = '3eb202eb62b260eb7db3b39958379429';
  const REDIRECT_URI = 'http://localhost:3000/calendar';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

// function Login() {
  const [isSignIn, setIsSignIn] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsSignIn(true);
  //   }, 200);
  // }, []);

  const handleToggle = () => {
    setIsSignIn((prevState) => !prevState);
  };

  const handleSignUpClick = () => {
    console.log('Sign up button clicked'); // 클릭 시 콘솔에 메시지 출력
  };

  const [data, setData] = useState(null);
  const [UserData,setUserData] = useState();
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const checkEmail = async () => {
      const payload = { 
        userEmail: "use3311@email.com",
        userPassword: "user1password"
       };
      
      try {
        const response = await axios.post('http://13.209.16.226:8080/api/auth/signIn', payload);
        console.log(response.data); 
        setData(response.data); // 응답 데이터를 state 변수에 저장
        setToken(response.data.data.token); // Save the token to state
      } catch (error) {
        console.error(error);
      }
    };
    checkEmail();
    

    // axios.get("/api/diary/view?addDate=2023-01-01")
    // .then(function (response) {
    //     // response  
    //     console.log(response.diaryDetail);
    //     setUserData(response.data.data); // 이 부분이 누락되어 있어서 추가했습니다.
    // }).catch(function (error) {
    //     // 오류발생시 실행
    // }).then(function() {
    //     // 항상 실행
    // });
  }, []); // 빈 배열을 dependency로 전달하여 마운트 시 한 번만 실행되도록 함
  console.log(data);
  console.log(UserData);

  useEffect(() => {
    if (!token) return; // If there's no token yet, don't do anything

    const fetchData = async () => {
      try{
        const response = await axios.get('http://13.209.16.226:8080/api/diary/view?addDate=2023-01-01', {
          headers: { Authorization: `Bearer ${token}` } // Use the token here
        });
        
        console.log(response.data);
      } catch (error) {
         console.error("Error fetching data: ", error);
       }
     };
     
     fetchData();
   }, [token]); // Run this effect whenever the token changes


  // ================================ 메세지 전송 코드 ==================================== 
  //  useEffect(() => {
  //   if (!token) return; // If there's no token yet, don't do anything
  //   const sendData = async () => {
  //     try{
  //       const payload = { 
  //         diaryDetail: "메세지 전송 성공~!",
  //         addDate: "2023-07-01"
  //        };

  //        // Replace 'http://your-api-url' with your actual API endpoint
  //        const response = await axios.post('http://13.209.16.226:8080/api/diary/create', payload ,{
  //          headers: { Authorization: `Bearer ${token}` } // Use the token here
  //        });
        
  //        console.log(response.data);
  //      } catch (error) {
  //         console.error("Error sending data: ", error);
  //      }
  //    };
     
  //    sendData();
  //  }, [token]); // Run this effect whenever the token changes

  return (
    <div className="login">
      <div className="login_wrapper">
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
          <div className="login_row">
            <div className="login_col align-items-center flex-col sign-up">
              <div className="form-wrapper align-items-center">
                <div className="form sign-up">
                <LoginTitle src={'img/logo.png'}></LoginTitle>
                  <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input type="text" placeholder="이름" />
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="email" placeholder="이메일" />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="password" placeholder="비밀번호" />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="password" placeholder="비밀번호 확인" />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="tel" placeholder="전화번호" />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="date" placeholder="생일" />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <label for="male">남성</label>
                    <input type="radio" name="gender" id="male" />
                    <label for="female">여성</label>
                    <input type="radio" name="gender" id="female" />
                  </div>

                    <button onClick={handleSignUpClick}>Sign up</button>
                  <p>
                    <span>Already have an account?</span>
                    <b onClick={handleToggle} className="pointer">
                      Sign in here
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="login_col align-items-center flex-col sign-in">
              <div className="form-wrapper align-items-center">
                <div className="form sign-in">
                <LoginTitle src={'img/logo.png'}></LoginTitle>
                  <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input type="email" placeholder="이메일" />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="password" placeholder="비밀번호" />
                  </div>
                  <Link to={"/calendar"} style={{ textDecoration: 'none' }}>
                    <button>Sign in</button>
                  </Link>
                  <SocialContent>
                        <GoogleBtn src={'img/google.png'}></GoogleBtn>
                        <NaverBtn src={'img/naver.png'}></NaverBtn>
                        <KakaoeBtn src={'img/kakao.png'} onClick={loginHandler}></KakaoeBtn>
                    </SocialContent>
                  <p>
                    <b>Forgot password?</b>
                  </p>
                  <p>
                    <span>Don't have an account?</span>
                    <b onClick={handleToggle} className="pointer">
                      Sign up here
                    </b>
                  </p>
                </div>
              </div>
              <div className="form-wrapper"></div>
            </div>
          </div>
          <div className="login_row content-row">
            <div className="login_col align-items-center flex-col">
              <div className="text sign-in">
                <h2>Welcome</h2>
              </div>
              <div className="img sign-in"></div>
            </div>
            <div className="login_col align-items-center flex-col">
              <div className="img sign-up"></div>
              <div className="text sign-up">
                <h2>Join with us</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;