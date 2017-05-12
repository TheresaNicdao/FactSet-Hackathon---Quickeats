 import "../../assets/styles/Randomizer.css";
 import React, { Component } from 'react';

class Randomizer extends Component {
  constructor() {
    super();

    this.randomize = this.randomize.bind(this);
  }
  
  render() {
    return (
      <div className="randomizer col">
        <div className="button raised clickable" onClick={this.randomize}>
          <input className="toggle" type="checkbox"/>
          <div className="anim"></div>
          <h1>Randomize!</h1>
        </div>
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