import { useState } from 'react';
import '../assets/css/Fortune.css'

const fortunes = [
  {grade: '대길', className: 'great', emoji: '🌟', text: '오늘은 모든 일이 잘 풀립니다!'},
  {grade: '길', className: 'good', emoji: '☀️', text: '좋은 기운이 함께합니다.'},
  {grade: '평', className: 'normal', emoji: '🌙', text: '평온한 하루가 될 거예요.'},
  {grade: '흉', className: 'bad',  emoji: '🌧', text: '오늘은 신중하게 행동하세요.'},
]

function Fortune() {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const draw = () => {
    setStatus('loading');
    setTimeout(() => {
      const random = fortunes[Math.floor(Math.random() * fortunes.length)];
      setResult(random);
      setStatus('result');
    }, 2000)
  };


  return (
    <div className="fortune__wrap">
      {status ==='loading' &&
        <div className="fortune__loading">🔮<br/>뽑는중...</div>
      }

      {status === 'result' &&
        <div className="fortune__result">
          <h4 className={`fortune__grade ${result.className}`}>{result.grade}</h4>
          <span className='emoji'>{result.emoji}</span>
          <span className='text'>{result.text}</span>
        </div>
      }

      {status !=='loading' && (
        <button type='button' className="fortune__btn" onClick={draw}>
          {status === 'idle' ? '🔮 운세 뽑기' : '🔄 한번 더' }
        </button>
      )}
    </div>
  )
}

export default Fortune;