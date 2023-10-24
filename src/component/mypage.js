import {Link, useNavigate} from 'react-router-dom';
import { BsFillCalendarEventFill } from "react-icons/bs";
import { userState } from "./recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    MypageContain,
    MypageWrapper,
    MypageListWrapper,
    MypageProfile,
    MypageEmail,
    MypagePicture,
    MypageList,
    MypageNickname,
    MypagePassword,
    MypageLogout,
    MypageOut,
} from './../component_css/mypage_style';
import {
    CalHeader,
    LogoImg,
  } from '../component_css/calendar_style';

const Mypage = () => {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    return (
        <MypageContain>
            <CalHeader>
                <LogoImg
                    src={'img/logo.png'}
                    onClick={() => {
                        navigate("/");
                }}>
                </LogoImg>
                {/* <SetImg src={'img/setting.png'}></SetImg> */}
                {/* <div>{user&&user.name}</div> */}
                
                <BsFillCalendarEventFill
                    size="40"
                    color="#FCC21B"
                    onClick={() => {
                    navigate("/");
                }}/> 
            </CalHeader>
            <MypageWrapper>
                <MypageListWrapper>
                    <MypageProfile>
                        <MypageEmail>
                            이메일
                            {user && <div>{user.email}</div>}
                        </MypageEmail>
                        <MypagePicture>
                            프로필사진
                        </MypagePicture>
                    </MypageProfile>
                    <MypageList>
                        <MypageNickname>
                            닉네임 변경
                        </MypageNickname>
                        <hr color='#FAFAFA' width="100%" size='1'/>
                        <MypagePassword>
                            비밀번호 변경
                        </MypagePassword>
                        <hr color='#FAFAFA' width="100%" size='1'/>
                        <MypageLogout onClick={() => {
                            setUser(null);
                            navigate("/login");
                            console.log('로그아웃되었습니다.')
                            }}>로그아웃
                        </MypageLogout>
                        <hr color='#FAFAFA' width="100%" size='1'/>
                        <MypageOut>
                            탈퇴하기
                        </MypageOut>
                        <hr color='#FAFAFA' width="100%" size='1'/>
                    </MypageList>
                </MypageListWrapper>
            </MypageWrapper>
        </MypageContain>
    )
}

export default Mypage