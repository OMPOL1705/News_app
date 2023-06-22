import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0ccd349fa834435eaf497e217fa68f7c";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles : parsedData.articles})
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
        
      </div>
    )
  }
}

export default News
