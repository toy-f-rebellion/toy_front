import styled from 'styled-components';

export const CalHeader = styled.header`
display: flex;
justify-content: space-between;
padding: 20px;
`

export const LogoImg = styled.img`

`;

export const SetImg = styled.img`

`;

export const ButtonWrapper = styled.div`
position: absolute;
left: 90vw;
top: 70vh;
text-align: center;
padding-bottom: 3px;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow: hidden;
height: 150px;

&:hover .subBtn {
  opacity: 1;
  visibility: visible;
  top: 0;
}

& > svg {
  cursor: pointer;

  border-radius: 50%;
  color: white;
  width: 25px;
  height: 25px;
  padding: 10px;

  &.filterBtn {
    background-color: pink;
    z-index: 1;
    transition: all 0.4s ease;
  }

  &.writeBtn {
    background-color: skyblue;
    z-index: 2;
    transition: all 0.5s ease;
  }

  &.menuBtn {
    background-color: #ffdb0d;
    z-index: 3;
  }

  &.subBtn {
    opacity: 0;
    visibility: hidden;
    top: 60px;
    position: relative;
  }
}
`;

export const CalendarWrapper = styled.div`
position: relative;
`;

export const Header = styled.div`
height: 7vh;
display: flex;
justify-content: center;
align-items: center;
padding: 0 3px;
font-size: 1.5em;

& > span {
  margin: 0 100px;
}
& > .dir {
  color: #cccccc;

  &:hover {
    cursor: pointer;
  }
}
`;

export const DateContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 1vw;
`;

export const Weekend = styled.div`
display: flex;
`;

export const Dow = styled.div`
border-bottom: 1px solid gray;
width: 100%;
height: 35px;
color: ${(props) => (props.color ? props.color : 'black')};
text-align: center;
& span {
}
`;