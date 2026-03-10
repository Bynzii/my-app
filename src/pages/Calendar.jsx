
import { useState } from 'react'
import '../assets/css/Calendar.css'

function Calendar() {
  const today = new Date();    

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [schedules, setSchedules] = useState([]);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState('');
  const [isOpen, setIsopen] = useState(false);

  // 이전달 / 다음달 
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11); setYear(year -1); 
    } else setMonth(month -1); 
  };
  const nextMonth = () => {
    if (month ===11) {
      setMonth(0); setYear(year + 1); 
    } else setMonth(month + 1);
  };

  // 모달 열기
  const handleDayClick = (day) => {
    setSelected(day);
    setInput('');
    setIsopen(true);
  }

  //스케줄 추가
  const addSchedule = () => {
    if (input.trim() === '' ) return;     //빈값이면 추가 안함
    
    setSchedules([...schedules, {
      id: Date.now(),
      year, month, day: selected,
      text: input,
    }]);
    setInput('');
    setIsopen(false);
  };

  //스케줄 삭제
  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  // 특정 날짜의 스케줄 가져오기
  const getSchedules = (day) => {
    return schedules.filter(s => 
      s.year === year && s.month === month && s.day === day
    );
  };

  // 달력 날짜 
  const firstDay = new Date(year, month, 1).getDay();       //이번달 1일이 무슨 요일인지 계산(0-6까지 숫자)
  const lastDate = new Date(year, month + 1, 0).getDate();  //이번달 마지막날짜 

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);       //0-6까지 숫자만큼 null 빈칸
  for (let i = 1; i <= lastDate; i++) days.push(i);         //1-31 숫자 추가

  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일','월','화','수','목','금','토'];

  return (
    <div className='cal__wrap'>

      {/* 헤더 : 년,월 + 이전,다음 */}
      <div className="cal__header">
        <button className="cal__nav-btn" onClick={prevMonth}>‹</button>
        <h2 className='cal__tit'>{year}년 {months[month]}</h2>
        <button className="cal__nav-btn" onClick={nextMonth}>›</button>
      </div>

      {/* 요일 */}
      <div className="cal__grid">
        {dayNames.map((d, i) => (
          // 토, 일 요일에 클래스 추가(글씨 컬러)
          <div key={i} className={`cal__day-name ${i === 6 ? 'sat' : ''} ${i === 0 ? 'sun' : ''}`}>{d}</div>
        ))}

        {/* 날짜 : days의 배열만큼 반복 생성 */}
        {days.map((day, i) => {
          
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();  // 3개 조건에 다 맞아야 오늘날짜
          const hasSchedule = day && getSchedules(day).length > 0;   //날짜에 스케줄이 있는지 체크

          return (
            <div 
              key={i} 
              className={`cal__day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''} ${i % 7 === 6 ? 'sat' : ''} ${i % 7 === 0 ? 'sun' : ''}`}
              onClick={() => {day && handleDayClick(day)}}  //day가 null이면 클릭 안되게
            >
              {day && <span className='cal__day-num'>{day}</span>}
              {hasSchedule && <span className='cal__dot'></span>}  {/* 날짜에 스케줄이 있으면 점 표시 */}
            </div>
          );
        })}
      </div>

      {/* 선택한 날짜 스케줄 목록 */}
      {selected && (
        <div className="cal__schedule-list">
          <h3 className="cal__schedule-tit">{month + 1}월 {selected}일</h3>
          {getSchedules(selected).length === 0 
          ? <p className="cal__no-schedule">no schedules</p> 
          : getSchedules(selected).map(s => (
            <div key={s.id} className='cal__schedule-item'>
              <span>{s.text}</span>
              <button onClick={() => deleteSchedule(s.id)}>✕</button>
            </div>
          ))
        }
        </div>
      )}

      {/* 모달 */}
      {isOpen &&
        <div className='cal__modal-overlay' onClick={() => setIsopen(false)}>
          <div className="cal__modal" onClick={(e) => e.stopPropagation()}>
            <h3>{month + 1}월 {selected}일 스케줄 추가</h3>
            <input 
              type="text" 
              className='cal__modal-input'
              placeholder='스케줄을 입력하세요'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSchedule()}
              autoFocus
            />
            <div className="cal__modal-btns">
              <button className="cal__modal-cancle" onClick={() => setIsopen(false)}>취소</button>
              <button className="cal__modal-add" onClick={addSchedule}>추가</button>
            </div>
          </div>
        </div>
      }

    </div>
  )

};

export default Calendar;