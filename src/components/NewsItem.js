import React from "react";

const NewsItem = (props) => {
  
    let {title, description, imageUrl, url, author, date, source} = props;
    return (
      <div className="carded container my-3 px-5"> 
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          <span className="badge text-bg-primary">{source}</span>
            <h5 className="card-title" style={{marginTop:'0.5rem'}}>{title}...</h5>
            <p className="card-text">
              {description}...</p>
            
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
 
}

export default NewsItem;
