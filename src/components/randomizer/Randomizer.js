 import React, { Component } from 'react';

class Randomizer extends Component {
  constructor() {
    super();

    this.randomize = this.randomize.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }
  
  render() {
    return (
      <div className="randomizer">
        <button onClick={this.randomize}>R A N D O M I Z E</button>
        {this.renderResult};
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
    const { choices,passRestaurantValue } = this.props;

    let min = 0;
    let max = choices.length;

    let result = Math.floor(Math.random() * (max - min)) + min;
    
    passRestaurantValue(choices[result].restaurant);
  }
}

export default Randomizer;