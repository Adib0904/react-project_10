import { useEffect } from 'react';
import { useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState('in')

  useEffect(() => {
    fetchdata();
    //console.log(articles)
  }, [category, country])

  const fetchdata = async () => {
    const respose = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3e7920d88f0a4442a03256bed32b952c`);
    const data = await respose.json();
    setArticles(data.articles)
    // console.log(data.products)
  }

  let countryName = 'india';
  if (country == 'us') {
    countryName = 'USA'
  } else if (country == 'ae') {
    countryName = 'Dubai'
  } else if (country == 'ca') {
    countryName = 'Canada'
  } else if (country == 'fr') {
    countryName = 'France'
  }
  else if (country == 'ru') {
    countryName = 'Russia'
  }
  return (
    <>
      <div className="dropdown" style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Select Country
        </button>
        <ul className="dropdown-menu">
          <li><div className="dropdown-item" onClick={() => { setCountry('in') }}>India</div></li>
          <li><div className="dropdown-item" onClick={() => { setCountry('us') }}>USA</div></li>
          <li><div className="dropdown-item" onClick={() => { setCountry('ae') }}>Dubai</div></li>
          <li><div className="dropdown-item" onClick={() => { setCountry('ca') }}>Canada</div></li>
          <li><div className="dropdown-item" onClick={() => { setCountry('fr') }}>France</div></li>
          <li><div className="dropdown-item" onClick={() => { setCountry('ru') }}>Russia</div></li>
        </ul>
      </div>
      <h2 className='text-center'>Latest <span className='badge bg-danger'>News</span><span className='badge bg-success'>{countryName}</span></h2>
      <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'center' }}>
        {
          articles.map((news, index) => {
            return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
          })

        }
      </div>
    </>
  )
}

export default NewsBoard;
