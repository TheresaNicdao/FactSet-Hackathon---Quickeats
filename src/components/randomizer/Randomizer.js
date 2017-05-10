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
      <div className="result"> </div>
      </div>
    );
  }

  randomize() {
    const { choices } = this.props;

    let numOfChoices = choices.length;
    console.log(numOfChoices);
  }
}

export default Randomizer;