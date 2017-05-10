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
  }
  
  componentDidMount() {
    this.getUserLocation();
  }
  
  render() {
    return (
      <div className="App">
        <img src={logo} alt="logo"/>

        <CuisineFilter
          choices={this.getCuisineFilters()}
          onChange={this.handleCuisineFilterChange} />

        <PriceFilter
          onChange={this.handlePriceFilterChange} />

        <Randomizer />

        <RestoLocator />

      </div>
    );
  }

  handleCuisineFilterchange(newCuisines = []) {
    this.setState( { cuisines: newCuisines });
  }

  handlePriceFilterChange() {

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
        this.getNearbyRestos();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getNearbyRestos() {
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
}

export default App;
