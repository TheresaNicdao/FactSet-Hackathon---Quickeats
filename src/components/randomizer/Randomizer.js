 import React, { Component } from 'react';

class Randomizer extends Component {
  constructor() {
    super();

    this.randomize = this.randomize.bind(this);
  }
  
  render() {
    return (
      <div className="randomizer">
        <button onClick={this.randomize}>R A N D O M I Z E</button>
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