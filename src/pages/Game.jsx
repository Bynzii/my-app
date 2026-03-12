
import { useState } from 'react'
import '../assets/css/Game.css'

function Game() {
  const [status, setStatus] = useState('idle');
  const [answer, setAnswer] = useState(null);
  const [input, setInput] = useState('');
  const [hint, setHint] = useState('');
  const [count, setCount] = useState(0);

  // 초기화 + 확인버튼 누를때마다 리셋
  const startGame = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setAnswer(random);
    setStatus('playing'); //idle -> playing으로 바꿈
    setInput('');
    setHint('');
    setCount(0);
  };

  // 정답 확인
  const checkAnswer = () => {
    if (input.trim() === '') return;

    const guess = Number(input);  //문자열 -> 숫자로
    setCount(count + 1);

    if (guess === answer) { 
      setStatus('correct'); //playing -> correct로 바꿈
      setHint('');
    } else if (guess < answer) {
      setHint('UP ↑');
    } else {
      setHint('DOWN ↓');
    }
    setInput('');
  };


  return (

    <div className="game__wrap">

      {/* 시작전 -> 버튼만 노출 */}
      {status === 'idle' && (
        <div className='game__start'>
          <p className="game__desc">1 ~ 100사이의 숫자를 맞춰보세요!</p>
          <button className='game__btn' onClick={startGame}>🎲 숫자 뽑기</button>
        </div>
      )}

      {/* 게임중 */}  
      {status === 'playing' && (
        <div className="game__playing">
          <p className="game__tries">{count}번 시도</p>

          {/* 업다운 힌트 */}
          {hint && (
            <div className={`game__hint ${hint.includes('UP') ? 'up' : 'down'}`}>{hint}</div>
          )}

          {/* 입력창 */}
          <div className="game__input-row">
            <input 
              type="text" 
              className='game__it'
              placeholder='숫자를 입력하세요'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              min='1' max='100'
              autoFocus
            />
            <button type='button' className='game__check-btn' onClick={checkAnswer}>확인</button>
          </div>
        </div>
      )}

      {/* 정답 */}
      {status === 'correct' && (
        <div className="game__result">
          <p className="game__emoji">🎉</p>
          <h2 className="game__correct-msg">정답이에요!</h2>
          <p className="game__correct-num">정답은 <strong>{answer}</strong></p>
          <p className="game__correct-count">{count}번 만에 맞췄어요!</p>
          <button className="game__btn" onClick={startGame}>🔄 다시하기</button>
        </div>
      )}

    </div>
  );
}

export default Game