import {Link} from 'react-router-dom';
import Calendar from './calendar'
import Login from './login'
// import Moment_Calendar from './momentcal'
// import Header from './header'
import {
    StartBtn,
    FadeHome,
    HomeContent,
    HomeText,
    HomeDesDiv,

} from './../component_css/home_style';

const Home = () => {
    return (
        <>          
            <FadeHome>
                <Login/>
                {/* <Calendar/> */}
                {/* <HomeContent>
                    우리는 수어교육의 격차를 해소하고자<br/>
                    인공지능 기반 수어 학습 프로그램을 제공합니다.<br/>
                    손수를 통해 세상과 소통을 시작해보세요
                </HomeContent>
                <Link to={"/service_intro"}>
                    <StartBtn>시작하기</StartBtn>
                </Link> */}
            </FadeHome>
        </>
    )
}

export default Home