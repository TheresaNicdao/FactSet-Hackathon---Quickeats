import React, { Component } from 'react';

class CuisineFilter extends Component {
  render() {
    return (
      <div className="cuisine-filter">
        Top Cuisines {this.renderFilters()}
      </div>
    );
  }

  renderFilters() {
    const { choices } = this.props;

    return choices.map(choice => 
      <button key={choice}>
        {choice}
      </button>
    );
  }
}

CuisineFilter.defaultProps = {
  choices: []
};

export default CuisineFilter;