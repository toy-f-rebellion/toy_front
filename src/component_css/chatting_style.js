import styled from 'styled-components';
export const ChattingWrapper = styled.div`

`;

export const ChattingSideLay = styled.div`
    position: fixed;
    top: 0;
    width: 20%;
    height: 100vh;
    left: 0;
    right: 0;
    background-color:#FCC21B;
    text-align: left;
`;

export const ChattingSideLogo = styled.img`
    width:40%;
    margin: 10%;
`;

export const ChattingSideExit = styled.button`
    position: fixed;
    width: 15%;
    height: 7%;
    bottom: 3.5%;
    left: 2.5%;
    background-color: white;
    color: #FCC21B;
    border-radius: 10px;
    border: none;
`;

export const ChattingContent = styled.div`
`;

export const ChattingContentLay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    position: fixed;
    width: 80%;
    height: 85%;
    top: 0;
    left: 20%;
    // background-color: black;
    overflow: auto;
`;

export const ChattingUserWrapper = styled.div`
    display: flex;
    margin-top: 3vh;
`;

export const ChattingUserMsg = styled.div`
    padding: 10px 20px;
    background-color: #FCC21B;
    border-radius: 10px;
    margin-right: 10px;
`;

export const ChattingUserProfile = styled.img`
    width: 4vw;
`;

export const ChattingSendWrapper = styled.div`
    background-color: white;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 80%;
    height: 15%;
`;

export const ChattingInput = styled.input`
    position: fixed;
    bottom: 3%;
    right:10%;
    width: 65%;
    height: 6%;
    text-align: left;
    border-radius: 10px;
    border: solid 3px #FCC21B;
    padding: 2px 10px;
    color: black;
`;

export const ChattingBtn = styled.button`
    position: fixed;
    bottom: 3%;
    right:2%;
    width: 6%;
    height: 8%;
    border-radius: 10px;
    border: none;
    background-color: #FCC21B; 
    color: white;
`;