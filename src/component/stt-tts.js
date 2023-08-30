<div>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={startListening}>Start</button>
    <button onClick={stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p>{transcript}</p>
    <div className="TextToSpeech">
    <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="텍스트를 입력하세요"
    />
    <button onClick={playTTS}>음성으로 변환</button>
    </div>
</div>