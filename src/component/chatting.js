import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { STT } from '../Speech-To-Text';
import { TTS } from '../Text-To-Speech';
import { useNavigate } from 'react-router-dom';
// import { IonIcon } from '@ionic/react'; // Import IonIcon from the ionicons
import { FaMicrophone } from "react-icons/fa";
import { BsFillVolumeUpFill } from "react-icons/bs";
import {Link} from 'react-router-dom';
import '../component_css/chatting.css';
import {
    ChattingWrapper,
    ChattingSideLay,
    ChattingSideLogo,
    ChattingSideExit,
    ChattingContent,
    ChattingContentLay,
    ChattingUserWrapper,
    ChattingUserMsg,
    ChattingUserProfile,
    ChattingSendWrapper,
    ChattingInput,
    ChattingIcon,
    ChattingMic,
    ChattingSpeaker,
    ChattingBtn,
} from './../component_css/chatting_style';

const Chatting = () => {
    const [name, setName] = useState("");
    const [sendtext, setSendText] = useState(""); // 질문 변수
    const [answer, setAnswer] = useState(''); // 답변 변수
    const [isMessageVisible, setIsMessageVisible] = useState(false); // Add state for controlling visibility
    const [messages, setMessages] = useState([]); // Store messages in an array

    const chatContentRef = useRef(null); // Create a ref for chat content


    useEffect(() => {
        // This function runs when the component mounts
        const initializeConversation= async () => {
          try{
            await axios.post('http://localhost:3001/initialize');
            setAnswer('');
          }catch(error){
            console.error(error);
          }
        };
        initializeConversation();
      }, []);  // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        // Scroll chat content to the bottom whenever messages change
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    const onChange = (e) => {
        setSendText(e.target.value);
    }
    const askQuestion= async () => {
        try{
          const res=await axios.post('http://localhost:3001/ask', {sendtext});
          setAnswer(res.data.answer);
        }catch(error){
          console.error(error);
        }
      };
    const onClick = async () => {
        if (sendtext.trim() !== "") { // 입력창이 비어있지 않으면 전송한다.
            askQuestion();
            setName((sendtext));
            setMessages([...messages, sendtext]); // Add new message to the messages array
            setIsMessageVisible(true); // 클릭이후에 메세지와 프로필 사진이 보이게 한다.
            setSendText(""); // 인풋창 초기화
            console.log(name)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior (like adding a new line)
            onClick();
        }
    }

    const [isRecording, setIsRecording] = useState(false);

    const handleRecordClick = () => {
        if (isRecording) {
            stopListening();
        } else {
            startListening();
        }
        setIsRecording(!isRecording);
    };


    const navigate = useNavigate();

    const {
        transcript,
        listening,
        startListening,
        stopListening,
        resetTranscript
      } = STT();

      useEffect(() => {
        setSendText(transcript);
      }, [transcript]);
      
      const { text, 
        handleTextChange, 
        playTTS 
      } = TTS();

      const playMessage = (message) => {
        // Modify playTTS to accept a message parameter
        handleTextChange({ target: { value: message } }); // set the text to the current message
        playTTS(); // play the TTS with the current message
      };

    return (
        <>         
            <ChattingWrapper>
                <ChattingSideLay>
                    <ChattingSideLogo src={'img/side_logo.png'}></ChattingSideLogo>
                    <ChattingSideExit
                        onClick={() => {
                        navigate(-1);
                        }}>나가기</ChattingSideExit>
                </ChattingSideLay>
                <ChattingContent>
                    {isMessageVisible && ( // Render only when isMessageVisible is true
                        <ChattingContentLay ref={chatContentRef}>
                            {messages.map((message, index) => (
                                <ChattingUserWrapper key={index}>
                                    <ChattingSpeaker onClick={() => playMessage(message)}>
                                        <BsFillVolumeUpFill size="40" color="#FCC21B"/> 
                                    </ChattingSpeaker>
                                    <ChattingUserMsg onChange={handleTextChange}>{message}</ChattingUserMsg>
                                    <ChattingUserProfile src={'img/userprofile.png'}></ChattingUserProfile>
                                </ChattingUserWrapper>
                            ))}
                            <p>{answer}</p>
                        </ChattingContentLay>
                    )}
                    <ChattingSendWrapper>
                        <ChattingInput type='text' name='test' value={sendtext} onChange={onChange} onKeyPress={handleKeyPress}></ChattingInput>
                        <ChattingIcon>
                            <ChattingMic onClick={handleRecordClick}>
                                <FaMicrophone margin="10" size="40" color="#FCC21B"/>
                            </ChattingMic> 
                        </ChattingIcon>
                        <ChattingBtn onClick={onClick}>전송</ChattingBtn>
                    </ChattingSendWrapper>
                </ChattingContent>
            </ChattingWrapper>
        </>
    )
}

export default Chatting