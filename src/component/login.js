import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie';
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

// ================================= 회워가입 =================================

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("");

  const signupSubmit = async (e)=>{
    e.preventDefault();
    // Check if any field is empty
    // if(name === "" || nickname === "" || email === "" || password === "" || confirmPassword === "" || phoneNum === "" || birthDate == null || gender === "") {
    //   alert("모든 필드를 채워주세요.");
    //   return;
    // }

    if(password!==confirmPassword){
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }
    try{
        let res=await axios.post('http://3.36.100.202:8080/api/auth/signUp',{
            name,
            nickname,
            email,
            password,
            phoneNum,
            birthDate,
            gender
        })
        console.log(res.data);
        // Clear the input fields after successful submission
        setName("");
        setNickname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNum("");
        setBirthDate(null);
        setGender("");

        // Check if the request was successful
        if(res.status === 200) { 
          window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}

// ================================= 로그인 =================================
const [loginemail, setloginEmail] = useState("");
const [loginpassword, setloginPassword] = useState("");

let navigate = useNavigate();

// Initialize cookie hook
const [cookies, setCookie] = useCookies(['token']);

const signinSubmit=async (e)=>{
  e.preventDefault();
  try{
      let res=await axios.post('http://3.36.100.202:8080/api/auth/signIn',{
          userEmail: loginemail,
          userPassword: loginpassword
      })
      console.log(res.data);

      // Check if the request was successful
      if(res.status === 200) {
        // Save the token to a cookie
        setCookie('token', res.data.token);

        // Save the token to a cookie
        // Cookies.set('token', res.data.token);
        
        // Navigate to /calendar page
        navigate("/calendar");
}
  }catch(err){
      console.error(err);
  }
}

  return (
    <div className="login">
      <div className="login_wrapper">
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
          <div className="login_row">
            <div className="login_col align-items-center flex-col sign-up">
              <div className="form-wrapper align-items-center">
                <div className="form sign-up">
                <LoginTitle src={'img/logo.png'}></LoginTitle>
                <form onSubmit={signupSubmit}>
                  <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input type="text" placeholder="이름" onChange={e => setName(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input type="text" placeholder="닉네임" onChange={e => setNickname(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="password" placeholder="비밀번호" onChange={e=>setPassword(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="password" placeholder="비밀번호 확인" onChange={e=>setConfirmPassword(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="tel" placeholder="전화번호" onchange ={ e=>setPhoneNum ( e.target.value )}/>
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="date" placeholder="생일" onchange ={ e=>setBirthDate ( e.target.value )}/>
                  </div>
                  <div className="gender-group">
                    <i className="bx bxs-lock-alt"></i>
                    <div>
                      <label for="male">남성</label>
                      <input type="radio" name="gender" id="male" onchange ={()=>setGender('남성')}/>
                    </div>
                    <div>
                      <label for="female">여성</label>
                      <input type="radio" name="gender" id="female" onChange={()=>setGender('여성')}/>
                    </div>
                  </div>

                  <button onClick={handleSignUpClick}>Sign up</button>
                </form>
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
                <form onSubmit={signinSubmit}>
                  <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input type="email" placeholder="이메일" onChange={e => setloginEmail(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="password" placeholder="비밀번호" onChange={e=>setloginPassword(e.target.value)}/>
                  </div>
                  {/* <Link to={"/calendar"} style={{ textDecoration: 'none' }}> */}
                    <button>Sign in</button>
                  {/* </Link> */}
                </form>
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