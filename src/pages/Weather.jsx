
import { useState, useEffect } from 'react'
import '../assets/css/Weather.css'

function Weather() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // 도시명으로 날씨 가져오기
  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=kr`
      );

      const data = await res.json();
      if (data.cod !== 200) {
        setError('도시를 찾을 수 없어요');
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (e) {
      setError('날씨를 불러오지 못했어요');
    } finally {
      setLoading(false);
    }
  };

  // 현재 위치로 날씨 가져오기
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) return;

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
          );
          const data = await res.json();
          setWeather(data);
        } catch (e) {
          setError('날씨를 불러오지 못했어요');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('위치 권한을 허용해주세요');
        setLoading(false);
      }
    );
  };

  //처음 진입하면 현재 위치 날씨 가져오기
  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <div className="wthr__wrap">

      {/* 검색창 */}
      <div className="wthr__search">
        <input 
          type="text" 
          className='wthr__it'
          placeholder='도시명 검색 (영문) ex) Seoul'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeatherByCity(city)}
        />

        <button type='button' className='wthr__search-btn' onClick={() => fetchWeatherByCity(city)}>검색</button>
        <button type='button' className='wthr__loc-btn' onClick={fetchWeatherByLocation}>📍</button>
      </div>

      {/* 로딩 : 로딩중일때만 보임 */}
      {loading && <div className='wthr__loading'>불러오는 중...</div>}

      {/* 에러 : 에러 있을때만 보임*/}
      {error && <div className='wthr__error'>{error}</div>}

      {/* 날씨 결과 : 로딩이 끝났고, 날씨 데이터가 있을때 (둘다 true여야함) */}
      {!loading && weather && (
        <div className="wthr__card">
          <div className="wthr__city">
            <h2>{weather.name}</h2>
            <p>{weather.sys.country}</p>
          </div>

          <div className="wthr__main">
            <img className='wthr__icon' 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description} 
            />
            <div className="wthr__temp">{Math.round(weather.main.temp)}°C</div>
          </div>

          <p className='wthr__desc'>{weather.weather[0].description}</p>

          <div className="wthr__details">
            <div className="wthr__detail-item">
              <span className="wthr__detail-label">체감</span>
              <span className="wthr__detail-value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="wthr__detail-item">
              <span className="wthr__detail-label">습도</span>
              <span className="wthr__detail-value">{weather.main.humidity}%</span>
            </div>
            <div className="wthr__detail-item">
              <span className="wthr__detail-label">바람</span>
              <span className="wthr__detail-value">{weather.main.speed}m/s</span>
            </div>
            <div className="wthr__detail-item">
              <span className="wthr__detail-label">최저</span>
              <span className="wthr__detail-value">{Math.round(weather.main.temp_min)}°C</span>
            </div>
            <div className="wthr__detail-item">
              <span className="wthr__detail-label">최고</span>
              <span className="wthr__detail-value">{Math.round(weather.main.temp_max)}°C</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );

}

export default Weather;
