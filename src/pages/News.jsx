
import { useState, useEffect } from 'react'
import '../assets/css/News.css'

const SOURCES = [
  { id: 'top', label: '헤드라인' },
  { id: 'technology', label: 'IT/기술' },
  { id: 'business', label: '경제' },
  { id: 'entertainment', label: '연예' },
];
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function News() {

  const [articles, setArticles] = useState([]);
  const [source, setSource] = useState('top');
  const [loading, setLoading] = useState(false);

  
  //뉴스 가져오기
const fetchNews = async (src) => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=ko&category=${src}`
    );
    const data = await res.json();
    setArticles(Array.isArray(data.results) ? data.results : []);
  } catch (e) {
    console.error('뉴스 불러오기 실패', e);
  } finally {
    setLoading(false);
  }
};

  // 뉴스 가져오기 -> 카테고리가 바뀔때마다 실행
  useEffect(() => { fetchNews(source); }, [source]);

  return (
    <div className='news__wrap'>

      {/* 카테고리 탭 */}
      <div className='news__tabs'>
        {SOURCES.map((src) => (
          <button
            key={src.id}
            className={`news__tab ${source === src.id ? 'active' : ''}`}
            onClick={() => setSource(src.id)}
          >
            {src.label}
          </button>
        ))}
      </div>

      {/* 뉴스 목록 */}
      {loading
        ? <div className='news__loading'>불러오는 중...</div>
        : <ul className='news__list'>
          {articles.map((article,i) => (
            <li key={i} className="news__item">
              <a href={article.link} target='_blank' rel='noreferrer'>
                {article.image_url && (  // enclosure?.link → image_url
                  <img className='news__img' src={article.image_url} alt={article.title} />
                )}
                <div className="news__content">
                  <p className='news__source'>{article.creator?.[0]}</p>  {/* author → creator[0] */}
                  <h3 className="news__title">{article.title}</h3>
                  <p className='news__desc'>{article.description?.replace(/<[^>]*>/g, '').slice(0, 80)}</p>
                </div>
              </a>
            </li>
          ))}

        </ul>
      }
    </div>
  )



}
export default News;