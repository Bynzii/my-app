
import { useState, useEffect } from 'react'
import '../assets/css/News.css'

const CATECORIES = [
  {id: 'general', label:'전체'}, 
  {id: 'business', label:'비즈니스'}, 
  {id: 'technology', label:'기술'}, 
  {id: 'sports', label:'스포츠'}, 
  {id: 'entertainment', label:'엔터'}, 
]

function News() {

  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY
  
  //뉴스 가져오기
  const fetchNews = async (cat) => {
    setLoading(true);
    try {
      const res = await fetch (
         `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=ko&country=kr&apikey=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (e) {
      console.error('뉴스 불러오기 실패', e);
    } finally {
      setLoading(false);
    }
  };

  // 뉴스 가져오기 -> 카테고리가 바뀔때마다 실행
  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return (
    <div className='news__wrap'>

      {/* 카테고리 탭 */}
      <div className='news__tabs'>
        {CATECORIES.map((cat) => (
          <button
            key={cat.id}
            className={`news__tab ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 뉴스 목록 */}
      {loading
        ? <div className='news__loading'>불러오는 중...</div>
        : <ul className='news__list'>
          {articles.map((article,i) => (
            <li key={i} className="news__item">
              <a href={article.url} target='_blank' rel='noreferrer'>
                {article.image && (
                  <img className='news__img' src={article.image} alt={article.title} />
                )}

                <div className="news__content">
                  <p className='news__source'>{article.source.name}</p>
                  <h3 className="news__title">{article.title}</h3>
                  <p className='news__desc'>{article.description}</p>
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