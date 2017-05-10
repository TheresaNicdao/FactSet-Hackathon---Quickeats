import React, { Component } from 'react';
import ReactSlider from "react-slider";

const DEFAULT_MIN = 0, DEFAULT_MAX = 100;

class PriceFilter extends Component {
  constructor() {
    super();

    this.state = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX
    };

    this.handleSliderValueChange = this.handleSliderValueChange.bind(this);
  }

  render() {
    return (
      <div className="price-filter">
        <ReactSlider withBars
          defaultValue={[ DEFAULT_MIN, DEFAULT_MAX ]}
          onChange={this.handleSliderValueChange}
          pearling={true}
          max={10000}
          minDistance={500}>
          <div className="price-filter-handle">{this.state.min}</div>
          <div className="price-filter-handle">{this.state.max}</div>
        </ReactSlider>
      </div>
    );
  }

  handleSliderValueChange(value) {
    this.setState({
      min: value[0],
      max: value[1]
    });
  }
}

export default PriceFilter;