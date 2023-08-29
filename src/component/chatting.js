import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { IonIcon } from '@ionic/react'; // Import IonIcon from the ionicons
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
    ChattingBtn,
} from './../component_css/chatting_style';

const Chatting = () => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [isMessageVisible, setIsMessageVisible] = useState(false); // Add state for controlling visibility
    const [messages, setMessages] = useState([]); // Store messages in an array

    const chatContentRef = useRef(null); // Create a ref for chat content

    useEffect(() => {
        // Scroll chat content to the bottom whenever messages change
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onClick = () => {
        if (text.trim() !== "") { // Only send if there's non-empty text
            setName((text));
            setMessages([...messages, text]); // Add new message to the messages array
            setIsMessageVisible(true); // Show message and user profile after clicking send
            setText(""); // Clear the input field
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
            // 처리할 로직: 녹음 중지 등
        } else {
            // 처리할 로직: 녹음 시작 등
        }
        setIsRecording(!isRecording);
    };

    const navigate = useNavigate();
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
                                    <ChattingUserMsg>{message}</ChattingUserMsg>
                                    <ChattingUserProfile src={'img/userprofile.png'}></ChattingUserProfile>
                                </ChattingUserWrapper>
                            ))}
                        </ChattingContentLay>
                    )}
                    <ChattingSendWrapper>
                        <ChattingInput type='text' name='test' value={text} onChange={onChange} onKeyPress={handleKeyPress}>
                        </ChattingInput>
                        <div>
                            {/* <IonIcon name="mic-circle-outline" className={`rpg_record_icon ${isRecording ? 'recording' : ''}`} id="record" onClick={handleRecordClick}></IonIcon> */}
                            {/* <span>말을 다 하셨다면 한번 더 클릭해주세요</span> */}
                        </div>
                        <ChattingBtn onClick={onClick}>전송</ChattingBtn>
                    </ChattingSendWrapper>
                </ChattingContent>
            </ChattingWrapper>
        </>
    )
}

export default Chatting