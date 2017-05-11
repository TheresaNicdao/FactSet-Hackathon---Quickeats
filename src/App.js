import React, { Component } from 'react';
import logo from './assets/quickeats.png';
import './App.css';
import CuisineFilter from "./components/filter/CuisineFilter";
import PriceFilter from "./components/filter/PriceFilter";
import Randomizer from "./components/randomizer/Randomizer";
import RestoLocator from "./components/map/RestoLocator";
import Zomato from "zomato.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      position: {
        longitude: 0,
        latitude: 0
      },
      priceRange: {
        min: 0,
        max: 4000
      },
      cuisines: [],
      data: {}
    };

    this.zapi = new Zomato('d0d950221eb063b6e7d5c708ed65fced');

    this.handleCuisineFilterchange = this.handleCuisineFilterchange.bind(this);
    this.handlePriceFilterChange = this.handlePriceFilterChange.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.getPriceRange = this.getPriceRange.bind(this);
  }
  
  componentDidMount() {
    this.getUserLocation();
  }
  
  render() {
    let priceRange = this.getPriceRange();

    return (
      <div className="App">
        <img src={logo} alt="logo"/>

        <CuisineFilter
          choices={this.getCuisineFilters()}
          onChange={this.handleCuisineFilterChange} />

        <PriceFilter
          min={priceRange.min}
          max={priceRange.max}
          onChange={this.handlePriceFilterChange} />

        <Randomizer 
          choices={this.getNearbyRestos()}
        />

        <RestoLocator />

      </div>
    );
  }

  handleCuisineFilterchange(newCuisines = []) {
    this.setState( { cuisines: newCuisines });
  }

  handlePriceFilterChange() {

  }

  getPriceRange() {
    const { data } = this.state;
    return data.priceRange ? data.priceRange : {min: 0, max: 4000};
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          position: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        });
        this.getLocationData();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getLocationData() {
    this.zapi.geocode({
      lat: this.state.position.latitude,
      lon: this.state.position.longitude
    }).then((data) => {
      this.setState({data});
    }).catch((error) => {
      console.log(error);
    });
  }

  getCuisineFilters() {
    const { data } = this.state;
    return data.popularity ? data.popularity.top_cuisines : [];
  }

  getNearbyRestos() {
    const { data } = this.state;
    return data.nearby_restaurants ? data.nearby_restaurants : [];
  }
}

export default App;
