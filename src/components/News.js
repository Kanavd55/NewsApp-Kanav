import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
        constructor(){
          super();
          this.state={
            articles:[],
            loading:false
          }
        }
        async componentDidMount(){
          let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=c562d548a8bd4716946408283b80acf3"
          let data=await fetch(url);
          let parsedData=await data.json();
          console.log(parsedData);
          this.setState({
            articles:parsedData.articles
          })
        }
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey -Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element)=>{
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
