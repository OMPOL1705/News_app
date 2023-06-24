import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


const News = (props) => {

  // document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`; 

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const [articles,setArticles] = useState([]);
const [loading,setLoading] = useState(false);
const [page,setPage] = useState(1);
const [totalResults,setTotalResults] = useState(0); 
const [isMounted, setIsMounted] = useState(false); 

  const updateNews = async () => {
    if (!isMounted) return; // Check if component is mounted

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0ccd349fa834435eaf497e217fa68f7c&page=${page}&pageSize=${props.pageSize}`;
    console.log(url);
    setLoading(true);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  }

  useEffect(() => {
    setIsMounted(true); // Set the flag to true when component mounts

    // Clean up function to set the flag to false when component unmounts
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
      updateNews();
    }
    // eslint-disable-next-line
  }, [page, props.country, props.category, props.pageSize, isMounted]);


  const handleNextClick = () => {
    const nextPage = page + 1;
    if (nextPage > Math.ceil(totalResults / props.pageSize)) {
      return;
    }
    setPage(nextPage);
  };

  const handlePrevClick = async () => {
    const prevPage = page - 1;
    setPage(prevPage)
  
  }

    return (
      
      <div className='container my-3'>
        <h2 className='text-center' style={{marginTop:'10vh'}}>NewsMonkey - Top headlines on {capitalizeFirstLetter(props.category)}</h2>
        {loading && <Spinner/>}
        <div className="row">
          {!loading && articles.map((element) => {
            return <div className="col-md-3 mx-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} source={element.source.name} description={element.description?element.description.slice(0,130):""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://media.zenfs.com/en/afp.com/4746c755d1190025e8cb0d8dd5e7f322"} url={element.url}
            author={element.author?element.author:"Unknown"} date={element.publishedAt}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between px-5">
        <button type="button" disabled={page<=1} className="btn btn-info" onClick={handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-info" disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'technology'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
