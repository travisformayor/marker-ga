import React, { Component } from 'react';
import TestModel from '../models/test';

class TestContainer extends Component {
	state = {
    array: [],
  }

  componentDidMount () {
    // call function to get all city data city data
    this.getTest();
  }

  getTest = () => {
    TestModel.getTest()
    .then(res => {
      console.log("Get test info: ", res);
      if (res.data) {
        this.setState({
          array: res.data,
        })
      }
    })
    .catch(error => {
      // this.setState({ error });
      console.log("Error: ", error);
    });
  }

  render(){
    // console.log('cities state', this.state.cities.length)
    // let { cityURL } = this.props.match.params
    return (
      <>
        <h1>Test API Fetcher</h1>
        <p>{this.state.array}</p>
      </>
    )
  }
}

export default TestContainer;