import React, { Component } from 'react';

class CuisineFilter extends Component {
  constructor() {
    super();
    this.renderFilters = this.renderFilters.bind(this);
  }

  render() {
    return (
      <div className="cuisine-filter">
        TOP Cuisines Nearby
        <ul>
          {this.renderFilters()}
        </ul>
      </div>
    );
  }

  renderFilters() {
    const { choices } = this.props;

    return choices.map((choice) =>{
      return(
        <li key={choice}>
          <input type="checkbox" name={choice} id={choice} className="checkbox" onChange={(choice) => this.props.passCuisineValue(choice)}/>
          <label htmlFor={choice}> {choice} </label>
        </li>
      );
    });
  }

}

CuisineFilter.defaultProps = {
  choices: []
};

export default CuisineFilter;