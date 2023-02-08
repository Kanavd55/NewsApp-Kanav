import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes  from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    category:"general"
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
        constructor(props){
          super(props);
          this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
          }
          document.title=`NewsApp-${this.capitalizeFirstLetter(this.props.category)}`
        }

        capitalizeFirstLetter=(string)=>{
          return string.charAt(0).toUpperCase()+string.slice(1);
        }

        async updateNews(){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c562d548a8bd4716946408283b80acf3&page=${this.state.page}&pageSize=${this.props.pageSize}`
          this.setState({loading:true});
          let data=await fetch(url);
          let parsedData=await data.json();
          this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
          })
        }
        async componentDidMount(){
          this.updateNews();
        }

        handlePrevClick=async()=>{
          this.setState({page:this.state.page-1})
          this.updateNews();
        }

        handleNextClick=async()=>{
          this.setState({page:this.state.page+1})
          this.updateNews();
        }

        fetchMoreData=async ()=>{
          this.setState({page:this.state.page+1})
          console.log(this.state.page)
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c562d548a8bd4716946408283b80acf3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
          let data=await fetch(url);
          let parsedData=await data.json();
          this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
          })
        }
  render() {
    return (
      <>
        <h1 className='text-center'>NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        
        {/*<div className='container d-flex justify-content-between'>
        <button onClick={this.handlePrevClick} disabled={this.state.page<=1} type="button" className="btn btn-dark">Previous</button>
        <button onClick={this.handleNextClick} disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark">Next</button>
    </div>*/}
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spinner/>}
            >
        <div className='container my-3'>
        <div className='row'>
          {this.state.articles.map((element,index)=>{
            return <div key={index}className='col-md-4 '>
                       <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} 
                      imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
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
