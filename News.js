import React,{useEffect,useState} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

    }

    useEffect(() => {
        updateNews(); 
    }, [])
 

    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async () => { 
    //     setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {   
        setPage(page+1) 
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container my-2">
                <div className="row">
                {articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                    <NewsItems title={element.title?element.title.slice(0,40)+".....":" "} description={element.description?element.description.slice(0,90)+"......":" "} imageUrl={element.urlToImage?element.urlToImage:"http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif"} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source = {element.source.name}/>
                </div>
                })}
                </div>
            </div>
                </InfiniteScroll>

            </>
        )
    
}

News.defaultProps={
    country:'in',
    pageSize:5,
    categories:"general"
   }
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    categories:PropTypes.string,
   }
export default News
