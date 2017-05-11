import "../../assets/styles/PriceFilter.css";
import React, { Component } from 'react';
import ReactSlider from "react-slider";

class PriceFilter extends Component {
  constructor() {
    super();

    this.state = {
      min: 0,
      max: 0
    };

    this.handleSliderValueChange = this.handleSliderValueChange.bind(this);
  }

  componentDidMount() {
    const { min, max } = this.props;
    this.setState({
      min, max
    });
  }

  render() {
    return (
      <div className="price-filter">
        <ReactSlider withBars
          defaultValue={[ this.props.min, this.props.max ]}
          onChange={this.handleSliderValueChange}
          pearling={true}
          max={this.props.max}
          minDistance={500}>
          <div className="price-filter-handle">
            <div role="tooltip" className="tooltip top custom-tooltip">
              <div className="tooltip-arrow"></div>
              <div className="tooltip-inner left">{this.state.min}</div>
            </div>
          </div>
          <div className="price-filter-handle">
            <div role="tooltip" className="tooltip top custom-tooltip">
              <div className="tooltip-arrow"></div>
              <div className="tooltip-inner right">{this.state.max}</div>
            </div>
          </div>
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