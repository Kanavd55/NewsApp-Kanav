import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes  from 'prop-types';

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
        constructor(){
          super();
          this.state={
            articles:[],
            loading:false,
            page:1
          }
        }
        async componentDidMount(){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c562d548a8bd4716946408283b80acf3&page=${this.state.page}&pageSize=${this.props.pageSize}`
          this.setState({loading:true});
          let data=await fetch(url);
          let parsedData=await data.json();
          console.log(parsedData);
          this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
          })
        }

        handlePrevClick=async()=>{
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c562d548a8bd4716946408283b80acf3&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true});
          let data=await fetch(url);
          let parsedData=await data.json();
          //console.log(parsedData);
          this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
            loading:false
          })
        }

        handleNextClick=async()=>{
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c562d548a8bd4716946408283b80acf3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true});
          let data=await fetch(url);
          let parsedData=await data.json();
          //console.log(parsedData);
          this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
          })
        }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey -Top Headlines</h1>
        <div className='row'>
        <div className='container d-flex justify-content-between'>
        <button onClick={this.handlePrevClick} disabled={this.state.page<=1} type="button" class="btn btn-dark">Previous</button>
        <button onClick={this.handleNextClick} disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark">Next</button>
        </div>
        {this.state.loading && <Spinner/>}
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div key={element.url}className='col-md-4 '>
                       <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} 
                      imageUrl={element.urlToImage} newsUrl={element.url}/>
                   </div>
          })} 
        </div>
      </div>
    )
  }
}

export default News
