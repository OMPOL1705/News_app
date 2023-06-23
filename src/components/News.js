import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'technology'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles : parsedData.articles, totalResults:parsedData.totalResults, loading:false})
  }

  handlePrevClick = async () => {
    
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({
      page: this.state.page - 1,
      articles : parsedData.articles,
      loading: false
    })
  }

  handleNextClick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
   
    this.setState({
      page: this.state.page + 1,
      articles : parsedData.articles,
      loading: false
    })
  }
  }
  

  render() {
    return (
      
      <div className='container my-3'>
        <h2 className='text-center' style={{marginTop:'10vh'}}>NewsMonkey - Top headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-3 mx-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} source={element.source.name} description={element.description?element.description.slice(0,130):""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://media.zenfs.com/en/afp.com/4746c755d1190025e8cb0d8dd5e7f322"} url={element.url}
            author={element.author?element.author:"Unknown"} date={element.publishedAt}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between px-5">
        <button type="button" disabled={this.state.page<=1} className="btn btn-info" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-info" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
