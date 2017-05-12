import React, { Component } from 'react';
import logo from './assets/quickeats.png';
import './App.css';
import CuisineFilter from "./components/filter/CuisineFilter";
import PriceFilter from "./components/filter/PriceFilter";
import Randomizer from "./components/randomizer/Randomizer";
import RestaurantInfo from "./components/randomizer/RestaurantInfo";
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
      restaurant: {},
      cuisines: [], 
      nearbyRestos: [],
      data: {}
    };

    this.zapi = new Zomato('d0d950221eb063b6e7d5c708ed65fced');

    this.handleCuisineFilterchange = this.handleCuisineFilterchange.bind(this);
    this.handlePriceFilterChange = this.handlePriceFilterChange.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.getLocationData = this.getLocationData.bind(this);
    this.getPriceRange = this.getPriceRange.bind(this);
    this.setCuisineValue = this.setCuisineValue.bind(this);
    this.setRestaurantValue = this.setRestaurantValue.bind(this);
    this.setPriceRange = this.setPriceRange.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
  }
  
  componentDidMount() {
    this.getUserLocation();
  }
  
  render() {
    let priceRange = this.getPriceRange();
    const { position } = this.state;

    let restoLocator = [];

    if (this.state.data.nearby_restaurants) {
      restoLocator = this.state.data.nearby_restaurants.map((resto) => {
        return <RestoLocator
          key={resto.restaurant.name}
          origin={position}
          destination={{
            latitude: resto.restaurant.location.latitude,
            longitude: resto.restaurant.location.longitude
          }} />
      });
    }

    console.log(this.getNearbyRestos());
    let restoInfo = this.getNearbyRestos().map((resto) => {
      <RestaurantInfo data={resto} />
    });

    return (
      <div className="App">
        <img src={logo} alt="logo" className="App-logo"/>

        <CuisineFilter
          choices={this.getCuisineFilters()}
          activeFilters={this.state.cuisines}
          onChange={this.handleCuisineFilterChange} 
          passCuisineValue={this.setCuisineValue}/>

        <PriceFilter
          min={priceRange.min}
          max={priceRange.max}
          passPriceRange={this.setPriceRange}
          onChange={this.handlePriceFilterChange} />

        <Randomizer 
          passRestaurantValue={this.setRestaurantValue}
          choices={this.getNearbyRestos()}
        />

        {restoInfo}

        {restoLocator}
      </div>
    );
  }

  handleCuisineFilterchange(newCuisines = []) {
    this.setState( { cuisines: newCuisines });
  }

  handlePriceFilterChange() {

  }

  setPriceRange(priceRange) {
    this.setState({
      priceRange: {
        min: priceRange[0],
        max: priceRange[1]
      }
    });
  }

  setCuisineValue(event) {
    let newCuisines = this.state.cuisines;

    if(event.target.checked) {
      newCuisines.push(event.target.name);
    }
    else{
      newCuisines.splice(newCuisines.indexOf(event.target.name), 1);
    }

    this.setState({
      cuisines: newCuisines
    });
  }

  setRestaurantValue(restaurantValue) {
    this.setState({
      restaurant: restaurantValue
    });
    console.log("val");
    console.log(this.state.restaurant);
    console.log(restaurantValue);
  }

  getPriceRange() {
    const { data } = this.state;
    return data.priceRange ? data.priceRange : {min: 0, max: 4000};
  }

  getUserLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.setState({
    //       position: {
    //         longitude: position.coords.longitude,
    //         latitude: position.coords.latitude
    //       }
    //     }, this.getLocationData);
    //   });
    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }

    fetch("http://ip-api.com/json?fields=lat,lon").then(function(response) {
      return response.json();
    }).then((response) => {
      this.setState({
        position: {
          longitude: response.lon,
          latitude: response.lat
        }
      }, this.getLocationData);
    }).catch(function(error) {
      console.log(error);
    });
  }

  getLocationData() {
    this.zapi.geocode({
      lat: this.state.position.latitude,
      lon: this.state.position.longitude
    }).then((data) => {
      this.setState({ data });
    }).catch((error) => {
      console.log(error);
    });
  }

  getCuisineFilters() {
    const { data } = this.state;
    return data.popularity ? data.popularity.top_cuisines : [];
  }

  filterRestaurants(restau) {
    let filterCuisines = restau.restaurant.cuisines.split(",");

    for(let cuisine in this.state.cuisines) {

      if(filterCuisines.includes(this.state.cuisines[cuisine]) &&
        restau.restaurant.average_cost_for_two >= this.state.priceRange.min &&
        restau.restaurant.average_cost_for_two <= this.state.priceRange.max){
        return true;
      }
    }
  }

  getNearbyRestos() {
    const { data, priceRange, nearbyRestos } = this.state;

    let filteredRestos = [];
    if (data.nearby_restaurants) {
      if (this.state.cuisines.length === 0) return data.nearby_restaurants;
      let rawRestaurants = data.nearby_restaurants;
      filteredRestos = rawRestaurants.filter(this.filterRestaurants);
      console.log(filteredRestos);
      console.log(rawRestaurants);
    }

    return filteredRestos;
  }
}

export default App;
