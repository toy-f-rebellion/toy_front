import styled, { keyframes } from 'styled-components';

const Fade=keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const FadeHome=styled.div`
    animation: ${Fade} 1s;
`

export const HomeContent=styled.div`
    width: 600px;
    margin-top:51px;
    font-size:24px;
    font-weight:400;
    line-height: 40px;
    text-align: left;
    // background-color:skyblue;
  `

  export const StartBtn=styled.button`
    margin-top: 58px;
    border:none;
    outline:none;
    background-color: #FF7A00;
    color:white;

    border-radius: 109px;
    width: 212px;
    height: 50px;
    font-size:20px;
    font-weight:500;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    float: left;

    transition: 0.4s;
    &:hover{
        color:#FF7A00;
        background-color:white;
        border:1px solid #FF7A00;
    }
`