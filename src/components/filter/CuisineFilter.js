import "../../assets/styles/CuisineFilter.css";
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
    const { choices, activeFilters } = this.props;

    return choices.map((choice, index) =>{
      return(
        <li key={index} className={activeFilters.indexOf(choice) >= 0 ? "active": undefined}>
          <h4>{choice}</h4>
          <input type="checkbox" name={choice} id={choice} className="checkbox" onChange={(choice) => this.props.passCuisineValue(choice)}/>
          <label htmlFor={choice}>&#10004;</label>
        </li>
      );
    });
  }

}

CuisineFilter.defaultProps = {
  choices: []
};

export default CuisineFilter;