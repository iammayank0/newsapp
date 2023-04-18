import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  //document.title = `JMJ - ${props.category}`;
    
    const updateNews = async()=>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(35);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }
    
    useEffect(() => {
      document.title = `JMJ - ${props.category}`;
      updateNews();
      //eslint-disable-next-line
    }, [])
  

    const fetchMoreData = async() => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setTotalResults(parsedData.totalResults)
      setArticles(articles.concat(parsedData.articles))
    };

    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>Janhit me Jaari - (Top {props.category} Headlines)</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.length >= 45 ? element.title.slice(0, 45) : element.title:""} description={element.description?element.description.length >= 60 ? element.description.slice(0, 60) : element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

export default News
