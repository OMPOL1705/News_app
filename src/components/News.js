import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      check : false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles : parsedData.articles, totalResults:parsedData.totalResults})
  }

  handlePrevClick = async () => {
    
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles : parsedData.articles,
      check : false
    })
  }

  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
      this.setState({
        check : true
      })  
    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
      page: this.state.page + 1,
      articles : parsedData.articles
    })
  }
  }
  

  render() {
    return (
      
      <div className='container my-3'>
        <h2>NewsMonkey - Top headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-3 mx-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,130):""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://media.zenfs.com/en/afp.com/4746c755d1190025e8cb0d8dd5e7f322"} url={element.url}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between px-5">
        <button type="button" disabled={this.state.page<=1} className="btn btn-info" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-info" disabled={this.state.check} onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News