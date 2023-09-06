import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GPTchat() {
   const [question, setQuestion] = useState('');
   const [answer, setAnswer] = useState('');

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

   const askQuestion= async () => {
     try{
       const res=await axios.post('http://localhost:3001/ask', {question});
       setAnswer(res.data.answer);
     }catch(error){
       console.error(error);
     }
   };

   return (
      <div className="App">
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion}>Ask</button>
        <p>{answer}</p>
      </div>
    );
}

export default GPTchat;