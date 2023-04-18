import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `JMJ - ${this.props.category}`;
    }
    
    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setProgress(35);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({articles: parsedData.articles,
         totalResults: parsedData.totalResults,
         loading: false})
      this.props.setProgress(100);
    }

    async componentDidMount(){
      this.updateNews(); 
    }

    handlePrevClick = async ()=>{
      this.setState({page: this.state.page - 1});
      this.updateNews();
    }

    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    fetchMoreData = async() => {
      this.setState({page: this.state.page + 1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: this.state.articles.concat(parsedData.articles),
         totalResults: parsedData.totalResults})
    };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px'}}>Janhit me Jaari - (Top {this.props.category} Headlines)</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
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
}

export default News
