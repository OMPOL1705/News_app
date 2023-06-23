import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, url, author, date, source} = this.props;
    return (
      <div className="container my-3 px-5"> 
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          <span class="badge text-bg-info">{source}</span>
            <h5 className="card-title" style={{marginTop:'0.5rem'}}>{title}...</h5>
            <p className="card-text">
              {description}...</p>
            
            <p class="card-text"><small class="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
