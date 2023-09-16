// 감정id, 감정img, 감정명, onClick, isSelected를 props으로 전달
const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
    return (
    
    // 오늘의 감정 5개 중 선택 시
    // 선택한 item은 EmotionItem_on번호
    // 선택하지 않은 item은 EmotionItem_off
      <div
        className={[
          "EmotionItem",
          isSelected ? `EmotionItem_on${emotion_id}` : `EmotionItem_off`].join(" ")}
        onClick={()=>onClick(emotion_id)}
      >
        <img src={emotion_img} alt={emotion_descript} />
        <span>{emotion_descript}</span>
      </div>
    );
  };
  
  export default EmotionItem;