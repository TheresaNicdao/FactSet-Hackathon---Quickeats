 import React, { Component } from 'react';

class Randomizer extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: {}
    };

    this.randomize = this.randomize.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }
  
  render() {
    const result = this.state.restaurant.name ? this.renderResult() : "";

    return (
      <div className="randomizer">
        <button onClick={this.randomize}>R A N D O M I Z E</button>
        {result}
      </div>
    );
  }

  renderResult() {
    return (
      <div className="result">
        {this.state.restaurant.name} 
        <img src={this.state.restaurant.featured_image} alt="whatever" />
        Rating {this.state.restaurant.user_rating.aggregate_rating}
      </div>
    );
  }

  randomize() {
    const { choices } = this.props;

    let min = 0;
    let max = choices.length;

    let result = Math.floor(Math.random() * (max - min)) + min;
    
    this.setState({
      restaurant: choices[result].restaurant

    });

  }
}

export default Randomizer;