import {Link} from 'react-router-dom';
// import Moment_Calendar from './momentcal'
// import Header from './header'
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

const Home = () => {
    return (
        <>
            <LoginWrapper>
                <LoginTitle src={'img/login_logo.png'}></LoginTitle>
                <LoginContent>
                    <IdInput type='text' placeholder='ID를 입력하세요'></IdInput>
                    <PasswordInput type='password' placeholder='비밀번호를 입력하세요'></PasswordInput>
                    <LoginBtn>로그인하기</LoginBtn>
                </LoginContent>
                <SocialContent>
                    <GoogleBtn src={'img/google.png'}></GoogleBtn>
                    <NaverBtn src={'img/naver.png'}></NaverBtn>
                    <KakaoeBtn src={'img/kakao.png'}></KakaoeBtn>
                </SocialContent>
            </LoginWrapper>
        </>
    )
}

export default Home