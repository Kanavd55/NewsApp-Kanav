import React, { Component } from 'react'
import loader from '../components/loader.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img style={{height:"100px",width:"100px"}}src={loader} alt="loading"></img>
      </div>
    )
  }
}

export default Spinner
